<template>
    <div class="Timeout">
        <h1>元气汗蒸已开启</h1>
        <h2>订单编号：{{orderId}}</h2>
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
import url from './../serviceAPI.config.js'
    export default {
        data() {
            return {
                orderId: '',
                circle_text:'',
                circle_rate:0,
                circle_speed:0.04,
                currentRate:0,
                last_Min:'',
                last_S:'',
            }
        },
        created(){
            this.axios({
                url:url.orderDetail,
                method:'get',
                params:{
                    openId:url.openid,
                    deviceCode:url.deviceCode
                }
            }).then((res)=>{
                console.log(res)
                if(res.data.code == 200){
                    this.orderId = res.data.result.orderId;
                    var endTime = new Date(res.data.result.endTime)
                    var nowTime = new Date();
                    // 结束时间
                    var end_H = endTime.getHours();  
                    var end_Min = endTime.getMinutes();  
                    var end_S = endTime.getSeconds();
                    // 当前时间
                    var now_H = nowTime.getHours();  
                    var now_Min = nowTime.getMinutes();  
                    var now_S = nowTime.getSeconds();  
                    // 剩余时间
                    let last_H,last_Min,last_S;
                    // 计算剩余时间
                    if(end_S<now_S){
                        end_Min = end_Min-1;
                        last_S = end_S + 60 - now_S;
                    }else{
                        last_S = end_S - now_S;
                    }
                    if(end_Min<now_Min){
                        end_H = end_H-1;
                        last_Min = end_Min + 60 - now_Min;
                    }else{
                        last_Min = end_Min - now_Min;
                    }
                    last_H = end_H - now_H
                    console.log(`${last_H}--${last_Min}--${last_S}`)
                    
                    // 环形进度条的进度
                    this.circle_rate = 100 - Math.round((last_Min/25 + (last_S/1500))*100)
                    this.currentRate = this.circle_rate;
                    // 计算环形进度条中间的文字
                    let min = last_Min,
                    s = last_S,
                    timer = null;
                    this.circle_text = `剩余${min}分${s}秒`
                    timer = setInterval(() => {
                        s--;
                        if(s < 0){
                            min--;
                            s=59;
                        }else if(min == 0 && s == 0){
                            // this.circle_text = `剩余00分00秒`
                            this.circle_text = `汗蒸体验已结束`
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
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        mounted(){
            
        },
        methods: {
            callMe() {
                window.location.href = 'https://www.wenjuan.com/s/2AzaQj/'
            }
        },
    }
</script>

<style lang="scss" scoped>
.Timeout{
    width: 100%;
    position: absolute;
    background: #fafafa;
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