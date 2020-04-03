const {
    print,
    query,
    getSqlPageParmas
} = require('../../lib/util')
const $sql = require('./sqlMapping')

module.exports = {
    getSetting: (req, res) => {
        query($sql.getSetting).then(result => {
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