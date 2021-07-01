<template>
  <div class="chart-container">
    <!-- <line-marker height="100%" width="100%" /> -->
    <mix-chart height="100%" width="100%" />
  </div>
</template>

<script>
import MixChart from '@/components/charts/MixChart.vue'
import LineMarker from '@/components/charts/LineMarker.vue'
export default {

  components: {
    MixChart,
    LineMarker
  },
  data() {
    return {
    }
  },

  computed: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
