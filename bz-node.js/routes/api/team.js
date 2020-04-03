const express = require('express')
const router = express.Router()
const util = require('../../lib/util.js')
const teamDao = require('../../dao/team/index')

router.get('/',teamDao.list)
router.post('/',util.ensureAuthorized, teamDao.insertOrUpdate)
router.delete('/',util.ensureAuthorized, teamDao.delete)

module.exports = router