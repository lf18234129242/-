<template>
  <div class="hello">
    <div class="logo-box">
      <img class="logo" src="./../assets/img/logo.png" alt="">
    </div>
    <div class="hjvg-big">
      <img src="./../assets/img/hjvgxd.png" alt="">
    </div>
    <h2 class="price">{{time}}分钟/{{price}}元</h2>
    <p class="introduction">帮助平衡体温，增强血液循环，放松神经肌肉，促进身体代谢</p>
    <van-button @click="begin" :disabled="disabled_btn" size="large">点击开始汗蒸</van-button>
    <div class="use-know">
      <van-checkbox v-model="checked" shape="square">我已阅读<i @click="use_know">“用户安全使用须知”</i></van-checkbox>
    </div>

    <!-- 查询是否有新用户免费体验活动 -->
    <van-popup v-model="show_popup">
      <div class="show-popup-box">
        <div class="show-popup">
          <div class="show-popup-child">
            <h2>{{activityName}}</h2>
            <h3>每人限领1张，10天内有效</h3>
            <van-button size="large" @click="receive">限时领</van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import url from './../serviceAPI.config.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      disabled_btn: false,
      checked:true,
      show_popup: true,    //查询是否有新用户免费体验活动
      time:'',
      price:'',
      activityName:'',    //"新用户免费领取"
      activityId:'',    //"新用户免费领取 id
    }
  },
  created(){
    this.hasActivity();
    this.getDevice(); 
  },
  mounted(){
    this.checked = this.$route.query.agree;
  },
  methods: {
    // 查询时长和价格
    getDevice(){
      this.axios({
          url:url.getDevice,
          method:'get',
          params:{
              device:url.deviceCode
          }
      }).then((res)=>{
          console.log(res)
          if(res.data.code == 200){
            this.time = res.data.result.time;
            this.price = res.data.result.price;
          }
      }).catch((err)=>{
          console.log(err)
      })
    },
    // 领取卡券
    receive(){
      this.axios({
        url:url.sendActivity,
        method:'get',
        params:{
          deviceCode:url.deviceCode,
          openId:url.openid,
          activityId:this.activityId,
        }
      }).then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.$toast(res.data.message)
        }else{
          this.$toast(res.data.message)
        }
        this.show_popup = false;
      }).catch((err)=>{
        console.log(err)
      })
    },
    //查询是否有新用户免费体验活动
    hasActivity(){
      this.axios({
        url:url.hasActivity,
        method:'get',
        params:{
          deviceCode:url.deviceCode,
        }
      }).then((res) => {
        console.log(res)
        if(res.data.code == 200){
          this.activityName = res.data.result.activityName;
          this.activityId = res.data.result.id;
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 开始汗蒸
    begin() {
      if(this.checked){
        this.disabled_btn = true;
        this.$router.push('/pay')
      }else{
        this.$toast('请您先阅读并同意用户安全使用须知')
      }
    },
    use_know(){
      this.$router.push('/usageNotice')
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello{
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fafafa;
  .logo-box{
    width: 100%;
    height: 6.933rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 3rem;
    .logo{
      width: 10.467rem;
      height: 3.233rem;
    }
  }
  .hjvg-big{
    width: 14.5rem;
    height: 18.6rem;
    margin: 0 auto 1.167rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .price{
    width: 13rem;
    height: 1.933rem;
    border: 1px solid #333333;
    border-radius: 29px;
    font-size: 1.333rem;
    color: #653100;
    text-align: center;
    line-height: 1.933rem;
    margin: 0 auto 1.867rem;
  }
  .introduction{
    width: 100%;
    height: .833rem;
    line-height: .833rem;
    font-size: 12px;
    color: #010101;
    text-align: center;
    margin-bottom: 3.833rem;
  }
  .use-know{
    width: 100%;
    height: 2.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 2rem;
  }
  .show-popup-box{
    width: 22rem;
    height: 15.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .show-popup{
      width: 20.933rem;
      height: 14.133rem;
      border: 1px solid #f1ca24;
      border-radius: 5px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      .show-popup-child{
        width: 20.4rem;
        height: 13.567rem;
        border: 1px solid #fcf3cc;
        border-radius: 3px;
        box-sizing: border-box;
        h2{
          font-size: 1.4rem;
          color: #cd9800;
          text-align: center;
          // line-height: 
          margin-top: 3.2rem;
          margin-bottom: 1.067rem;
        }
        h3{
          font-size: 1rem;
          color: #eeb100;
          text-align: center;
          margin-bottom: 2.2rem;
        }
        .van-button--large{
          width: 8.667rem;
          height: 2.2rem;
          line-height: 2.2rem;
        }
        .van-button__text{
          font-size: 1.1rem;
        }
      }
    }
  }
  
  
}
</style>
<style>
/* .van-checkbox__icon--round .van-icon{
  border-radius: 0;
} */
.van-checkbox__icon--checked .van-icon{
  border-color:#f1cb28;
  background: #f1cb28;
}
</style>
