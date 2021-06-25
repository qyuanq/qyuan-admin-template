<template>
  <div class="container">
      <div class="pane-bar">
        <div class="name">
            <slot name="icon"></slot>
            {{name}}
        </div>
        <slot name="center"></slot>
        <div class="link" v-if="linkName">
            <router-link :to="link">{{linkName}}</router-link>
            <slot name="right"></slot> 
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props:{
      name:{
          type:String,
          default:''
      },
      linkName:{
          type:String,
          default:''
      },
      link:{
          type:String,
          default:''
      }
  },
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
.container{
    width:100%;
    .pane-bar{
        display: flex;
        justify-content: space-between;
        padding:0 15px;
        box-sizing: border-box;
        height:65px;
        line-height:65px;
        .name{
            font-size:16px;
            color: rgb(51,51,51)
        }
        .link{
            font-size:16px;
            color: #0095d3;
        }
    }
}
</style>