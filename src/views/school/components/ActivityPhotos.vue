<template>
  <div class="activity-container">
    <el-row>
      <el-col :span="18">
        <div class="posters">
          <div class="btns">
            <el-button type="primary">下载海报</el-button>
          </div>
          <div ref="interface" class="interface">
            <!-- <canvas id="bg" ref="bg" width="375" height="667" style="position:absolute;left:0;top:0;" /> -->
            <canvas id="layer" ref="layer" width="375" height="667" style="position:absolute;left:0;top:0;" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="editor">
          <div class="logo">
            <h3>LOGO</h3>
            <el-upload
              action=" "
              :data="{type:'logo'}"
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
              :data="{type:'bg'}"
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
              :data="{type:'ewm'}"
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
import { fabric } from 'fabric'
export default {

  components: {},
  data() {
    return {
      checked: true,
      color1: '#00ff00',
      num: 5,
      hash: '',
      idx: 0,
      canvas: null,
      dragImg: [
        {
          x: 0, // 初始横坐标
          y: 0, // 初始纵坐标
          w: 375, // 图片宽
          h: 667, // 图片高
          url: '',
          selected: false// 是否被选中
        }
      ]
    }
  },

  mounted() {
    this.bindListener()
  },

  methods: {
    async beforeUploaded(file) {
      this.hash = await calculateFileHash(file)
      console.log(file, this.hash)
    },
    async uploaded(e, index) {
      console.log(e)
      const formData = new FormData()
      formData.append('file', e.file)
      formData.append('hash', this.hash)
      const res = await uploadFileExcel(formData)
      console.log(res)
      if (res.code === 20000) {
        // 背景还是图层
        const canvas = new fabric.Canvas('layer')
        if (e.data.type === 'bg') {
          // 设置图层背景
          fabric.Image.fromURL('http://localhost:7001' + res.data.url, function(img) {
            img.set({
              // 通过scale来设置图片大小，这里设置和画布一样大
              scaleX: canvas.width / img.width,
              scaleY: canvas.height / img.height
            })
            // 设置背景
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))
            canvas.renderAll()
          })
          return
        }
        fabric.Image.fromURL('http://localhost:7001' + res.data.url, (img) => {
          console.log(img)
          // 添加对象后, 如下图
          canvas.add(img)
        })
        fabric.Image.fromURL('http://localhost:7001/public/6d8474743126702681aadc971a7a75f2.png', function(img) {
          img.set({
            // 通过scale来设置图片大小，这里设置和画布一样大
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height
          })
          // 设置背景
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))
          canvas.renderAll()
        })
      }
    },
    // 画图
    draw(image, imageInfo, ctx) {
      console.log(image, ctx)

      // ctx.drawImage(image, imageInfo.x, imageInfo.y, imageInfo.w, imageInfo.h)

      const pic = new fabric.Image(image, { // 设置图片位置和样子
        left: imageInfo.x,
        top: imageInfo.y,
        width: imageInfo.w,
        height: imageInfo.h
      })
      ctx.add(pic)
    },
    // 点击图层
    bindListener() {
      this.$refs.layer.addEventListener('mousedown', this.onMouseDown)
      this.$refs.layer.addEventListener('mousemove', this.onMouseMove)
    },
    // 鼠标点击
    onMouseDown(e) {
      console.log(e)
      const { offsetX, offsetY } = e
    },
    // 鼠标位置
    onMouseMove(e) {

    },
    handleChange() {

    }
  }
}

</script>
<style lang='scss' scoped>
.activity-container{
    .posters{
      position: relative;
      height: 100vh;
      .interface{
        width: 375px;
        height: 667px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
    .editor{
        height: 100vh;
        background:#fff;
        padding: 10px;
    }
}
</style>
