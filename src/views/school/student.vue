<template>
  <div class="tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="tab in tabMapOptions" :key="tab.key" :label="tab.label" :name="tab.key">
          <keep-alive>
            <BaseCharts v-if="activeName == tab.key" height="100%" width="100%"/>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import BaseCharts from '@/components/charts/BaseCharts.vue'
export default {
  data () {
    return {
      activeName:'week',
      tabMapOptions: [
        { label: '近一周', key: 'week' },
        { label: '近一月', key: 'month' },
        { label: '近三月', key: 'quarter' },
        { label: '近一年', key: 'year' }
      ],
    };
  },

  components: {
    BaseCharts
  },

  computed: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>