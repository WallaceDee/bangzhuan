import axios from '@/libs/api.request'

export const getSetting = (data) => {
  return axios.request({
      data,
      url: '/setting',
      method: 'get'
  })
}
export const getProductMenu = (data) => {
  return axios.request({
      data,
      url: '/product/getProductMenu',
      method: 'get'
  })
}

export const getBannerList = (params) => {
  return axios.request({
      params,
      url: '/banner',
      method: 'get'
  })
}

export const getCasesList = (data) => {
  return axios.request({
      data,
      url: '/cases',
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

export const getNewsList = (params) => {
  return axios.request({
      params,
      url: '/news',
      method: 'get'
  })
}
export const getNewsDetail = (params) => {
  return axios.request({
      params,
      url: '/news/detail',
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

export const getTeamList = (params) => {
  return axios.request({
      params,
      url: '/team',
      method: 'get'
  })
}

export const getConsult = (data) => {
  return axios.request({
      data,
      url: '/consult',
      method: 'post'
  })
}