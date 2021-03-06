const express = require('express')
const router = express.Router()
const settingDao = require('../../dao/setting/index')
const util = require('../../lib/util.js')

router.get('/',settingDao.getSetting)
router.post('/', util.ensureAuthorized,settingDao.updateSetting)
router.post('/images', util.ensureAuthorized,settingDao.setImagesSortList)
router.post('/saveTdkAndProd', util.ensureAuthorized,settingDao.saveTdkAndProd)
router.get('/images',settingDao.getImagesSortList)

module.exports = router