<template>
    <div class="usageNotice">
        <h1>用户安全使用须知</h1>
        <p class="one-p">使用前请仔细阅读“用户安全使用须知”避免意外发生</p>
        <hr>
        <ul>
            <li>1.</li><li>皮肤病患者或患有其他疾病者，使用前请咨询医生确认是否可以使用</li>
        </ul>
        <ul>
            <li>2.</li><li>不要在剧烈运动后马上使用设备，建议缓解30分钟左右平静下来后再使用</li>
        </ul>
        <ul>
            <li>3.</li><li>请保持内部清洁，避免异物掉落产品内部，特别注意避免浴巾毛巾塞入产品内部</li>
        </ul>
        <ul>
            <li>4.</li><li>请保持内部清洁，避免异物掉落产品内部，特别注意避免浴巾毛巾塞入产品内部</li>
        </ul>
        <ul>
            <li>5.</li><li>请不要在产品内部烘干衣物，不要把食物等任何东西放在产品内进行干燥加热</li>
        </ul>
        <ul>
            <li>6.</li><li>请主要不要将饮料或水洒在产品上或产品内，尤其不能洒如产品内部温控器上</li>
        </ul>
        <ul>
            <li>7.</li><li>建议使用温度为55~60°C，高温环境下请不要长时间使用，第一次使用温度建议40~50°C</li>
        </ul>
        <ul>
            <li>8.</li><li>请不要在使用时插拔产品电源，避免造成触电或火灾的风险</li>
        </ul>
        <van-button size="small" @click="Ido">我已阅读并同意</van-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                agree: false
            }
        },
        methods: {
            Ido() {
                this.agree = true;
                this.$router.replace({path:'/',query:{agree:this.agree}})
                this.$router.go(-1)
            }
        },
    }
</script>

<style lang="scss" scoped>
.usageNotice{
    width: 100%;
    position: absolute;
    padding: 20px;
    box-sizing: border-box;
    h1{
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        height: 2rem;
        line-height: 1rem;
    }
    p{
        font-size: 14px;
        line-height: 1.5rem;
        // height: 1rem;
    }
    .one-p{
        margin-bottom: 1rem;
    }
    ul{
        margin-top: 1rem;
        display: flex;
        li{
            line-height: 1.5rem;
        }
        li:nth-of-type(1){
            margin-right: 5px;
        }
    }
    .van-button--default{
        background: #fff;
        color: #000;
        border: 1px solid #000;
        border-radius: 5px;
        display: block;
        margin: 3rem auto 0;
    }
    .van-button__text{
        font-size: 1rem;
    }
}
</style>