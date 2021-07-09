<template>
  <div class="upload">
    <el-upload
      action=" "
      list-type="picture-card"
      :auto-upload="true"
      :before-upload="beforeUploaded"
      :http-request="uploaded"
      :before-remove="removed"
      :file-list="fileList"
      :on-success="success"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <i slot="default" class="el-icon-plus" />
    </el-upload>
  </div>
</template>

<script>
import { calculateFileHash } from '@/utils/upload'
import { uploadFileExcel, DeleteFileExcel } from '@/api/table'
import { throttle } from 'lodash'
export default {
  props: {
    dataObj: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      hash: '', // hash
      fileList: [], // 文件列表
      objInfo: this.dataObj
    }
  },
  watch: {
    dataObj(o, n) {
      this.objInfo = n
    }
  },
  methods: {
    async beforeUploaded(file) {
      this.hash = await calculateFileHash(file)
    },
    async uploaded(e) {
      const formData = new FormData()
      formData.append('file', e.file)
      formData.append('hash', this.hash)
      // 替换图片操作
      if (this.objInfo.url !== '') {
        console.log('替换图片', this.objInfo.name)
        formData.append('oldImage', this.objInfo.name)
      }
      const res = await uploadFileExcel(formData)
      if (res.code === 20000) {
        // 图片前缀处理跨域 代理
        const fir = '/dev-api/api/'
        this.$set(this.objInfo, 'url', fir + res.data.url)
        this.$set(this.objInfo, 'name', res.data.name)
        this.$emit('changeCanvas', this.objInfo)
      }
    },
    // 上传图片成功:替换文件列表
    success(response, file, fileList) {
      if (fileList.length > 1) {
        this.fileList = fileList.slice(1)
        return
      }
      this.fileList = fileList
    },
    // 删除图片
    async removed() {
      // const res = await DeleteFileExcel(params)
      // if (res.code === 20000) {
      //   this.$set(this.objInfo, 'url', '')
      //   this.$set(this.objInfo, 'name', '')
      //   this.$emit('changeCanvas', this.objInfo)
      // }
      // 节流
      this.throttle()
    },
    throttle: throttle(async function() {
      const params = {
        name: this.objInfo.name
      }
      const res = await DeleteFileExcel(params)
      if (res.code === 20000) {
        this.$set(this.objInfo, 'url', '')
        this.$set(this.objInfo, 'name', '')
        this.$emit('changeCanvas', this.objInfo)
      }
    }, 2000)
  }
}

</script>
<style lang='scss' scoped>
</style>
