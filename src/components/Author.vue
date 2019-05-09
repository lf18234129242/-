<template>
    <div>

    </div>
</template>

<script>
import url from './../serviceAPI.config.js'
    export default {
        data() {
            return {
                key: 'value'
            }
        },
        created(){
            this.login()
        },
        methods: {
            login() {
                this.axios({
                    url:url.get_wxcode,
                    method:'get',
                    params:{
                        appid:'wx0146931297e079a8',
                        redirect_uri:'http://h5.frogogo.cn/',
                        scope:'snsapi_base'
                    }
                }).then((res)=>{
                    console.log(res)
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>