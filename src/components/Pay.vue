<template>
    <div class="pay">
        <div class="price-1">
            <li>元气汗蒸 - 25分钟</li>
            <li>￥{{initial_price}}</li>
        </div>
        <div class="card-box use-card">
            <div class="div flex">
                <p>使用卡券支付（可使用{{canUseCard.length}}张,<span @click="toMyCards">查看详情</span>）</p>
                <van-checkbox
                    v-model="checked_usecard"
                    checked-color="#f1ca24"
                    :disabled="disabled_usecard"
                ></van-checkbox>
            </div>
        </div>
        <div class="card-box buy-card">
            <div class="div">
                <div class="title">
                    <p>购买卡券并支付（购买后直接使用一张支付订单）</p>
                    <van-checkbox
                        v-model="checked_buycard"
                        checked-color="#f1ca24"
                    ></van-checkbox>
                </div>
                <div class="cards">
                    <ul v-for="(item,index) in canBuy_cardsList" :key="index">
                        <li>{{item.discount}}<span>折</span></li>
                        <li>
                            <h3>{{item.couponName}}</h3>
                            <h4>￥{{item.discountPrice}}元 /<span>￥{{item.price}}元</span></h4>
                            <van-radio-group v-model="radio">
                                <van-radio checked-color="#f1ca24" :name="index"></van-radio>
                            </van-radio-group>
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
        <div class="price-2">
            <span>合计 </span>
            <li>￥{{total_price}}</li>
        </div>

        <van-button size="large" :disabled="disabled_btn" @click="pay">确认支付</van-button>
    </div>
</template>

