<template>
    <div class="OrderList">
        <van-tabs type="card">
            <van-tab title="汗蒸订单">
                <div :class="['card',item.isUse ? 'card-bg-fff' : 'card-bg-e4e4e4']" v-for="(item,index) in hanzhengList" :key="index">
                    <ul>
                        <li>{{item.use_time}}</li>
                        <li>{{item.use_status}}</li>
                    </ul>
                    <ul>门店名称：{{item.use_address}}</ul>
                    <ul>
                        <li>订单编号：{{item.order_num}}</li>
                        <li class="btn_1" :data-clipboard-text="copyOrderNum" @click="copyThisOrderNum(index)">复制编号</li>
                    </ul>
                </div>
            </van-tab>
            <van-tab title="卡券订单">
                <div :class="['card',item.isUse ? 'card-bg-fff' : 'card-bg-e4e4e4']" v-for="(item,index) in cardList" :key="index">
                    <ul>
                        <li>{{item.use_time}}</li>
                        <li>{{item.use_status}}</li>
                    </ul>
                    <ul>门店名称：{{item.use_address}}</ul>
                    <ul>
                        <li>订单编号：{{item.order_num}}</li>
                        <li class="btn_2" :data-clipboard-text="copyCardNum" @click="copyThisCardNum(index)">复制编号</li>
                    </ul>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Clipboard from 'clipboard'
    export default {
        data() {
            return {
                hanzhengList:[
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江极乐汤金沙江',
                        use_status:'已完成',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江极乐汤金沙江',
                        use_status:'已完成',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已取消',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已取消',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已取消',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已取消',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已取消',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已取消',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已取消',
                        order_num:'123456789',
                        isUse:true
                    },
                ],
                cardList: [
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已完成',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已完成',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已取消',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已取消',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已取消',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已取消',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已取消',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已取消',
                        order_num:'123456789',
                        isUse:true
                    },
                    {
                        use_time:'2019/1/1 18.09',
                        use_address:'极乐汤金沙江',
                        use_status:'已取消',
                        order_num:'123456789',
                        isUse:true
                    },
                ],
                copyOrderNum:'',
                copyCardNum:'',
            }
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
