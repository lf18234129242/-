<template>
    <div class="MyCards">
        <div
            :class="['card',!item.status ? 'card-bg-fff' : 'card-bg-e4e4e4']" 
            v-for="(item,index) in cardList" 
            :key="index"
            @click="checkCard"
        >
            <ul>
                <li>{{item.storeName}}</li>
                <li>{{item.status == 0 ? '可使用' : '已使用'}}</li>
            </ul>
            <ul>卡券编号：{{item.orderId}}</ul>
            <ul>使用期限：{{item.createTime | createTime}}-{{item.expiryDate | createTime}}</ul>
        </div>
    </div>
</template>

<script>
import url from './../serviceAPI.config.js'
    export default {
        data() {
            return {
                cardList: [
                    {
                        use_address:'汗蒸卡券 - 极乐汤金沙江',
                        use_status:'待使用',
                        card_num:'123456789',
                        use_time:'2019/1/1 - 2020/1/1',
                        isUse:true
                    },
                    {
                        use_address:'汗蒸卡券 - 极乐汤金沙江',
                        use_status:'待使用',
                        card_num:'123456789',
                        use_time:'2019/1/1 - 2020/1/1',
                        isUse:true
                    },
                    {
                        use_address:'汗蒸卡券 - 极乐汤金沙江',
                        use_status:'待使用',
                        card_num:'123456789',
                        use_time:'2019/1/1 - 2020/1/1',
                        isUse:false
                    },
                    {
                        use_address:'汗蒸卡券 - 极乐汤金沙江',
                        use_status:'待使用',
                        card_num:'123456789',
                        use_time:'2019/1/1 - 2020/1/1',
                        isUse:false
                    },
                ]
            }
        },
        created(){
            let pay = this.$route.query.pay;
            if(pay !== undefined && pay !== undefined){
                this.cardList = JSON.parse(this.$route.query.canUseCard)
            }else{
                this.allCouponRecord()
            }
        },
        filters:{
            createTime(value){
                return value.substring(0,10)
            },
        },
        methods: {
            // 查询所有的卡券
            allCouponRecord(){
                this.axios({
                    method:'get',
                    url:url.allCouponRecord,
                    params:{
                        openId:url.openid,
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.code == 200){
                        this.cardList = res.data.result;
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            checkCard() {
                if(this.$route.query.pay == true){
                    this.$router.replace('/pay');
                    this.$router.go(-1)
                    sessionStorage.setItem('radio',true)
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.MyCards{
    width: 100%;
    position: absolute;
    padding: 0.8rem;
    box-sizing: border-box;
    .card-bg-fff{
        background: #fff;
    }
    .card-bg-e4e4e4{
        background: #e4e4e4;
        color: #999b9e;
    }
    .card{
        width: 100%;
        padding: 1rem 0.8rem;
        box-sizing: border-box;
        border: 1px solid #c9c9c9;
        border-radius: 5px;
        margin-bottom: 1rem;
        ul:nth-child(1){
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            font-weight: bold;
            line-height: 2.5rem;
        }
        ul{
            font-size: 12px;
            line-height: 2rem;
        }
    }
}
</style>