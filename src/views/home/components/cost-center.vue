<template>
  <div class="cost">
      <home-title name="费用中心" linkName="交易明细"></home-title>
      <div class="cost-body">
        <div class="cost-box">
          <div class="account-title">账户余额</div>
          <div class="account-num"><span class="symbol">￥</span>{{integer[0]}}<span class="point">{{'.' + integer[1]}}</span></div>
          <div class="account-btn">充值</div>
        </div>
        <div class="cost-box">
          <div class="consump">
            <div class="consump-amount">本月消费金额<span class="mount">{{month}}</span></div>
            <div class="consump-num">{{'￥' + amount}}</div>
            <div class="last-consump-amount">本月消费金额<span>{{lastMonth}}</span></div>
            <div class="last-consump-num">{{'￥' + amount}}</div>
          </div>
        </div>
        <div class="cost-box">
          
        </div>
      </div>
  </div>
</template>

<script>
import homeTitle from './home-title'
export default {
  props:{
    balance:{
      type:Number,
      default:0.00
    }
  },

  data () {
    return {
      amount: 0,
      integer: null,
      lastMonth: null,
      month: null
    };
  },

  components: {
    'home-title': homeTitle
  },

  computed: {
    integer(){
      return this.balance.split(".");
       
    }
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
.cost{
  width:100%;
  border:1px sold #eee;
  box-shadow:1px 1px 3px #ccc;
  background: #fff;
  &-body{
    display: flex;
    border-top:1px solid #eee;
    height: 240px;
    .cost-box{
      flex:1;
      text-align: center;
      box-sizing: border-box;
      &:nth-child(n+1){
        border-left:1px dashed #eee;
      }
      .account-title{
        margin: 30px 0 0 20px;
        text-align: left;
      }
      .account-num{
        margin-top: 40px;
        font-size: 36px;
        color: #333;
        .symbol{
          font-size: 18px;
        }
        .point{
          font-size: 24px;
        }
      }
      .account-btn{
        width: 100px;
        height: 30px;
        margin: 30px auto 0;
        border-radius: 20px;
        border: 1px solid #0095d3;
        text-align: center;
        line-height: 30px;
      }
      .consump{
        width: 250px;
        margin: 0 auto;
        padding: 45px 0;
        box-sizing: border-box;
        .consump-amount{
          font-size: 16px;
          .mount{
            color: #999;
          }
        }
        .consump-num{
          margin-top: 20px;
          color: #ff6600;
        }
        .last-consump-amount{
          margin-top: 30px;
          color: #888;
        }
        .last-consump-num{
          margin-top: 20px;
          color: #888;
        }
      }
    }
  }
}
</style>