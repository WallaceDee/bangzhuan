const {
    print,
    query,
    getSqlPageParmas,
    classifyByKey
} = require('../../lib/util')
const $sql = require('./sqlMapping')

const product={
    list: (req, res) => {
        let params= Object.assign({
            title: '',
            type:'',
            page: 1,
            rows: 10
        }, req.query)
         params = Object.assign(params, getSqlPageParmas(params.page, params.rows))
        query($sql.list, params).then(result => {
            let temp= result[0]
            temp.map(item=>{
                try {
                item.subItems=JSON.parse(item.subItems)
                } catch (error) {
                    console.log(error)
                }
            })
            print.success(res,{
                rows: temp,
                ...result[1][0]
            })
        }).catch(error => {
            print.error(res, error)
        })
    },
    getProductMenu: (req, res) => {
            query($sql.listMenu).then(result => {
              let raw=classifyByKey('type',result[1])
              let menu=JSON.parse(JSON.stringify(result[0]))
              menu.map((item,index)=>{
                for (let key in raw) {
                    if(item.type.toString()===key){
                        item.children=raw[key]
                        break
                    }
                }
              })
              print.success(res, menu)
            //   types
            }).catch(e => {
                print.error(res, e)
            })
    },
    insertOrUpdate:(req,res)=>{
        let {id }=req.body
        let params= Object.assign({
            title:'',type:'',cover:'',backgroundColor:'',content:'',subItems:'',icon:'',description:''
        }, req.body)
        params.subItems=JSON.stringify(params.subItems)
        if(id){
            query($sql.update, params).then(result => {
                print.success(res, {message:'编辑成功！'})
            }).catch(error => {
                print.error(res, error)
            })
        }else{
            query($sql.insert, params).then(result => {
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
    },
    getProductType:(req,res)=>{
        query($sql.getProductType, req.body).then(result => {
            print.success(res, result)
        }).catch(error => {
            print.error(res, error)
        })
    },
    top:(req,res)=>{
        query($sql.setIndexTime, req.body).then(result => {
            print.success(res, {
                message: '置顶成功！'
            })
        }).catch(error => {
            print.error(res, error)
        })
    }
}
module.exports = product