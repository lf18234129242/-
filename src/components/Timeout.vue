<template>
    <div class="Timeout">
        <h1>元气汗蒸已开启</h1>
        <h2>订单编号：{{orderNum}}</h2>
        <van-circle
            v-model="currentRate"
            color="#f1cb28"
            fill="#fff"
            size="180px"
            layer-color="#cccccc"
            :text="circle_text"
            :rate="circle_rate"
            :speed="circle_speed"
            :clockwise="false"
            :stroke-width="40"
        />
        <div class="toast">
            <h3>温馨提示</h3>
            <ul>
                <li>· </li>
                <li>开启设备后请将桌面下方夹板拉出，紧贴身体放置可以加快升温速度</li>
            </ul>
            <ul>
                <li>· </li>
                <li>可在桌面右上角控制面板调节温度，建议首次使用温度40~50℃，常规使用温度55~60℃</li>
            </ul>
        </div>
        <!-- 联系我们 -->
        <van-button size="large" @click="callMe">联系我们</van-button>
        <!-- 广告 -->
        <div class="ad">
            <img src="./../assets/img/ad.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                orderNum: '1234567890123456789',
                circle_text:'',
                circle_rate:60,
                circle_speed:60/(25*60),
                currentRate:0,
            }
        },
        mounted(){
            let min = 24,
            s = 60,
            timer = null;
            timer = setInterval(() => {
                s--;
                if(s < 0){
                    min--;
                    s=59;
                }else if(min == 0 && s == 0){
                    this.circle_text = `剩余00分00秒`
                    clearInterval(timer)
                }
                if(s<10){
                    s = '0' + s;
                }
                if(min < 10){
                    min = ('0' + min).slice(-2)
                }
                this.circle_text = `剩余${min}分${s}秒`
            }, 1000);
        },
        methods: {
            callMe() {
                window.location.href = 'tel://110'
            }
        },
    }
</script>

<style lang="scss" scoped>
.Timeout{
    width: 100%;
    position: absolute;
    h1{
        font-size: 2.24rem;
        height:4rem;
        color: #f1cb28;
        text-align: center;
        line-height: 4rem;
    }
    h2{
        font-size: 1.04rem;
        height: 2.2rem;
        line-height: 2.2rem;
        text-align: center;
        margin-bottom: 1.2rem;
    }
    .van-circle{
        display: block;
        margin: 0 auto 1.6rem;
    }
    .toast{
        width: 100%;
        padding: 0 3.8rem;
        box-sizing: border-box;
        margin-bottom: 1.8rem;
        h3{
            font-size: 1.12rem;
            font-weight: bold;
            margin-bottom: 0.8rem;
        }
        ul{
            font-size: 1.12rem;
            line-height: 1.44rem;
            display: flex;
            margin-bottom: 0.6rem;
            li:nth-child(1){
                font-weight: bold;
                margin-right: 5px;
            }
        }
    }
    .ad{
        width: 100%;
        margin: 4.2rem auto 0;
        img{
            width: 100%;
        }
    }
}
</style>