<template>
  <div class="upload-big">
    <el-upload
      class="upload"
      drag
      action=""
      multiple
      :limit="3"
      :file-list="fileList"
      :on-exceed="exceedLimit"
      :before-upload="beforeUpload"
      :http-request="uploaded"
      :on-progress="progressUpload"
      :on-success="success"
      :on-error="error"
      accept=".mp4"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传mp4文件</div>
    </el-upload>
  </div>
</template>

<script>
import { createFileChunk, calculateHashWork, calculateHashSample, calculateHashIdle, CHUNK_SIZE } from '@/utils/upload'
import { checkfile, mergeFile, updateFile } from '@/api/table'
export default {

  components: {},
  data() {
    return {
      fileList: [], // 上传的文件列表
      data: null,
      chunks: [],
      hash: null,
      ext: '',
      hashProgress: 0
    }
  },

  computed: {},

  methods: {
    // 超出限定个数
    exceedLimit() {
      console.log('超出三个')
    },
    // 上传前校验
    async beforeUpload(file) {
      console.log('校验格式', file)
      // 切片
      this.chunks = createFileChunk(file)
      console.log(this.chunks)
      // 计算hash
      // const hash = await calculateHashWork(this.chunks)
      // const hash = await calculateHashSample(file)
      const hash = await calculateHashIdle(this.chunks)
      this.hash = hash
      //   this.hash = res[0]
      //   this.hashProgress = res[1]
      console.log(hash)
      // 后缀名
      this.ext = file.name.split('.').pop()
    },
    // 文件上传时进度
    progressUpload() {

    },
    // 上传成功
    success() {

    },
    // 上传失败
    error() {

    },

    // 自定义上传事件
    async uploaded(file) {
      console.log('上传了', file)
      // 坑：用不了json传值，一直pending
      // const json = {
      //   hash: this.hash,
      //   ext: this.ext
      // }
      const formData = new FormData()
      formData.append('hash', this.hash)
      formData.append('ext', this.ext)
      const { data: { uploaded, uploadedList }} = await checkfile(formData)
      console.log(uploaded, uploadedList)
      if (uploaded) {
        this.$notify({
          message: '秒传成功'
        })
        return
      }
      this.chunks = this.chunks.map((chunk, index) => {
        // 切片的名字 hash+index
        const name = this.hash + '-' + index
        return {
          hash: this.hash,
          name,
          index,
          chunk: chunk.file,
          // 设置进度条，已经上传的，设为100
          progress: uploadedList.includes(name) ? 100 : 0
        }
      })
      await this.uploadChunks(uploadedList)
    },

    // 断点续传
    async uploadChunks(uploadedList = []) {
      // 断点续传：过滤不包含在uploadedList的chunk
      console.log(this.chunks)
      const requests = this.chunks
        .filter(chunk => !uploadedList.includes(chunk.name))
        .map((chunk, index) => {
          // 转成promise
          const form = new FormData()
          form.append('chunk', chunk.chunk)
          form.append('hash', chunk.hash)
          form.append('name', chunk.name)
          // form.append('index',chunk.index)
          return { form, index: chunk.index, error: 0 }
        })
      // 控制异步并发数
      await this.sendRequest(requests)
      // 合并切片
      await this.mergeRequest()
    },

    // 合并切片
    async  mergeRequest() {
      // const data = {
      //   ext: this.ext,
      //   size: CHUNK_SIZE,
      //   hash: this.hash
      // }
      const form = new FormData()
      form.append('ext', this.ext)
      form.append('size', CHUNK_SIZE)
      form.append('hash', this.hash)
      const res = await mergeFile(form)
      if (res.code === 20000) {
        this.$notify({
          message: '上传成功'
        })
      }
    },

    // 控制异步并发数
    async  sendRequest(chunks, limit = 4) {
      // limit并发数
      // 一个数组，长度是limit
      // [task1,task2,task3] [task2,task3,task4]
      return new Promise((resolve, reject) => {
        const len = chunks.length
        let isStop = false
        let count = 0
        const start = async() => {
          if (isStop) {
            return
          }
          const task = chunks.shift() // 从数组第一个任务开始
          if (task) {
            const { form, index, error } = task
            try {
              // await updateFile(form, {
              //   onUploadProgress: (progress) => {
              //     // 不是整体的进度条了，而是每个区块有自己的进度条，整体的进度条需要计算
              //     this.chunks[index].progress = Number(((progress.loaded / progress.total) * 100).toFixed(2))
              //   }
              // })
              updateFile(form)
              if (count === len - 1) {
                // 最后一个任务
                resolve()
              } else {
                count++
                // 启动下一个任务
                start()
              }
            } catch (e) {
              this.chunks[index].progress = -1
              if (task.error < 3) {
                task.error++
                chunks.unshift(task)
                start()
              } else {
                // 错误三次，直接结束
                isStop = true
                reject()
              }
            }
          }
        }

        while (limit > 0) {
          start()
          limit -= 1
        }
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.upload-big{
    width: 100%;
    height: 300px;
    text-align: center;
    .upload{
        width: 100%;
        height: 100%;
    }
}
</style>
