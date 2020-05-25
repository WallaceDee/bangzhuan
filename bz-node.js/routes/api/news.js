const express = require('express')
const router = express.Router()
const util = require('../../lib/util.js')
const newsDao = require('../../dao/news/index')

router.get('/',newsDao.list)
router.get('/detail',newsDao.getNewsById)
router.post('/',util.ensureAuthorized, newsDao.insertOrUpdate)
router.delete('/',util.ensureAuthorized, newsDao.delete)
router.post('/top',util.ensureAuthorized, newsDao.top)

module.exports = router