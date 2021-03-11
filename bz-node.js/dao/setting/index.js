const fs = require('fs')
const {
    print,
    query,
    getSqlPageParmas
} = require('../../lib/util')
const $sql = require('./sqlMapping')

module.exports = {
    getSetting: (req, res) => {
        query($sql.getSetting).then(result => {
            let setting=result[0]
            try {
                setting.address=JSON.parse( setting.address)
                setting.data=JSON.parse( setting.data)
                setting.relatedLinks=JSON.parse( setting.relatedLinks)
                setting.headElements=JSON.parse( setting.headElements)
            } catch (error) {
                print.error(res, error)
            }
            print.success(res,result[0])
        }).catch(error => {
            print.error(res, error)
        })
    },
    updateSetting: (req, res) => {
        query($sql.updateSetting,req.body).then(result => {
           fs.writeFile('ssr/public/tdk.json',req.body.headElements,function(err){
             console.log(err)
           })
           fs.copyFile('ssr/dist/SiteMap.xml','ssr/public/SiteMap.xml',function(err){
            if(err) console.log('something wrong was happened')
            else console.log('copy file succeed');
            })
            fs.copyFile('ssr/dist/Robot.txt','ssr/public/Robot.txt',function(err){
            if(err) console.log('something wrong was happened')
            else console.log('copy file succeed');
            }) 
            print.success(res,{message:'修改成功'})
        }).catch(error => {
            print.error(res, error)
        })
    },
    setImagesSortList: (req, res) => {
        query($sql.updateImagesSortList,req.body).then(result => {
            print.success(res,{message:'修改成功'})
        }).catch(error => {
            print.error(res, error)
        })
    },
    getImagesSortList: (req, res) => {
        query($sql.getImagesSortList,req.query).then(result => {
            let list=[]
            if(result[0].images.length){
            result[0].images.split(',').map(url=>{
                list.push({
                    url
                })
            })
        }
            print.success(res,list)
        }).catch(error => {
            print.error(res, error)
        })
    }
}