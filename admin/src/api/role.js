import request from '@/utils/request'

const URL = 'http://127.0.0.1:5000'
export function getAllRole(query) {
    return request({
        url:'/permission',
        method:'get',
        params:{query},
        baseURL:URL,
    })
}
export function getOptions() {
    return request({
        url: '/permission/option',
        method: 'get',
        baseURL: URL
    })
}
export function getRoutes() {
    return request({
        url:'/routes',
        method:'get',
    })
}