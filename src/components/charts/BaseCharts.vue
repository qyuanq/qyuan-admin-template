<template>
  <div  id="myChart" ref="myChart" :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixin/resize'
export default {
     mixins: [resize],
props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
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
  data(){
      return{
          chart: null
      }
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
  methods:{
      initChart() {
          const myChart = this.$refs['myChart'];
          if(myChart){

          
          //初始化 echarts对象
          this.chart = echarts.init(document.getElementById('myChart'))
          //将配置挂载在echarts上
          this.chart.setOption({
              xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
    }]
          }) 
      }
      }
  }
}
</script>

<style>

</style>