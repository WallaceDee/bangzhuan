const {
    print,
    query,
    getSqlPageParmas
} = require('../../lib/util')
const $sql = require('./sqlMapping')

module.exports = {
    list: (req, res) => {
        let params= Object.assign({
            name: '',
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
    insertOrUpdate:(req,res)=>{
        let {id }=req.body
        const {
            userId
        } = req.userInfo
        if(id){
            query($sql.update, Object.assign(req.body,{userId})).then(result => {
                print.success(res, {message:'编辑成功！'})
            }).catch(error => {
                print.error(res, error)
            })
        }else{
            query($sql.insert, Object.assign(req.body,{userId})).then(result => {
                print.success(res, {message:'添加成功！'})
            }).catch(error => {
                print.error(res, error)
            })
        }
    },
    delete:(req,res)=>{
        query($sql.delete, req.body).then(result => {
            print.success(res, {
                message: '删除成功！'
            })
        }).catch(error => {
            print.error(res, error)
        })
    }
}