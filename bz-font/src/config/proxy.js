module.exports = {
  '/api/': {
    target: 'http://localhost',
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