<script>
import url from './../serviceAPI.config.js'
import wx from 'weixin-js-sdk'
    export default {
        data() {
            return {
                checked_usecard: false,
                disabled_usecard:false,
                checked_buycard: false,
                checked_wechatPay: true,
                radio:'',
                canBuy_cardsList:[],    //可购买卡券列表
                canBuy_card_id:'',      //可购买卡券id
                disabled_btn:false,
                canUseCard:[],      //可用卡券
                canUseCard_id:'',      //可用卡券id
                //canUseCard_num:'',
                initial_price:15,         //初始价

            }
        },
        watch:{
            radio(){
                if(this.radio !== ''){
                    this.checked_buycard = true;
                }
            },
            checked_buycard(){
                if(!this.checked_buycard){
                    this.radio = ''
                }else{
                    this.radio = 0;
                    this.checked_usecard = false;
                    this.checked_wechatPay = false;
                    this.canBuy_card_id = this.canBuy_cardsList[this.radio].id;
                }
            },
            checked_usecard(){
                if(this.checked_usecard){
                    this.checked_buycard = false;
                    this.checked_wechatPay = false;
                }
            },
            checked_wechatPay(){
                if(this.checked_wechatPay){
                    this.checked_usecard = false;
                    this.checked_buycard = false;
                }
            },
        },
        computed:{
            total_price(){
                if(this.checked_usecard){
                    return 0;
                }else if(this.checked_buycard){
                    return this.canBuy_cardsList[this.radio].discountPrice;
                }else{
                    return this.initial_price
                }
            },
        },
        created(){
            this.unUsedCouponRecord();
            this.findAllPackageOnSale();
            // 获取从我的卡券页面保存在本地的是否有可用卡券的radio参数
            let radio;
            if(sessionStorage.getItem('radio') && sessionStorage.getItem('radio') !== undefined){
                this.checked_usecard = sessionStorage.getItem('radio');
            }
        },
        methods: {
            pay(){
                if(this.checked_usecard){
                    this.coupon_pay();
                }else if(this.checked_buycard){
                    this.buy_cardPackage();
                }else if(this.checked_wechatPay){
                    this.wechat_pay();
                }
                // this.disabled_btn = true;
                // this.$router.push('/timeout')
            },
            // 普通微信支付
            wechat_pay(){
                this.axios({
                    url:url.pay,
                    methods:'get',
                    params:{
                        openId:url.openid,
                        device:url.deviceCode,  
                        payMethod:'wechat',
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.code == 200){
                        wx.config({
                            appId: res.data.result.appId, // 必填，公众号的唯一标识
                            timestamp: res.data.result.timestamp, // 必填，生成签名的时间戳
                            nonceStr: res.data.result.nonceStr, // 必填，生成签名的随机串
                            package: res.data.result.package,
                            paySign: res.data.result.paySign,
                            signType: res.data.result.signType,
                        });

                        wx.ready(function () {
                            let options = res.data.result;
                            console.log(options)
                            if(options){
                                // 支付成功后的操作
                                options.success = function () {
                                    window.location.href = ``;
                                };
                                
                                //  取消支付的操作
                                options.cancel = function () {
                                    pay_order = true;
                                };
                                
                                // 支付失败的处理 
                                options.fail = function () {
                                    pay_order = true;
                                    this.wechatPay_button = false;
                                };
                                // 传入参数，发起JSAPI支付
                                wx.chooseWXPay(options);
                            }else{
                                this.$toast(`支付失败，请稍后再试！`)
                                this.wechatPay_button = false;
                            }
                        })
                    }else if(res.data.code == '-1'){
                        this.$toast(`${res.data.msg}`)
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 卡券支付
            coupon_pay(){
                this.axios({
                    url:url.coupon_pay,
                    method:'get',
                    params:{
                        openId:url.openid,
                        device:url.deviceCode,
                        couponId:this.canUseCard_id
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.code == -1){
                        this.$toast(res.data.msg)
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 购买卡券包
            buy_cardPackage(){
                this.axios({
                    url:url.buy_cardPackage,
                    method:'get',
                    params:{
                        openId:url.openid,
                        device:url.deviceCode,
                        pid:this.canBuy_card_id
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.code == 200){
                        wx.config({
                            appId: res.data.result.appId, // 必填，公众号的唯一标识
                            timestamp: res.data.result.timestamp, // 必填，生成签名的时间戳
                            nonceStr: res.data.result.nonceStr, // 必填，生成签名的随机串
                            package: res.data.result.package,
                            paySign: res.data.result.paySign,
                            signType: res.data.result.signType,
                        });

                        wx.ready(function () {
                            let options = res.data.result;
                            console.log(options)
                            if(options){
                                // 支付成功后的操作
                                options.success = function () {
                                    window.location.href = ``;
                                };
                                
                                //  取消支付的操作
                                options.cancel = function () {
                                    pay_order = true;
                                };
                                
                                // 支付失败的处理 
                                options.fail = function () {
                                    pay_order = true;
                                    this.wechatPay_button = false;
                                };
                                // 传入参数，发起JSAPI支付
                                wx.chooseWXPay(options);
                            }else{
                                this.$toast(`支付失败，请稍后再试！`)
                                this.wechatPay_button = false;
                            }
                        })
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            //查询上架可购买卡券包
            findAllPackageOnSale(){
                this.axios({
                    url:url.findAllPackageOnSale,
                    method:'get',
                    params:{
                        deviceCode:url.deviceCode
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.code == 200){
                        this.canBuy_cardsList = res.data.result
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 查询可用卡券
            unUsedCouponRecord(){
                this.axios({
                    url:url.unUsedCouponRecord,
                    method:'get',
                    params:{
                        openId:url.openid,
                        deviceCode:url.deviceCode
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.code == 200){
                        this.canUseCard = res.data.result;
                        if(this.canUseCard.length == 0){
                            this.disabled_usecard = true;
                        }else{
                            this.canUseCard_id = this.canUseCard[0].id
                        }
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 跳转到我的卡券
            toMyCards(){
                this.$router.push({path:'/mycards',query:{pay:true,canUseCard:JSON.stringify(this.canUseCard)}})
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
    }
    .price-2{
        border-top: .02rem solid #cccccc;
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
            p{
                font-size: 14px;
                span{
                    text-decoration: underline;
                    color: #1155cc;
                }
            }
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
                .van-radio{
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
.van-radio__icon .van-icon{
    border: 1px solid #787b72;
}
.pay{
    .van-button--large{
        width: 100%;
    }
}
</style>
