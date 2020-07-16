const {
    print,
    query,
    getSqlPageParmas,
    sendMail
} = require('../../lib/util')
const { manageBaseUrl } =require('../../config/config.js')
const $sql = require('./sqlMapping')

module.exports = {
    list: (req, res) => {
        let params= Object.assign({
            name: '',
            phone:'',
            content:'',
            city:'',
            remark:'',
            status:'',
            page: 1,
            rows: 10
        }, req.query)
         params = Object.assign(params, getSqlPageParmas(params.page, params.rows))
        query($sql.list, params).then(result => {
            print.success(res,{
                rows: result[0],
                ...result[1][0]
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    createConsult: (req, res) => {
        query($sql.insert, req.body).then(result => {
            print.success(res, {
                message: '添加成功！'
            })
         query($sql.getSubscribeEmail).then(response=>{
                let emailAddress=[]
                for(let index=0;index<response.length;index++){
                    emailAddress.push(response[index].email)
                }
            sendMail({
                subject:'来自帮专网的新咨询 😃',
                recipient:emailAddress.join(';'),
                html:`<p style="color:#00afb7;">来自帮专网的新咨询</p>
                            <p>　　姓名：<b>${req.body.name}</b></p>
                            <p>电话号码：<b>${req.body.phone}</b></p>
                         <p>咨询内容：<b>${req.body.content}</b></p>
                        <p><a href="${manageBaseUrl}/#/Workbench/Consult?phone=${req.body.phone}&name=${req.body.name}">详情</a></p>`
            })
            }).catch(e => {
            print.error(res, e)
        })
        }).catch(error => {
            print.error(res, error)
        })
    },
    setRemarkAndStatus:(req, res) => {
        const {
            userId
        } = req.userInfo
        query($sql.setRemarkAndStatus, Object.assign(req.body,{userId})).then(result => {
            print.success(res, {
                message: '备注成功！'
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    delete:(req,res)=>{
        query($sql.delete, req.body).then(result => {
            print.success(res, {
                message: '删除成功！'
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    setSubscribeStatus:(req,res)=>{
        const {
            userId
        } = req.userInfo
        query($sql.setSubscribeStatus, Object.assign(req.body,{userId})).then(result => {
            print.success(res, {
                message:`${req.body.isSubscribe?'':'取消'}订阅成功！`
            })
        }).catch(error => {
            print.error(res, error)
        })
    }
}