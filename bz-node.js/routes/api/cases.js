const express = require("express")
const router = express.Router()
const casesDao = require("../../dao/cases/index")
const util = require('../../lib/util.js')

router.get("/", casesDao.list)
router.get("/all",util.ensureAuthorized,casesDao.listAll)
router.post("/",util.ensureAuthorized,casesDao.insertOrUpdate)
router.delete("/",util.ensureAuthorized,casesDao.delete)
router.post("/setEnable",util.ensureAuthorized,casesDao.setEnable)
router.post("/setUpdateTime",util.ensureAuthorized,casesDao.setUpdateTime)

module.exports = router
