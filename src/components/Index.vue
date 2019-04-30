<template>
  <div class="hello">
    <div class="logo-box">
      <img class="logo" src="./../assets/img/logo.png" alt="">
    </div>
    <div class="hjvg-big">
      <img src="./../assets/img/hjvgxd.png" alt="">
    </div>
    <h2 class="price">25分钟/15元</h2>
    <p class="introduction">帮助平衡体温，增强血液循环，放松神经肌肉，促进身体代谢</p>
    <van-button @click="begin" :disabled="disabled_btn" size="large">点击开始汗蒸</van-button>
    <div class="use-know">
      <van-checkbox v-model="checked">我已阅读<i @click="use_know">“用户安全使用须知”</i></van-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      disabled_btn: false,
      checked:true,
    }
  },
  methods: {
    begin() {
      this.disabled_btn = true;
    },
    use_know(){
      console.log('“用户安全使用须知”')
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
    
    
  }
}
</style>
<style>
.van-checkbox__icon--round .van-icon{
  border-radius: 0;
}
.van-checkbox__icon--checked .van-icon{
  border-color:#f1cb28;
  background: #f1cb28;
}
</style>
