const BASEURL = 'http://39.98.195.242:8764'

const URL = {
    hasActivity:BASEURL + '/h5/coupon/hasActivity',     //查询是否有新用户免费体验活动
    sendActivity:BASEURL + '/h5/coupon/sendActivity',     //领取卡券接口
    pay:BASEURL + '/h5/pay',     //普通支付
    unUsedCouponRecord:BASEURL + '/h5/coupon/unUsedCouponRecord',     //查询可用卡券
    findAllPackageOnSale:BASEURL + '/h5/coupon/findAllPackageOnSale',     //查询上架可购买卡券包
    wechat_pay:BASEURL + '/wechat/pay',     //购买卡券包
    packageOrder:BASEURL + '/h5/coupon/packageOrder',     //卡券购买列表
    allCouponRecord:BASEURL + '/h5/coupon/allCouponRecord',     //查询所有的卡券
    coupon_pay:BASEURL + '/h5/coupon/pay',     //卡券使用
    orderList:BASEURL + '/h5/orderList',     //查询订单
}

module.exports = URL;