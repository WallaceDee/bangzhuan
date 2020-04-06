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
            print.success(res,{message:'修改成功'})
        }).catch(error => {
            print.error(res, error)
        })
    }
}