<template>
  <div class="download">
    <el-button @click="downZip">下载zip</el-button>
    <el-button @click="downExcel">下载excel</el-button>
    <el-button @click="downPdf">下载pdf</el-button>
    <el-button @click="downImg">下载图片</el-button>
    <el-button @click="downVideo">下载视频</el-button>
    <a href="http://qvdzzxgtx.hb-bkt.clouddn.com/a7f7b6c2f09b7191b858143f0b5a90e1.pdf" download>下载pdf</a>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { download } from '@/api/table'
export default {

  components: {},
  data() {
    return {
    }
  },

  computed: {},

  methods: {
    downZip() {
      const zip = new JSZip()
      zip.folder('test').file('1.txt', '11111\n')
      zip.generateAsync({ type: 'blob' })
        .then(blob => {
          saveAs(blob, 'ysb.zip')
        }, err => {
          console.log(err)
        })
    },
    async downExcel() {
      const stream = await download()
      console.log('读取的二进制blob流', stream)
      const blob = new Blob([stream], { type: 'image/jpeg' })
      saveAs(blob, '1.jpg')
    },
    downPdf() {

    },
    downImg() {
      saveAs('http://qvdzzxgtx.hb-bkt.clouddn.com/a0ce40201caca1835fdc86c3fe05a24f.jpg', 'image/jpg')
    },
    downVideo() {
      saveAs('http://qvdzzxgtx.hb-bkt.clouddn.com/2ad74844bb93ff104e32a6ea7e75864b.mp4', 'video/mp4')
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
