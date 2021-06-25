/**
 * 判断文件类型
 */
async function blobToString(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = function() {
      console.log('reader', reader.result)
      const res = reader.result.split('')
        .map(v => v.charCodeAt()) // 转ASII 是10进制
        .map(v => v.toString(16).toUpperCase()) // 转16进制并且大写
        .map(v => v.padStart(2, '0')) // 两位数前面补0
        .join(' ') // 拼成字符串
      resolve(res)
    }
    // 开始读取，reader.result为原始二进制数据
    reader.readAsBinaryString(blob)
  })
}

async function isGIF(file) {
  // 前面6个16进制 两种规范 GIF87a / GIF89a
  const res = await blobToString(file.slice(0, 6))
  const isGif = (res === '47 49 46 38 39 61') || (res === '47 49 46 38 37 61')
  return isGif
}

async function isPNG(file) {
  const res = await blobToString(file.slice(0, 8))
  const isPng = (res === '89 50 4E 47 0D 0A 1A 0A')
  return isPng
}

async function isJPG(file) {
  const start = await blobToString(file.slice(0, 2))
  const tail = await blobToString(file.slice(-2, file.size))
  const isJpg = (start === 'FF D8' && tail === 'FF D9')
  return isJpg
}

async function isImage(file) {
  // 通过文件流来判定
  return await isGIF(file) || await isPNG(file) || await isJPG(file)
}

async function isExcleOrWord(file) {
  const res = await blobToString(file.slice(0, 4))
  // xls xlsx
  const isExcelOrWord = (res === 'D0 CF 11 E0' || res === '50 4B 03 04')
  return isExcelOrWord
}

/**
 * 计算hash
 */
import SparkMD5 from 'spark-md5'
// web-work计算hash
async function calculateHashWork(chunks) {
  return new Promise((resolve) => {
    // 开了个隐分身进程
    this.worker = new Worker('/hash.js')
    // 传递chunks切片给这个进程
    this.worker.postMessage({ chunks })
    // 每个切片的回传信息
    this.worker.onmessage = (e) => {
      const { progress, hash } = e.data
      // this.hashProgress = Number(progress.toFixed(2))
      if (hash) {
        resolve(hash)
        // 关掉worker
        this.worker.terminate()
      }
    }
  })
}
// 时间切片浏览器空闲时间计算md5
async function calculateHashIdle(chunks) {
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer()
    let count = 0
    const appendToSpark = async(file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = (e) => {
          spark.append(e.target.result)
          resolve()
        }
      })
    }

    const workLoop = async(deadline) => {
      // timeRemaining获取当前帧的剩余时间
      while (count < chunks.length && deadline.timeRemaining() > 1) {
        // 空闲时间且有任务 执行
        await appendToSpark(chunks[count].file)
        count++
        if (count < chunks.length) {
          // this.hashProgress = Number(((100 * count) / chunks.length).toFixed(2))
        } else {
          // this.hashProgress = 100
          resolve(spark.end())
        }
      }
      // 自己启动自己 没有空闲时间启动下一次任务 直到算完所有chunks
      window.requestIdleCallback(workLoop)
    }
    // 启动一次，浏览器一旦空闲，就会调用workLoop
    window.requestIdleCallback(workLoop)
  })
}
// 抽样hash
async function calculateHashSample(file) {
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer()
    const reader = new FileReader()
    const offSize = 1 * 1024 * 1024
    // 第一个切片
    const chunks = [file.slice(0, offSize)]
    let cur = offSize
    while (cur < file.size) {
      if (cur + offSize >= file.size) {
        // 最后一个切片
        chunks.push(file.slice(cur, file.size))
      } else { // 中间切片 取前中后各2各字节
        const mid = cur + offSize / 2
        const end = cur + offSize
        chunks.push(file.slice(cur, cur + 2))
        chunks.push(file.slice(mid, mid + 2))
        chunks.push(file.slice(end - 2, end))
      }
      cur += offSize
    }
    reader.readAsArrayBuffer(new Blob(chunks))
    reader.onload = (e) => {
      spark.append(e.target.result)
      const hashProgress = 100
      resolve([spark.end(), hashProgress])
    }
  })
}
// 计算整个文件hash
async function calculateFileHash(file) {
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer()
    const reader = new FileReader()
    reader.onload = (e) => {
      spark.append(e.target.result)
      resolve(spark.end())
    }
    reader.readAsArrayBuffer(file)
  })
}

/**
 * 切片上传
 */
// 切片
const CHUNK_SIZE = 10 * 1024 * 1024 // 默认50M一个切片
function createFileChunk(file, size = CHUNK_SIZE) {
  const chunks = []
  let cur = 0
  while (cur < file.size) {
    chunks.push({ index: cur, file: file.slice(cur, cur + size) })
    cur += size
  }
  return chunks
}

export {
  isGIF,
  isPNG,
  isJPG,
  isImage,
  isExcleOrWord,
  calculateHashWork,
  calculateHashIdle,
  calculateHashSample,
  calculateFileHash,
  createFileChunk,
  CHUNK_SIZE
}
