const express = require('express')
const router = express.Router()
const util = require('../../lib/util.js')
const productDao = require('../../dao/product/index')

router.get('/',productDao.list)
router.get('/type',productDao.getProductType)
router.post('/',util.ensureAuthorized, productDao.insertOrUpdate)
router.delete('/',util.ensureAuthorized, productDao.delete)
router.get('/getProductMenu',productDao.getProductMenu)
router.post('/top',util.ensureAuthorized, productDao.top)

module.exports = router