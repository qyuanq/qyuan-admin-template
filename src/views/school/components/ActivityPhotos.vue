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
            <upload-image :data-obj="logoURL" @changeCanvas="changeLogo" />
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
            <upload-image :data="{type:'111'}" :data-obj="bgURL" @changeCanvas="changeBg" />
          </div>
          <div class="ewm">
            <h3>个人二维码</h3>
            <upload-image :data-obj="ewmURL" @changeCanvas="changeEwm" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { saveAs } from 'file-saver'
import UploadImage from './UploadImage'
export default {

  components: { UploadImage },
  data() {
    return {
      checked: true,
      color1: '#FF4640',
      num: 20,
      canvas: null,
      selectedObj: null, // 当前选中图层
      FontObj: null, // 字体图层
      LogoObj: null, // logo图层
      ewmObj: null, // ewm图层
      isWeight: false,
      fontTop: 0, // 文字距离画布y轴距离
      bgURL: { // 背景图片信息
        url: '',
        name: ''
      },
      logoURL: { // logo图信息
        url: '',
        name: ''
      },
      ewmURL: { // 二维码图信息
        url: '',
        name: ''
      },
      fileList: []
    }
  },

  mounted() {
    this.canvas = new fabric.Canvas('layer', {
      backgroundColor: 'white'
    })
    // 初始化文字
    this.setText(this.canvas)
    this.addCardEventListener(this.canvas)
  },

  methods: {
    changeLogo(e) {
      this.logoURL = e
      // 删除图片 图片对象为空 删除图层
      if (this.logoURL.url === '') {
        this.removeLogo()
        return
      }
      // 图层对象存在 先删除图层再创建
      if (this.LogoObj) {
        this.removeLogo()
      }
      this.setImage(this.logoURL.url, 30, 30, 'logo')
    },
    changeBg(e) {
      this.bgURL = e
      if (this.bgURL.url === '') {
        this.removeBg()
        return
      }
      this.removeBg()
      this.setBg()
    },
    changeEwm(e) {
      this.ewmURL = e
      // 删除图片 图片对象为空 删除图层
      if (this.ewmURL.url === '') {
        this.removeEwm()
        return
      }
      // 图层对象存在 先删除图层再创建
      if (this.LogoObj) {
        this.removeEwm()
      }
      this.setImage(this.ewmURL.url, 30, 300, 'ewm')
    },

    // 设置图片图层
    setImage(url, x, y, type) {
      fabric.Image.fromURL(url, (img) => {
        // 添加对象后, 如下图
        img.set({
          left: x,
          top: y
        })
        this.canvas.add(img).setActiveObject(img)
        if (type === 'logo') {
          this.LogoObj = this.canvas.getActiveObject()
          return
        }
        this.ewmObj = this.canvas.getActiveObject()
      })
    },
    // 设置背景
    setBg() {
      const canvas = this.canvas
      fabric.Image.fromURL(this.bgURL.url, function(img) {
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
      // 文字隐藏
      if (!this.checked && this.FontObj) {
        this.FontObj.set('opacity', 0)
        this.canvas.discardActiveObject() // 取消选中
        this.canvas.renderAll() // 渲染画布
        return
      }
      // 文字显示
      this.FontObj.set('opacity', 1)
      this.canvas.renderAll()
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
      this.LogoObj = null
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
      this.ewmObj = null
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
