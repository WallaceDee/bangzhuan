const express = require("express")
const router = express.Router()
const categoryDao = require("../../dao/category/index")
const util = require('../../lib/util.js')

router.get("/", categoryDao.list)
router.get("/all", util.ensureAuthorized,categoryDao.listAll)
router.post("/",util.ensureAuthorized,categoryDao.insertOrUpdate)
router.delete("/",util.ensureAuthorized,categoryDao.delete)
router.post("/setEnable",util.ensureAuthorized,categoryDao.setEnable)
router.post("/setUpdateTime",util.ensureAuthorized,categoryDao.setUpdateTime)

module.exports = router
