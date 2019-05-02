<template>
    <div class="MyCards">
        <div :class="['card',item.isUse ? 'card-bg-fff' : 'card-bg-e4e4e4']" v-for="(item,index) in cardList" :key="index">
            <ul>
                <li>{{item.use_address}}</li>
                <li>{{item.use_status}}</li>
            </ul>
            <ul>卡券编号：{{item.card_num}}</ul>
            <ul>使用期限：{{item.use_time}}</ul>
        </div>
    </div>
</template>

<script>
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