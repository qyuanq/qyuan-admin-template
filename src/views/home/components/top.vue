<template>
  <div class="statistical">
    <ul class="pane">
        <li class="pane-box" v-for="item in 4" :key="item">
            <router-link to="/">用户数<span class="count">75</span></router-link>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
.statistical{
    width:100%;
    background: #fff;
    padding: 20px;
    box-sizing:border-box;
    .pane{
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: space-between;
        .pane-box{
            list-style: none;
            flex: 0 0 190px;
            height:50px;
            line-height:50px;
            border: 1px solid rgb(204,204,204);
            border-radius: 10px;
            padding: 0 15px;
            color: rgb(0,149,211);
            .count{
                float:right;
                color: rgb(51,51,51);
            }
        }
    }
}
</style>