<template>
  <div class="upload-qiniu">
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
import * as qiniu from 'qiniu-js'
export default {

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
