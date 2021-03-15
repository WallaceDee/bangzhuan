import axios from '@/libs/api.request'

export const updatePassword = (data) => {
    return axios.request({
        data,
        url: '/users/updatePassword',
        method: 'post'
    })
}
export const createUser = (data) => {
    return axios.request({
        data,
        url: '/users',
        method: 'post'
    })
}
export const getUserAvailable = (params) => {
    return axios.request({
        params,
        url: '/users/getUserAvailable',
        method: 'get'
    })
}
export const updateUserInfo = (data) => {
    return axios.request({
        data,
        url: '/users/updateUserInfo',
        method: 'post'
    })
}
export const getUserInfo = (data) => {
    return axios.request({
        data,
        url: '/users/getUserInfo',
        method: 'get'
    })
}

export const login = (data) => {
    return axios.request({
        data,
        url: '/users/login',
        method: 'post'
    })
}

export const userList = (data) => {
    return axios.request({
        data,
        url: '/users',
        method: 'get'
    })
}

export const getSetting = (data) => {
    return axios.request({
        data,
        url: '/setting',
        method: 'get'
    })
}

export const updateSetting = (data) => {
    return axios.request({
        data,
        url: '/setting',
        method: 'post'
    })
}

export const getBannerList = (params) => {
    return axios.request({
        params,
        url: '/banner/all',
        method: 'get'
    })
}

export const publicBanner = (data) => {
    return axios.request({
        data,
        url: '/banner',
        method: 'post'
    })
}

export const deleteBanner = (data) => {
    return axios.request({
        data,
        url: '/banner',
        method: 'delete'
    })
}

export const setBannerEnable = (data) => {
    return axios.request({
        data,
        url: '/banner/setEnable',
        method: 'post'
    })
}
export const setBannerUpdateTime = (data) => {
    return axios.request({
        data,
        url: '/banner/setUpdateTime',
        method: 'post'
    })
}

export const getConsultList = (params) => {
    return axios.request({
        params,
        url: '/consult',
        method: 'get'
    })
}
export const deleteConsult = (data) => {
    return axios.request({
        data,
        url: '/consult',
        method: 'delete'
    })
}
export const setConsultRemarkAndStatus = (data) => {
    return axios.request({
        data,
        url: '/consult/setRemarkAndStatus',
        method: 'post'
    })
}
export const setSubscribeStatus = (data) => {
    return axios.request({
        data,
        url: '/consult/setSubscribeStatus',
        method: 'post'
    })
}

// export const setConsultStatus = (data) => {
//     return axios.request({
//         data,
//         url: '/consult/setStatus',
//         method: 'post'
//     })
// }

export const getCasesList = (data) => {
    return axios.request({
        data,
        url: '/cases/all',
        method: 'get'
    })
}

export const publicCases = (data) => {
    return axios.request({
        data,
        url: '/cases',
        method: 'post'
    })
}

export const deleteCases = (data) => {
    return axios.request({
        data,
        url: '/cases',
        method: 'delete'
    })
}

export const setCasesEnable = (data) => {
    return axios.request({
        data,
        url: '/cases/setEnable',
        method: 'post'
    })
}
export const setCasesUpdateTime = (data) => {
    return axios.request({
        data,
        url: '/cases/setUpdateTime',
        method: 'post'
    })
}

export const getNewsList = (params) => {
    return axios.request({
        params,
        url: '/news',
        method: 'get'
    })
}

export const publicNews = (data) => {
    return axios.request({
        data,
        url: '/news',
        method: 'post'
    })
}

export const deleteNews = (data) => {
    return axios.request({
        data,
        url: '/news',
        method: 'delete'
    })
}
export const setNews2Top = (data) => {
    return axios.request({
        data,
        url: '/news/top',
        method: 'post'
    })
}
export const getTeamList = (params) => {
    return axios.request({
        params,
        url: '/team',
        method: 'get'
    })
}

export const publicTeam = (data) => {
    return axios.request({
        data,
        url: '/team',
        method: 'post'
    })
}

export const deleteTeam = (data) => {
    return axios.request({
        data,
        url: '/team',
        method: 'delete'
    })
}

export const setMember2Top = (data) => {
    return axios.request({
        data,
        url: '/team/top',
        method: 'post'
    })
}

export const getProductTypeList = () => {
    return axios.request({
        url: '/product/type',
        method: 'get'
    })
}

export const getProductList = (params) => {
    return axios.request({
        params,
        url: '/product',
        method: 'get'
    })
}

export const publicProduct = (data) => {
    return axios.request({
        data,
        url: '/product',
        method: 'post'
    })
}

export const deleteProduct = (data) => {
    return axios.request({
        data,
        url: '/product',
        method: 'delete'
    })
}

export const setProduct2Top = (data) => {
    return axios.request({
        data,
        url: '/product/top',
        method: 'post'
    })
}

export const deleteFile = (params) => {
    return axios.request({
        params,
        url: '/ue?action=deletefile',
        method: 'get'
    })
  }

export const getImages = (params) => {
    return axios.request({
      params,
        url: '/ue?action=listimage&start=0&size=9999',
        method: 'get'
    })
  }
  export const setImagesSortList= (data) => {
    return axios.request({
        data,
        url: '/setting/images',
        method: 'post'
    })
  }
  export const getImagesSortList= (params) => {
    return axios.request({
      params,
        url: '/setting/images',
        method: 'get'
    })
  }
  export const saveTdkAndProd= (data) => {
    return axios.request({
        data,
        url: '/setting/saveTdkAndProd',
        method: 'post'
    })
  }
