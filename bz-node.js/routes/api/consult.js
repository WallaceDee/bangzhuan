const express = require('express')
const router = express.Router()
const util = require('../../lib/util.js')
const consultDao = require('../../dao/consult/index')

router.get('/',util.ensureAuthorized,consultDao.list)
router.post('/', consultDao.createConsult)
router.delete('/',util.ensureAuthorized, consultDao.delete)
router.post('/setRemarkAndStatus',util.ensureAuthorized, consultDao.setRemarkAndStatus)

module.exports = router