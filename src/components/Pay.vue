<template>
    <div class="pay">
        <div class="price-1">
            <li>元气汗蒸 - 25分钟</li>
            <li>￥15</li>
        </div>
        <div class="price-2">
            <span>合计 </span>
            <li>￥15</li>
        </div>
        <div class="card-box use-card">
            <div class="div flex">
                <p>使用卡券支付（可使用10张）</p>
                <van-checkbox v-model="checked_usecard" checked-color="#f1ca24"></van-checkbox>
            </div>
        </div>
        <div class="card-box buy-card">
            <div class="div">
                <div class="title">
                    <p>购买卡券并支付（购买后直接使用一张支付订单）</p>
                    <van-checkbox v-model="checked_buycard" checked-color="#f1ca24"></van-checkbox>
                </div>
                <div class="cards">
                    <ul v-for="(item,index) in cardsList" :key="index">
                        <li>{{item.discount}}<span>折</span></li>
                        <li>
                            <h3>{{item.times}}次卡</h3>
                            <h4>￥{{item.price_now}}元 /<span>￥{{item.price_before}}元</span></h4>
                            <van-checkbox v-model="checked_[index]" checked-color="#f1ca24"></van-checkbox>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card-box use-card">
            <div class="div flex">
                <p>微信支付</p>
                <van-checkbox v-model="checked_wechatPay" checked-color="#f1ca24"></van-checkbox>
            </div>
        </div>

        <van-button size="large" :disabled="disabled_btn" @click="pay">确认支付</van-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                checked_usecard: false,
                checked_buycard: false,
                checked_wechatPay: false,
                checked_:[false,false,false,false],
                cardsList:[
                    {
                        discount:8,
                        times:'五',
                        price_now:'65',
                        price_before:'75',
                        id:1,
                    },
                    {
                        discount:8,
                        times:'五',
                        price_now:'65',
                        price_before:'75',
                        id:2,
                    },
                    {
                        discount:8,
                        times:'五',
                        price_now:'65',
                        price_before:'75',
                        id:3,
                    },
                    {
                        discount:8,
                        times:'五',
                        price_now:'65',
                        price_before:'75',
                        id:4,
                    },
                ],
                disabled_btn:false,
            }
        },
        methods: {
            pay() {
                this.disabled_btn = true;
                this.$router.push('/timeout')
            }
        },
    }
</script>

<style lang="scss" scoped>
.flex{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.pay{
    width: 100%;
    position: absolute;
    padding: 1.3rem;
    box-sizing: border-box;
    .price-1{
        height: 3.4rem;
        padding: 0 0.4rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        align-items: center;
        border-bottom: .02rem solid #cccccc;
    }
    .price-2{
        height: 3.2rem;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: baseline;
        line-height: 3.2rem;
        margin-bottom: 1.84rem;
        span{
            font-size: 12px;
        }
        li{
            font-size: 16px;
        }
    }
    .card-box{
        width: 100%;
        border: 1px solid #f1ca24;
        border-radius: 3px;
        padding: 3px;
        box-sizing: border-box;
        margin-bottom: 1.32rem;
        .div{
            width: 100%;
            border: 1px solid #fdf4d3;
            border-radius: 3px;
            padding: 0.8rem 0.84rem;
            box-sizing: border-box;
        }
        .flex{
            @extend .flex;
        }
    }
    .use-card{
        p{
            font-size: 1.12rem;
        }
    }
    .buy-card{
        .title{
            width: 100%;
            @extend .flex;
            margin-bottom: 0.6rem;
            p{
                font-size: 0.92rem;
            }
        }
        .cards{
            width: 100%;
            padding: 0.24rem 0;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            // align-content: space-between;
            ul:nth-child(odd){
                margin-right: 4%;
            }
            ul{
                display: flex;
                align-items: center;
                flex-wrap: nowrap;
                width: 47%;
                height: 3rem;
                background: #f7e591;
                padding: 0.6rem;
                margin-bottom: 1.08rem;
                box-sizing: border-box;
                border-radius: 3px;
                position: relative;
                li:nth-of-type(1){
                    font-size: 1.28rem;
                    color: #cd6702;
                    width: 2.2rem;
                    height: 1.76rem;
                    border-right: 1px dashed #9d9059;
                    margin-right: 0.4rem;
                    span{
                        font-size: 1.04rem;
                    }
                }
                li:nth-of-type(2){
                    width: 5.4rem;
                    height: 1.76rem;
                    h3{
                        font-size: 0.8rem;
                        font-weight: bold;
                    }
                    h4{
                        font-size: 0.64rem;
                        color: #cc6700;
                        span{
                            font-size: 0.64rem;
                            color: #9f9e99;
                            text-decoration: line-through;
                        }
                    }
                }
                .van-checkbox{
                    position: absolute;
                    right: 0.68rem;
                    top: 0.75rem;
                }
            }

        }
    }
}
</style>
<style lang="scss">
.van-checkbox__icon .van-icon{
    border: 1px solid #787b72;
}
.pay{
    .van-button--large{
        width: 100%;
    }
}
</style>
