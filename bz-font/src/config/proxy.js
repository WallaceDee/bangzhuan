module.exports = {
  '/nodejs/api/': {
      target: 'https://www.bangzhuanwang.com/nodejs/',
      changeOrigin: true,
      pathRewrite: {
        '^/nodejs': ''
      }
  },
  '/api/': {
    target: 'https://manage.bangzhuanwang.com/',
    changeOrigin: true
}
}