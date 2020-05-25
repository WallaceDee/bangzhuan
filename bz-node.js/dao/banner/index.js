const {
    print,
    query
} = require('../../lib/util')
const $sql = require('./sqlMapping')

module.exports = {
    listAll: (req, res) => {
        query($sql.listAll).then(result => {
            print.success(res, result)
        }).catch(error => {
            print.error(res, error)
        })
    },
    list: (req, res) => {
        query($sql.list).then(result => {
            print.success(res, result)
        }).catch(error => {
            print.error(res, error)
        })
    },
    insertOrUpdate:(req,res)=>{
        let {id }=req.body
        if(id){
            query($sql.update,req.body).then(result => {
                print.success(res, {message:'编辑成功！'})
            }).catch(error => {
                print.error(res, error)
            })
        }else{
            query($sql.insert,req.body).then(result => {
                print.success(res, {message:'添加成功！'})
            }).catch(error => {
                print.error(res, error)
            })
        }
    },
    delete:(req,res)=>{
            query($sql.delete,req.body).then(result => {
                print.success(res, {message:'成功删除轮播图'})
            }).catch(error => {
                print.error(res, error)
            })
    },
    setEnable:(req,res)=>{
        query($sql.setEnable,req.body).then(result => {
            print.success(res, {message:'操作成功'})
        }).catch(error => {
            print.error(res, error)
        })
    },
    setUpdateTime:(req,res)=>{
        query($sql.setUpdateTime,req.body).then(result => {
            print.success(res, {message:'操作成功'})
        }).catch(error => {
            print.error(res, error)
        })
    }
}