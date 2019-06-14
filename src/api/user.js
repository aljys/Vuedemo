import request from '@/utils/request'
//登录 获取用户信息
export function login (params){
    return request({
        url:'/user.json',
        methods:'get',
        data:params
    })
}

export function getInfo (params){
    return request({
        url:'/userInfo.json',
        methods:'get',
        data:params
    })
}
export function getData (params){
    return request({
        url:'/rexxar/api/v2/elendil/recommend_feed',
        methods:'get',
        data:params
    })
}