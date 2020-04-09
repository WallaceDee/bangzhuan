/*
 * @Author: wallace 
 * @Date: 2019-08-13 14:55:17 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-09 10:43:50
 */
const mysql = require('mysql')
const jwt = require('jsonwebtoken') //用来创建和确认用户信息摘要
const fs = require('fs')
const cert = fs.readFileSync('config/public.key') // get private key
const dbConfig = require('../config/db.js') // get private key
const pool = mysql.createPool(dbConfig)
const nodemailer = require('nodemailer')

module.exports = {
/**
 * 查询sql
 * @param sqlSrting sql语句
 * @param param sql语句中的参数，与{{}}匹配，Sample：'SELECT * FORM table WHERE id={{myId}}'，传入{myId:1}
 */
  query: (sqlSrting, param={}) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((connectionError, connection) => {
        if (connectionError) {
          reject(connectionError)
        } else {
          //set customer queryFormatter
          connection.config.queryFormat = function (query, values) {
            if (!values) return query
            return query.replace(/\{\{(\w+)\}\}/g,(txt, key)=> {
              if (values.hasOwnProperty(key)) {
                return this.escape(values[key])
              }
              return txt
            })
          }
          connection.query(sqlSrting, param, (queryError, result) => {
            if (queryError) {
              reject(queryError)
            } else {
              resolve(result)
            }
          })
        }
        pool.releaseConnection(connection)
      })
    })
  },
  ensureAuthorized: function (req, res, next) {
    //检查post的信息或者url查询参数或者头信息
    const accessToken =req.headers['authorization']||req.headers['access_token'] || req.body['access_token']
    console.log(req.headers)
    // 解析 token
    if (accessToken) {
      // 确认token
      jwt.verify(accessToken, cert, {
        algorithms: ['RS256']
      }, function (
        err,
        decoded
      ) {
        if (err) {
          return res
            .status(403)
            .send({
              status: 0,
              data: {
                message: 'Invalid token.'
              }
            })
        } else {
          // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
          req.userInfo = decoded
          // console.dir(req.userInfo)
          next()
        }
      })
    } else {
      // 如果没有token，则返回错误
      return res.status(403).send({
        status: 0,
        data: {
          message: 'No token was provided.'
        }
      })
    }
  },
  getSqlPageParmas(page,rows){
    return {currentIndex:rows * 1 * (page - 1),rows:rows*1}
  },
  setPageAndSize(page,rows){
    return [rows * 1 * (page - 1),rows * 1]
  },
  extend: function (target, source, flag) {
    for (var key in source) {
      if (source.hasOwnProperty(key))
        flag ?
        (target[key] = source[key]) :
        target[key] === void 0 && (target[key] = source[key])
    }
    return target
  },
  print: {
    success: (res, jsonData) => {
      res.json({
        status: 1,
        data: jsonData
      })
    },
    error: (res, jsonData) => {
      res.json({
        status: 0,
        data: jsonData
      })
    }
  },
  classifyByKey(key, array) {
    let result = {}
    for (let i = 0; i < array.length; i++) {
      let currentItem = array[i]
      if (!result[currentItem[key]]) {
        let tempArray = []
        tempArray.push(currentItem)
        result[currentItem[key]] = tempArray
      } else {
        for (let k in result) {
          if (currentItem[key] == k) {
            result[k].push(currentItem)
            break
          }
        }
      }
    }
    return result
  },
  generateTreeData: (array, key = ['parentId', 'id'], eachFuntion, sortFunction) => {
    let tree = array.filter((father) => { //循环所有项
      let branchArray = array.filter((child) => {
        if (eachFuntion) {
          eachFuntion(child)
        }
        return father[key[1]] === child[key[0]] //返回每一项的子级数组
      })
      if (branchArray.length > 0) {
        father.children = sortFunction ? branchArray : branchArray.sort(sortFunction) //如果存在子级，则给父级添加一个children属性，并赋值
        console.log( branchArray , branchArray.sort(sortFunction))
      }
      return father[key[0]] === 0 //返回第一层
    })
    console.log(tree)
    return tree //返回树形数据
  },
  sendMail:({subject,text,html,recipient})=>{
    const transporter = nodemailer.createTransport({
      //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
      host: 'smtp.mxhichina.com',
      port: 465, // SMTP 端口
      secureConnection: true, // 使用 SSL
      auth: {
          user: 'wzy@bzwip.com',
          pass: 'CICI7774love'
      }
    })
    let mailOptions = {
      from: '"帮专网 🤖" <wzy@bzwip.com>', // 发件地址
      to: recipient, // 收件列表
      subject,
      text,
      html
    }

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error)
      }
      console.log('Message sent: ' + info.response);
    })
  }
}