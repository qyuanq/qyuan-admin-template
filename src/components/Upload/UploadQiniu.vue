<template>
  <div class="upload-qiniu">
    <el-upload
      class="upload"
      drag
      :action="uploadURL"

      :http-request="uploaded"
      multiple
      :limit="3"
      :file-list="fileList"
      :on-exceed="exceedLimit"
      :before-upload="beforeUpload"
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
import * as qiniu from 'qiniu-js'
import { qiniuToken } from '@/api/user.js'
import { calculateFileHash } from '@/utils/upload'
export default {

  components: {},
  data() {
    return {
      fileList: [], // 上传的文件列表
      uploadURL: 'https://upload-z1.qiniup.com', // 上传地址
      qnToken: '', // 七牛token
      dataQiniu: {
        file: null,
        key: '',
        token: this.qnToken,
        putExtra: null,
        config: null
      }
    }
  },

  computed: {},

  methods: {
    // 超出限定个数
    exceedLimit() {
      console.log('超出三个')
    },

    async beforeUpload(file) {
      const ret = await qiniuToken()
      if (ret.code === 20000 || ret.code === 0) {
        this.qnToken = ret.data
      }
      // console.log(this.qnToken)
      // const hash = await calculateFileHash(file)
      // const key = hash + '_' + file.name
      // console.log(file)
      // const putExtra = {
      //   fname: key,
      //   mimeType: 'video/mp4'
      // }
      // const config = {
      //   useCdnDomain: true,
      //   region: 'qiniu.region.z1'
      // }
      // this.dataQiniu = {
      //   key,
      //   token: this.qnToken,
      //   putExtra,
      //   config
      // }
    },

    async uploaded(context) {
      const file = context.file
      const hash = await calculateFileHash(file)
      const key = hash + file.name.split('.').pop()
      console.log(file)
      const putExtra = {
        fname: key,
        mimeType: 'video/mp4'
      }
      const config = {
        useCdnDomain: true,
        region: 'qiniu.region.z1'
      }
      const observer = {
        next(res) {
          // console.log(res)
        },
        error(err) {
          console.log(err)
        },
        complete(res) {
          console.log(res)
        }
      }
      const observable = qiniu.upload(file, key, this.qnToken, putExtra, config)
      observable.subscribe(observer)
    },

    // 上传进度
    progressUpload() {

    },
    // 上传成功
    success(response, file) {
      console.log(response, file)
    },
    // 上传失败
    error() {

    }
  }
}

</script>
<style lang='scss' scoped>
.upload-qiniu{
   width: 100%;
   height: 300px;
   text-align: center;
   .upload{
      width: 100%;
      height: 100%;
   }
}
</style>
