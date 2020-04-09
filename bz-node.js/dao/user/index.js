const {
    print,
    query,
    getSqlPageParmas
} = require('../../lib/util')
const $sql = require('./sqlMapping')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const cert = fs.readFileSync('config/private.key') // get private key
const crypto = require('crypto')

module.exports = {
    getUserAvailable: (req, res) => {
        query($sql.getUserByUserName, req.query).then(result => {
            if (result.length === 0) {
                print.success(res,{
                    exist:false
                })
            } else {
                print.error(res, {
                    exist:true
                })
            }
        }).catch(error => {
            print.error(res, error)
        })
    },
    updatePassword: (req, res) => {
        query($sql.updatePassword,req.body).then(result => {
            print.success(res, {
                userInfo:req.body,
                message: '修改成功！'
            })
        }).catch(e => {
            print.error(res, e)
        })
    },
    create: (req, res) => {
        const {
            isAdmin
        } = req.userInfo
        if(!isAdmin){
            res.status(401).send({
              status: 0,
              data: {
                message: 'No permission.'
              }
            })
            return false
        }
        query($sql.insert, {
            nickname:'帮专用户',
            password: crypto.createHash('md5').update('bz123456').digest("hex"),
            username:req.body.username
        }).then(result => {
            print.success(res,{
                message:'新建成功！'
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    list: (req, res) => {
        const {
            isAdmin
        } = req.userInfo
        if(!isAdmin){
            res.status(401).send({
              status: 0,
              data: {
                message: 'No permission.'
              }
            })
            return false
        }
        const {
            keyword,
            page,
            rows
        } = Object.assign({
            page: 1,
            rows: 10,
            keyword: ''
        }, Object.assign(req.body, req.query))
        let params = {keyword, ...getSqlPageParmas(page, rows)}
        
        query($sql.list, params).then(result => {
            print.success(res,{
                rows: result[0],
               ...result[1][0]
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    login: (req, res) => {
        let {
            password,
            username
        } = req.body
        query($sql.login, {username, password}).then(result => {
            if (result.length === 1) {
                let currentUser=result[0]
                let token = jwt.sign({
                    userName: currentUser.username,
                    userId: currentUser.id,
                    isAdmin:currentUser.isAdmin
                }, cert, {
                    expiresIn: "2d",
                    algorithm: 'RS256'
                })
                currentUser['token'] = token
                print.success(res, currentUser)
            } else {
                print.error(res, {
                    message: '用户名或密码错误'
                })
            }
        }).catch(error => {
            print.error(res, error)
        })
    },
    getUserInfoById: (req, res) => {
        const {
            userId
        } = req.userInfo
        query($sql.getUserInfoById, {id:userId}).then(result => {
            print.success(res, result[0])
        }).catch(e => {
            print.error(res, e)
        })
    },
    updateUserInfo: (req, res) => {
        query($sql.updateUserInfo,req.body).then(result => {
            print.success(res, {
                userInfo:req.body,
                message: '修改成功！'
            })
        }).catch(e => {
            print.error(res, e)
        })
    }
}