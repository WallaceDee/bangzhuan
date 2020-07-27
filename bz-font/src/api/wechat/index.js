import axios from '@/libs/api.request'

export const login = (data) => {
    return axios.request({
        data,
        url: '/cwLoginInfo/v1/console/pwd/login',
        method: 'post'
    })
}

export const getRealms = (param) => {
    return axios.request({
        param,
        url: '/cwRealm/console/v1/page',
        method: 'get'
    })
}

export const createRealms = (data) => {
    return axios.request({
        data,
        url: '/cwRealm/console/v1/add',
        method: 'post'
    })
}

export const deleteRealm = (data) => {
    return axios.request({
        data,
        url: '/cwRealm/console/v1/remove',
        method: 'post'
    })
}
