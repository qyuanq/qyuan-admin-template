import { debounce } from '@/utils'

export default {
  data() {
    return {
      $_sidebarElm: null,
      $_resizeHandler: null
    }
  },
  mounted() {
    this.initListener()
  },
  activated() {
    if (!this.$_resizeHandler) {
      // avoid duplication init
      this.initListener()
    }

    // when keep-alive chart activated, auto resize
    this.resize()
  },
  beforeDestroy() {
    this.destroyListener()
  },
  deactivated() {
    this.destroyListener()
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.$_resizeHandler()
      }
    },
    // 监听resize
    initListener() {
      // 防抖
      this.$_resizeHandler = debounce(() => {
        this.resize()
      }, 100)
      // 监听浏览器窗口调整
      window.addEventListener('resize', this.$_resizeHandler)
      // 侧边栏元素
      this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      // css完成transition过度后修改样式及文字：如果宽度变了，改变图表尺寸
      this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
    },
    // 销毁 取消监听
    destroyListener() {
      window.removeEventListener('resize', this.$_resizeHandler)
      this.$_resizeHandler = null

      this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
    },
    resize() {
      const { chart } = this
      // 改变图表尺寸
      chart && chart.resize()
    }
  }
}
