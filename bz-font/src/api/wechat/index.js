import axios from '@/libs/api.request'

export const login = (data) => {
    return axios.request({
        data,
        url: '/cwLoginInfo/v1/console/pwd/login',
        method: 'post'
    })
}

export const getRealms = (params) => {
    return axios.request({
        params,
        url: '/cwRealm/console/v1/page',
        method: 'get'
    })
}

export const updateRealm = (data) => {
    return axios.request({
        data,
        url: '/cwRealm/console/v1/update',
        method: 'post'
    })
}

export const setRealmDisable = (data) => {
    return axios.request({
        data,
        url: '/cwRealm/console/v1/remove',
        method: 'post'
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
        url: '/cwRealm/console/v1/del',
        method: 'post'
    })
}

export const getConfiguredCity = (params) => {
    return axios.request({
        params,
        url: '/addr/cw/enable/city/list',
        method: 'get'
    })
}

export const getProvince = (params) => {
    return axios.request({
        params,
        url: '/addr/province/list',
        method: 'get'
    })
}

export const getCity = (params) => {
    return axios.request({
        params,
        url: '/addr/list/city/code',
        method: 'get'
    })
}

export const setCityEnable = (params) => {
    return axios.request({
        params,
        url: '/addr/code/enable',
        method: 'get'
    })
}
export const serCityDisable = (params) => {
    return axios.request({
        params,
        url: '/addr/code/disable',
        method: 'get'
    })
}

export const getArticleList = (data) => {
    return axios.request({
        data,
        url: '/cwArticleInfo/console/v1/page',
        method: 'post'
    })
}

export const getArticleInfo = (params) => {
    return axios.request({
        params,
        url: '/cwArticleInfo/v1/info',
        method: 'get'
    })
}

export const createArticle = (data) => {
    return axios.request({
        data,
        url: '/cwArticleInfo/console/v1/add',
        method: 'post'
    })
}

export const precisePush = (data) => {
    return axios.request({
        data,
        url: '/cwLoginPush/push/batch',
        method: 'post'
    })
}

export const deleteArticle = (data) => {
    return axios.request({
        data,
        url: '/cwArticleInfo/console/v1/remove',
        method: 'post'
    })
}

export const updateArticle = (data) => {
    return axios.request({
        data,
        url: '/cwArticleInfo/console/v1/edit',
        method: 'post'
    })
}

export const getArticleDetail = (params) => {
    return axios.request({
        params,
        url: '/cwArticleInfo/v1/info',
        method: 'get'
    })
}

export const getEnableCitys = (params) => {
    return axios.request({
        params,
        url: '/addr/cw/enable/city/list',
        method: 'get'
    })
}

export const getBannerList = (params) => {
    return axios.request({
        params,
        url: '/cwBanner/console/v1/page',
        method: 'get'
    })
}

export const deleteBanner = (data) => {
    return axios.request({
        data,
        url: '/cwBanner/console/v1/del',
        method: 'post'
    })
}
export const createBanner = (data) => {
    return axios.request({
        data,
        url: '/cwBanner/console/v1/add',
        method: 'post'
    })
}

export const updateBanner = (data) => {
    return axios.request({
        data,
        url: '/cwBanner/console/v1/edit',
        method: 'post'
    })
}

export const setBannerEnable = (data) => {
    if(data.enable){
        return axios.request({
            data,
            url: '/cwBanner/console/v1/enable',
            method: 'post'
        })
    }else{
        return axios.request({
            data,
            url: '/cwBanner/console/v1/disable',
            method: 'post'
        })
    }
}

export const getUserList = (params) => {
    return axios.request({
        params,
        url: '/cwLoginInfo/v1/console/login/page',
        method: 'get'
    })
}

export const getUserInfo = (params) => {
    return axios.request({
        params,
        url: '/cwLoginInfo/v1/open/login/info',
        method: 'get'
    })
}
