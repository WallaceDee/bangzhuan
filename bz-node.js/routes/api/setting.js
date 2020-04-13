const express = require('express')
const router = express.Router()
const settingDao = require('../../dao/setting/index')
const util = require('../../lib/util.js')

router.get('/',settingDao.getSetting)
router.post('/', util.ensureAuthorized,settingDao.updateSetting)
router.post('/images', util.ensureAuthorized,settingDao.setImagesSortList)
router.get('/images', util.ensureAuthorized,settingDao.getImagesSortList)

module.exports = router