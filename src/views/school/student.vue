<template>
  <div class="tabs">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="(tab,index) in tabMapOptions" :key="tab.key" :label="tab.label" :name="tab.key">
        <div class="chart-container">
          <keep-alive>
            <BaseCharts v-if="activeName == tab.key" :id="index" height="100%" width="100%" />
          </keep-alive>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BaseCharts from '@/components/charts/BaseCharts.vue'
export default {

  components: {
    BaseCharts
  },
  data() {
    return {
      activeName: 'week',
      tabMapOptions: [
        { label: '近一周', key: 'week' },
        { label: '近一月', key: 'month' },
        { label: '近三月', key: 'quarter' },
        { label: '近一年', key: 'year' }
      ]
    }
  },

  computed: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
.tabs{
  padding: 0 15px;
}
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
