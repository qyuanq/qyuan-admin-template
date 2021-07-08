<template>
  <div class="activity-container">
    <el-row>
      <el-col :span="18">
        <div class="posters">
          <div class="btns">
            <el-button type="primary" @click="downloadBill">下载海报</el-button>
          </div>
          <div ref="interface" class="interface">
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
              :before-remove="removeLogo"
            >
              <i slot="default" class="el-icon-plus" />
            </el-upload>
          </div>
          <div class="text-style">
            <div class="btns">
              <el-checkbox v-model="checked" @change="setShow">显示文本内容</el-checkbox>
              <el-color-picker v-model="color1" @change="setColor" />
              <button :class="[{'is-weight':isWeight},'text-btn']" @click="setFontWeight">B</button>
              <el-input-number v-model="num" controls-position="right" :min="12" :max="50" label="字号" @change="setFontSize" />
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
              :on-remove="removeBg"
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
              :before-remove="removeEwm"
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
import { saveAs } from 'file-saver'
export default {

  components: {},
  data() {
    return {
      checked: true,
      color1: '#FF4640',
      num: 20,
      hash: '',
      canvas: null,
      selectedObj: null, // 当前选中图层
      FontObj: null, // 字体图层
      LogoObj: null, // logo图层
      ewmObj: null, // ewm图层
      isWeight: false,
      fontTop: 0, // 文字距离画布y轴距离
      bgURL: '', // 背景图片地址
      logoURL: '', // logo图地址
      ewmURL: ''// 二维码图地址
    }
  },

  mounted() {
    this.canvas = new fabric.Canvas('layer', {
      backgroundColor: 'white'
    })
    this.setText(this.canvas)
    this.addCardEventListener(this.canvas)
  },

  methods: {
    async beforeUploaded(file) {
      this.hash = await calculateFileHash(file)
    },
    async uploaded(e) {
      console.log(e)
      const formData = new FormData()
      formData.append('file', e.file)
      formData.append('hash', this.hash)
      const res = await uploadFileExcel(formData)
      console.log(res)
      if (res.code === 20000) {
        // 图片前缀处理跨域 代理
        const fir = '/dev-api/api/'
        // 背景还是图层
        const canvas = this.canvas
        if (e.data.type === 'bg') {
          this.bgURL = fir + res.data.url
          this.setBg(canvas)
          return
        } else if (e.data.type === 'logo') {
          this.logoURL = fir + res.data.url
          this.setImage(canvas, this.logoURL, 30, 30, 'logo')
          return
        } else if (e.data.type === 'ewm') {
          this.ewmURL = fir + res.data.url
          this.setImage(canvas, this.ewmURL, 30, 200, 'ewm')
          return
        }
      }
    },
    // 设置图片图层
    setImage(canvas, url, x, y, type) {
      fabric.Image.fromURL(url, (img) => {
        // 添加对象后, 如下图
        img.set({
          left: x,
          top: y
        })
        canvas.add(img).setActiveObject(img)
        if (type === 'logo') {
          this.LogoObj = canvas.getActiveObject()
          return
        }
        this.ewmObj = canvas.getActiveObject()
      })
    },
    // 设置背景
    setBg(canvas) {
      fabric.Image.fromURL(this.bgURL, function(img) {
        img.set({
          // 通过scale来设置图片大小，这里设置和画布一样大
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height
        })
        // 设置背景
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))
        canvas.renderAll()
      })
    },
    // 设置字体
    setText(canvas) {
      const textbox = new fabric.Textbox('这是一段文字', {
        left: 100,
        top: 100,
        width: 150,
        fontSize: this.num,
        fontWeight: 400,
        fill: this.color1,
        // hasControls: false,
        borderColor: '#ff8d23',
        editingBorderColor: '#ff8d23'
      })
      canvas.add(textbox).setActiveObject(textbox)
      this.FontObj = canvas.getActiveObject()
    },
    // 文字是否显示
    setShow() {
      if (!this.checked && this.FontObj) {
        // this.canvas.remove(this.selectedObj) // 传入需要移除的object
        this.fontTop = this.FontObj.top
        this.FontObj.set({
          top: -500
        })
        this.canvas.renderAll()
        return
      }
      this.FontObj.set({
        top: this.fontTop
      })
      this.canvas.renderAll()
      // this.setText(this.canvas)
    },
    // 文字颜色改变
    setColor() {
      this.FontObj.set({
        fill: this.color1
      })
      this.canvas.renderAll()
    },
    // 文字加粗
    setFontWeight() {
      this.isWeight = !this.isWeight
      if (this.isWeight) {
        this.FontObj.set({
          fontWeight: 800
        })
      } else {
        this.FontObj.set({
          fontWeight: 400
        })
      }
      this.canvas.renderAll()
    },
    // 改变文字大小
    setFontSize() {
      this.FontObj.set({
        fontSize: this.num
      })
      this.canvas.renderAll()
    },
    // 监听canvas事件
    addCardEventListener(card) {
      card.on('object:added', (e) => { // 添加图层
        console.log('object:added', e)
        // this.saveState()
      })
      card.on('object:modified', (e) => { // 编辑图层
        console.log('object:modified', e)
        console.log('文字图层', this.FontObj)
        // this.saveState()
      })
      card.on('object:removed', (e) => { // 移除图层
        console.log('object:removed', e)
        // this.saveState()
      })
      card.on('object:selected', (e) => {
        console.log('object:selected', e)
        this.selectedObj = e.target
      })
      card.on('selection:created', (e) => { // 初次选中图层
        console.log('selection:created', e.target)
        this.selectedObj = e.target
      })
      card.on('selection:updated', (e) => { // 图层选择变化
        console.log('selection:updated', e)
        this.selectedObj = e.target
      })
      card.on('selection:cleared', (e) => { // 清空图层选中
        console.log('selection:cleared')
        this.selectedObj = null
      })
    },
    // 移除logo图层
    removeLogo() {
      if (!this.LogoObj) {
        return false
      }
      this.canvas.remove(this.LogoObj)
      this.canvas.renderAll()
    },
    // 移除canvas背景
    removeBg() {
      this.canvas.setBackgroundImage()
      this.canvas.renderAll()
    },
    // 移除ewm图层
    removeEwm() {
      if (!this.ewmObj) {
        return false
      }
      this.canvas.remove(this.ewmObj)
      this.canvas.renderAll()
    },
    // 下载海报
    downloadBill() {
      const dataURL = this.canvas.toDataURL({
        format: 'png' // jpeg或png
        // quality: 0.8 // 图片质量，仅jpeg时可用
        // 截取指定位置和大小
        // left: 100,
        // top: 100,
        // width: 200,
        // height: 200
      })
      console.log('生成的图片地址', dataURL)
      saveAs(dataURL, 'image/png')
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
        .btns{
          display: flex;
          align-items: center;
          .text-btn{
            width: 40px;
            height: 40px;
            color: #333;
          }
          .is-weight{
            color:#409EFF;
          }
        }
    }
}
</style>
