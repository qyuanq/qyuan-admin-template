<template>
  <div class="container">
    <div class="content-select">
      <div class="btns">
        <el-button type="primary">去商品库</el-button>
        <el-button type="primary">自建商品</el-button>
        <el-button type="primary">导出商品</el-button>
        <el-button type="warning">删除选中商品</el-button>
        <el-button type="danger">批量操作</el-button>
      </div>
      <div class="selects">
        <div class="drop-down">
          <el-select v-model="timerValue" clearable placeholder="按商品创建时间倒序">
            <el-option
              v-for="item in timerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @change="timerChange"
            />
          </el-select>
        </div>
        <div class="drop-down">
          <el-select v-model="groupValue" clearable placeholder="选择分类">
            <el-option
              v-for="item in groupOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @change="groupChange"
            />
          </el-select>
        </div>
        <div class="select-btn">
          <el-input v-model="input2" placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </div>
      </div>
    </div>
    <div class="content-pane">
      <ul class="head">
        <li>
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        </li>
        <li><span>商品</span></li>
        <li class="swatch1">
          学生端是否显示商品有效期
          <el-tooltip :content="isStudenShow" placement="top">
            <el-switch v-model="isStudenShow" active-value="是" inactive-value="否" />
          </el-tooltip>
        </li>
        <li class="swatch1">
          展示商品划线价
          <el-tooltip :content="isGoodShow" placement="top">
            <el-switch v-model="isGoodShow" active-value="是" inactive-value="否" />
          </el-tooltip>
        </li>
      </ul>
      <!-- <el-checkbox-group v-model="checkList"> -->
      <div class="good-list">
        <div v-for="item in goodList" :key="item.id" class="good">
          <div class="checkbox"><el-checkbox v-model="item.checked" /></div>
          <GoodItem :goods="item" />
        </div>
      </div>
      <div class="page">
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </div>
      <!-- </el-checkbox-group> -->
    </div>
  </div>
</template>

<script>
import GoodItem from './components/GoodItem.vue'
import Pagination from '@/components/Pagination'
export default {

  components: { GoodItem, Pagination },
  data() {
    return {
      isStudenShow: '是',
      isGoodShow: '否',
      total: 1000,
      listQuery: {
        page: 1,
        limit: 10
      },
      timerOptions: [
        { value: 1, label: '按商品创建时间顺序' },
        { value: 2, label: '按商品创建时间倒序' },
        { value: 3, label: '按商品排序顺序' },
        { value: 4, label: '按商品排序倒序' }
      ],
      timerValue: '',
      groupOptions: [
        { value: 1, label: '自学考试' },
        { value: 2, label: '成人高考' },
        { value: 3, label: '研究生' },
        { value: 4, label: '资格证' }
      ],
      groupValue: '',
      goodList: [],
      goodInfo: [
        // { id: 1, checked: false },
        // { id: 2, checked: false },
        // { id: 3, checked: false }

      ]
    }
  },
  computed: {
    // 全选标识
    checkAll() {
      return this.goodInfo.every(good => {
        return good.checked === true
      })
    }
  },

  created() {
    let i = 1
    while (i < 2000) {
      this.goodInfo.push({ id: i, checked: false, name: '二级造价师-建设工程计量与计价实务（土木建筑工程）' + i })
      i++
    }
    this.goodList = this.goodInfo.slice(0, this.listQuery.page * this.listQuery.limit)
  },

  methods: {
    // 获取列表信息
    getList() {
      const prePage = this.listQuery.page - 1
      this.goodList = this.goodInfo.slice(prePage * this.listQuery.limit, this.listQuery.page * this.listQuery.limit)
    },
    // 全选
    handleCheckAllChange(value) {
      if (!value) {
        this.goodInfo.forEach(good => {
          this.$set(good, 'checked', false)
        })
      } else {
        this.goodInfo.forEach(good => {
          if (!good.checked) {
            this.$set(good, 'checked', true)
          }
        })
      }
    },

    handleSizeChange(val) {
      console.log('每页' + val + '条')
    },
    handleCurrentChange(val) {
      console.log('当前第' + val + '页')
    },

    timerChange(value) {
      console.log(value)
      this.timerValue = value
    },
    groupChange(value) {
      this.groupValue = value
    }
  }
}

</script>
<style lang='scss' scoped>
 @import "src/styles/mixin.scss";
.container{
  background: #f6f6f6;
  padding: 30px 20px;
  .content-select{
    background: #fff;
    box-shadow: 1px 1px 3px #ccc;
    .btns{
      width: 100%;
      height: 65px;
      line-height: 65px;
      padding: 0 20px;
      border: 1px solid #eee;
    }
    .selects{
      width: 100%;
      height: 80px;
      padding: 20px;
      display: flex;
      border: 1px solid #eee;
      .drop-down{
        margin-right: 10px;
      }
      .select-btn{
        ::v-deep{
          .el-input{
            width: 300px;
          }
        }
      }
    }
  }
  .content-pane{
    background: #fff;
    margin-top: 30px;
    box-shadow: 1px 1px 3px #ccc;
    .head{
      width: 100%;
      height: 60px;
      padding: 20px;
      @include clearfix;
      li{
        float: left;
        &:nth-child(n+2){
          margin-left: 20px;
        }
      }
    }
    .good-list{
      .good{
        display: flex;
        align-items: center;
        border-top: 1px solid #ccc;
        &:last-child{
          border-bottom: 1px solid #eee;
        }
        .checkbox{
          width: 60px;
          text-align: center;
          // height: 100%;
          // line-height: 100%;
        }
      }
    }
    .page{
      width: 100%;
      height: 70px;
    }
  }
}
</style>
