const express = require("express")
const router = express.Router()
const bannerDao = require("../../dao/banner/index")
const util = require('../../lib/util.js')

router.get("/", bannerDao.list)
router.post("/",util.ensureAuthorized,bannerDao.insertOrUpdate)
router.delete("/",util.ensureAuthorized,bannerDao.delete)
router.post("/setEnable",util.ensureAuthorized,bannerDao.setEnable)
router.post("/setUpdateTime",util.ensureAuthorized,bannerDao.setUpdateTime)

module.exports = router
