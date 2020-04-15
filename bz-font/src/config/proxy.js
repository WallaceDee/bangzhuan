module.exports = {
  '/nodejs/api/': {
      target: 'http://localhost/',
      changeOrigin: true,
      pathRewrite: {
        '^/nodejs': ''
      }
  }
}