<template>
  <div class="activity">
      <home-title name="活动">
          <template v-slot:icon>
              <i class="el-icon-platform-eleme" />
          </template>
      </home-title>
      <div class="activity-body">
          <img src="../assets/hd.jpg" class="picture" />
          <div class="">【进行中】618年中限时优惠</div>
          <div class="">
              <i class="el-icon-platform-eleme" />
              <span>活动剩余时间 </span>
          </div>
      </div>
  </div>
</template>

<script>
import homeTitle from './home-title'
export default {
  data () {
    return {
      
    };
  },

  components: {
     'home-title': homeTitle
  },

  computed: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
.activity{
    width:100%;
    background: #fff;
    .activity-body{
      width: 100%;
      padding: 10px;
      .picture{
        width: 100%;
        border-radius: 25px;
      }
    }
}
</style>