const express = require('express')
const router = express.Router()
const userDao = require('../../dao/user/index')
const util = require('../../lib/util.js')

router.get('/', util.ensureAuthorized, userDao.list)
router.post('/', util.ensureAuthorized, userDao.create)
router.post('/login',userDao.login)
router.get('/getUserInfo',util.ensureAuthorized,userDao.getUserInfoById)
router.post('/updateUserInfo',util.ensureAuthorized,userDao.updateUserInfo)
router.get('/getUserAvailable',util.ensureAuthorized,userDao.getUserAvailable)
router.post('/updatePassword',util.ensureAuthorized,userDao.updatePassword)

module.exports = router