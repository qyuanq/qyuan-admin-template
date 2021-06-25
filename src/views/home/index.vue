<template>
  <div class="home-container">
    <div class="left">
      <Top />
      <cost-center style="margin-top:20px;" balance="95679.60" />
    </div>
    <div class="right">
      <activity />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Top from './components/top'
import costCenter from './components/cost-center'
import activity from './components/activity'
export default {
  name: 'Dashboard',
  components: {
    Top,
    'cost-center': costCenter,
    activity
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    console.log(this.$router)
  }
}
</script>

<style lang="scss" scoped>
.home-container{
  padding: 30px 20px;
  display: flex;
  // min-width: 990px;
  background: #f6f6f6;
  .left{
    // flex-basis: 620px;
    flex:2;
    margin-right: 20px;
  }
  .right{
    // flex-grow:1;
    flex:1;
  }
}
</style>
