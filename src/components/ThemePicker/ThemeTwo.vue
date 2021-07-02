<template>
  <div class="theme">
    <el-switch v-model="theme" />
  </div>
</template>

<script>
import { toggleClass } from '@/utils'
import '@/assets/custom-theme/index.css'
export default {
  name: 'Theme',
  components: {},
  data() {
    return {
      theme: false
    }
  },
  computed: {},

  watch: {
    theme() {
      toggleClass(document.body, 'custom-theme')
    }
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
.theme{float: left;}
</style>
