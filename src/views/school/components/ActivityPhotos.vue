<template>
  <div class="activity-container">
    <el-row>
      <el-col :span="18">
        <div class="btns">
          <el-button type="primary">下载海报</el-button>
        </div>
        <div ref="interface" class="interface">
          <canvas ref="canvas" width="750" height="600" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="editor">
          <div class="logo">
            <h3>LOGO</h3>
            <el-upload
              action=" "
              list-type="picture-card"
              :auto-upload="true"
              :before-upload="beforeUploaded"
              :http-request="uploaded"
            >
              <i slot="default" class="el-icon-plus" />
            </el-upload>
          </div>
          <div class="text-style">
            <div class="btns">
              <el-checkbox v-model="checked">显示文本内容</el-checkbox>
              <el-color-picker v-model="color1" />
              <button>B</button>
              <el-input-number v-model="num" :min="1" :max="10" label="描述文字" @change="handleChange" />
            </div>
            <p>请选择文本内容进行编辑（内容、字号、字色）</p>
          </div>
          <div class="temp">
            <h3>海报模板</h3>
            <el-upload
              action=" "
              list-type="picture-card"
              :auto-upload="true"
              :before-upload="beforeUploaded"
              :http-request="uploaded"
            >
              <i slot="default" class="el-icon-plus" />
            </el-upload>
          </div>
          <div class="ewm">
            <h3>个人二维码</h3>
            <el-upload
              action=" "
              list-type="picture-card"
              :auto-upload="true"
              :before-upload="beforeUploaded"
              :http-request="uploaded"
            >
              <i slot="default" class="el-icon-plus" />
            </el-upload>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { uploadFileExcel } from '@/api/table'
import { calculateFileHash } from '@/utils/upload'
export default {

  components: {},
  data() {
    return {
      checked: true,
      color1: '#00ff00',
      num: 5,
      hash: '',
      idx: 0
    }
  },

  computed: {},

  methods: {
    async beforeUploaded(file) {
      this.hash = await calculateFileHash(file)
      console.log(file, this.hash)
    },
    async uploaded(e, index) {
      const file = e.file
      const formData = new FormData()
      formData.append('file', file)
      formData.append('hash', this.hash)
      const res = await uploadFileExcel(formData)
      if (res.code === 20000) {
        // 画图
        console.log(document.images[1].naturalHeight, document.images[1].naturalWidth)
        this.idx += 1
        const image = document.images[this.idx]
        // 获取图片原始高度
        const naturalHeight = image.naturalHeight
        // 获取图片原始宽度
        const naturalWidth = image.naturalWidth
        // 改变canvas宽高
        // 改变界面宽高
        const ctx = this.$refs.canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
      }
    },
    handleChange() {

    }
  }
}

</script>
<style lang='scss' scoped>
.activity-container{
    .interface{
        width: 750px;
        height: 600px;
        margin: 0 auto;
    }
    .editor{
        height: 100vh;
        background:#fff;
        padding: 10px;
    }
}
</style>
