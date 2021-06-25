<template>
  <div class="good-container">
    <el-row>
      <el-col :span="3">
        <div class="item-img">
          <img src="http://ppt.beegoedu.com/Upload/temp/20210531104322V07.png">
        </div>
      </el-col>
      <el-col :span="18">
        <div class="content">
          <h2 class="cource-title">{{ goods.name }}<span class="cource-type" /><span class="cource-city" /></h2>
          <div class="cource-specali">专业：二级造价工程师</div>
          <div class="content-center">
            <div class="content-item">
              <p class="create-time">创建时间：<span /></p>
              <p class="cooper-price">合作价：<span /></p>
            </div>
            <div class="content-item">
              <p class="end-item">结课时间：<span /></p>
              <p class="min-start-day">最小学习天数：<span /></p>
            </div>
            <div class="content-item-right">
              <div class="input-item">排序<el-input v-model="sorting" :min="0" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" /></div>
              <div class="input-item">折扣价<el-input v-model="discount" :min="0" /></div>
              <div class="input-item">零售价<el-input v-model="retailPrice" :min="0" /></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="operation">
          <div>
            <el-switch v-model="isOpen" active-text="上架" inactive-text="下架" />
          </div>
          <div class="btn">
            <el-button type="danger" size="mini">编辑</el-button>
          </div>
          <div class="btn">
            <el-button type="primary">包含班型</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: { goods: {
    type: Object
  }},
  data() {
    return {
      isOpen: true,
      sorting: 99,
      discount: 699,
      retailPrice: 1299
    }
  },

  computed: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
p{
    margin: 5px 0;
}
.good-container{
    width: 100%;
    padding: 20px 0;
    // height: 155px;
    .item-img{
        width: 100%;
        height: 100%;
        img{
            max-width:100%;
        }
    }
    .content{
        width: 100%;
        padding: 0 20px;
        .cource-title{
            font-size: 16px;
            font-weight: bold;
        }
        .cource-specali{
            margin-top: 8px;
        }
        .content-item{
            float:left;
            margin-top: 10px;
        }
        .content-item-right{
            float: right;
            .input-item{
                text-align: right;
                margin: 3px 0;
            }
            ::v-deep{
                .el-input{
                    width: 70px;
                    height: 20px;
                }
                .el-input__inner{
                    height: 20px;
                    line-height: 20px;
                }
            }
        }
    }
    .operation{
        padding: 10px 0;
        text-align: center;
        border-left: 1px dashed #ccc;
        .btn{
            margin-top: 10px;
        }
    }
}
</style>
