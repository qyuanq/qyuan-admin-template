<template>
  <div ref="myChart" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixin/resize'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: Number,
      default: 0
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      showData: [] // 图表展示数据
    }
  },
  created() {
    console.log(this.id)
    // setTimeout(() => {
    //   const first = this.id * 220
    //   data = [first, 110, 150, 190, 230, 115, 178, 300]
    // }, 1000)
    const first = this.id * 220
    this.showData = [first, 110, 150, 190, 230, 115, 178, 300]
    console.log(this.showData)
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const myChart = this.$refs['myChart']
      if (myChart) {
      // 初始化 echarts对象
        this.chart = echarts.init(myChart)
        // 将配置挂载在echarts上
        this.chart.setOption({
          title: {
            text: '订单统计'
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            },
            {
              data: this.showData,
              type: 'bar'
            }
          ]
        })
      }
    }
  }
}
</script>

<style>

</style>
