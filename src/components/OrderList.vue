<template>
    <div class="OrderList">
        <van-tabs
            type="card"
            @click="onClickTab"
            animated
            swipeable
            v-model="active"
        >
            <van-tab title="汗蒸订单">
                    <!-- :class="['card',item.isUse ? 'card-bg-fff' : 'card-bg-e4e4e4']"  -->
                <div
                    class="card card-bg-fff" 
                    v-for="(item,index) in hanzhengList" 
                    :key="index"
                >
                    <ul>
                        <li>{{item.create_time}}</li>
                        <li v-if="item.order_status == 1">订单生成</li>
                        <li v-else-if="item.order_status == 2">已付款</li>
                        <li v-else-if="item.order_status == 3">已完成</li>
                        <li v-else-if="item.order_status == 4">超时</li>
                        <li v-else-if="item.order_status == 5">已退款</li>
                    </ul>
                    <ul>门店名称：{{item.store_name}}</ul>
                    <ul>
                        <li>订单编号：{{item.id}}</li>
                        <li class="btn_1" :data-clipboard-text="copyOrderNum" @click="copyThisOrderNum(index)">复制编号</li>
                    </ul>
                </div>
            </van-tab>
            <van-tab title="卡券订单">
                <div 
                    class="card card-bg-fff" 
                    v-for="(item,index) in cardList" 
                    :key="index"
                >
                    <ul>
                        <li>{{item.orderTime}}</li>
                        <li v-if="item.status == 1">活动创建未开始</li>
                        <li v-else-if="item.status == 2">活动已开始</li>
                        <li v-else-if="item.status == 3">活动已结束</li>
                    </ul>
                    <ul>门店名称：{{item.storeName}}</ul>
                    <ul>
                        <li>订单编号：{{item.id}}</li>
                        <li class="btn_2" :data-clipboard-text="copyCardNum" @click="copyThisCardNum(index)">复制编号</li>
                    </ul>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Clipboard from 'clipboard'
import url from './../serviceAPI.config.js'
    export default {
        data() {
            return {
                hanzhengList:[],
                cardList: [],
                copyOrderNum:'',
                copyCardNum:'',
                active:0,
            }
        },
        created(){
            this.orderList();
        },
        methods: {
            copyThisOrderNum(index) {
                const btnCopy = new Clipboard('.btn_1');
                this.copyOrderNum = this.hanzhengList[index].order_num;
                this.$toast('复制成功')
            },
            copyThisCardNum(index){
                const btnCopy = new Clipboard('.btn_2');
                this.copyCardNum = this.cardList[index].order_num;
                this.$toast('复制成功')
            },
            // 切换tabs
            onClickTab(){
                if(this.active == 0){
                    this.orderList()
                }else if(this.active == 1){
                    this.packageOrder();
                }
            },
            // 查询卡券订单
            packageOrder(){
                this.axios({
                    url:url.packageOrder,
                    method:'post',
                    params:{
                        openId:url.openid,
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.code == 200){
                        this.cardList = res.data.result;
                        console.log(this.cardList)
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 查询汗蒸订单
            orderList(){
                this.axios({
                    url:url.orderList,
                    method:'post',
                    params:{
                        openId:url.openid,
                        page:'1',
                        pageSize:'10',
                    }
                }).then((res)=>{
                    console.log(res)
                    if(res.data.code == 200){
                        for(let i=0;i<res.data.result.list.length;i++){
                            this.hanzhengList.push(res.data.result.list[i]);
                        }
                        this.hanzhengList = this.unique(this.hanzhengList)
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 对象数组查重
            unique(arr){
                let unique = {};
                arr.forEach(function(item){
                    unique[JSON.stringify(item)]=item;
                })
                arr = Object.keys(unique).map(function(u){ 
                    return JSON.parse(u);
                })
                return arr;
            }
        },
    }
</script>

<style lang="scss" scoped>
.OrderList{
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
            font-size: 14px;
            line-height: 2rem;
        }
        ul:nth-of-type(3){
            display: flex;
            justify-content: space-between;
            li:nth-child(2){
                text-decoration: underline;
            }
        }
    }
}
</style>
<style>
.van-tabs--card{
    padding-top: 4rem;
}
.van-tabs__wrap{
    position: fixed;
}
.van-tab{
    display: flex;
    align-items: center;
    justify-content: center;
}
.van-tabs__nav--card{
    margin: 0;
    border-radius: 0;
    border: none;
    height: 4rem;
}
.van-tabs--card>.van-tabs__wrap{
    height: 4rem;
    border-top: 1px solid #c9c9c9;
}
.van-tab span{
    font-size: 18px;
}
.van-tabs__nav--card .van-tab.van-tab--active{
    color: #000;
    font-weight: bold;
    background: #f2f2f2;
    border-bottom: none;
}
.van-tabs__nav--card .van-tab{
    color: #000;
    border-right: 1px solid #c9c9c9;
    border-bottom: 1px solid #c9c9c9;
}
</style>
