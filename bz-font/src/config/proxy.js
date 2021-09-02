module.exports = {
  '/nodejs/': {
    target: 'https://manage.bangzhuanwang.com',
    pathRewrite: {
      '/nodejs': ''
    },
    changeOrigin: true
  }
  // ,
  // '/api/': {
  //   target: 'http://192.168.0.69:8005/',
  //   pathRewrite: {
  //     '^/api': ''
  //   },
  //   changeOrigin: true
  // }
}
