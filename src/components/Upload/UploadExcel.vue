<template>
  <div class="uploadExcle">
    <input ref="inputFile" accept=".xls, .xlsx" type="file" style="display:none" @change="handlerFile">
    <el-button icon="el-icon-upload2" @click="uploadFile">上传</el-button>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { isExcleOrWord, createFileChunk, calculateHashWork, calculateFileHash } from '@/utils/upload'
import { aaa } from '@/api/table'
export default {
  components: {},
  props: {
    tHeader: {
      type: Array,
      default: function() {
        return []
      }
    },
    requestURL: Function
  },
  data() {
    return {
      file: null
    }
  },

  computed: {},

  methods: {
    // 导入
    uploadFile() {
      this.$refs['inputFile'].click()
    },
    handlerFile(e) {
      const files = e.target.files
      this.file = files[0]
    },
    // 读excel
    readerData(rawFile) {
      // this.loading = true
      console.log(rawFile)
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          try {
            const workbook = XLSX.read(data, { type: 'array' })
            // 第一个表
            const firstSheetName = workbook.SheetNames[0]
            // 第一个表数据
            const worksheet = workbook.Sheets[firstSheetName]
            // 表头信息
            const header = this.getHeaderRow(worksheet)
            // 表数据转json
            const results = XLSX.utils.sheet_to_json(worksheet)
            resolve({ header, results })
          } catch (e) {
            console.log(e)
          }
          // this.generateData({ header, results })
          // this.loading = false
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    async importExcel() {
      if (!this.file) {
        return
      }
      await aaa({ a: '1', b: '2' })
      // 对file做校验
      const isExcel = await isExcleOrWord(this.file)
      if (!isExcel) {
        console.log('文件格式错误')
        return
      }
      // 指定文件模板的情况下，需要对表头做判断
      const tabelInfo = await this.readerData(this.file)
      if (JSON.stringify(this.tHeader) !== JSON.stringify(tabelInfo.header)) {
        console.log('模板错误')
        return
      }
      // 判断size大小:大于1G切片上传或取消
      console.log(this.file.size)
      if (this.file.size > 1024 * 1024 * 1024) {
        // const chunks = await createFileChunk(this.file)
        // const hsah = await calculateHashWork(chunks)
        return
      } else {
        const formData = new FormData()
        const hash = await calculateFileHash(this.file)
        formData.append('hash', hash)
        formData.append('file', this.file)
        const res = await this.requestURL(formData)
        console.log(res.data)
      }
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
