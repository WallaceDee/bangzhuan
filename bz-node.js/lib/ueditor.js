var Busboy = require('busboy');
var fs = require('fs');
var fse = require('fs-extra');
var os = require('os');
var path = require('path');
var snowflake = require('node-snowflake').Snowflake;
var { baseUrl } = require('../config/config.js');
const {
    print
} = require('./util')
var ueditor = function (static_url, config = {}, handel) {
    return function (req, res, next) {
        var _respond = respond(static_url, config, handel);
        _respond(req, res, next);
    };
};
var respond = function (static_url, config = {}, callback) {
    if (typeof config === 'function') {
        callback = config
        config = {}
    }
    return function (req, res, next) {
        if (req.query.action === 'config') {
            callback(req, res, next);
            return;
        } else if (req.query.action === 'listimage' || req.query.action === 'listfile') {
            res.ue_list = function (list_dir) {
                var str = '';
                var i = 0;
                var list = [];
                fs.readdir(static_url + list_dir, function (err, files) {
                    if (err) {
                        print.error(res, { message: '读取失败！', error: err })
                        return false
                    }else
                    var total = files.length;
                    files.forEach(function (file) {
                        var filetype = 'jpg,png,gif,ico,bmp,svg';
                        var tmplist = file.split('.');
                        var _filetype = tmplist[tmplist.length - 1];
                        var temp = {};
                        if (list_dir === '/') {
                            temp.url = baseUrl + list_dir + file;
                        } else {
                            temp.url = baseUrl + list_dir + "/" + file;
                        }
                        list[i] = (temp);
                        i++;
                        // send file name string when all files was processed
                        if (i === total) {
                            res.json({
                                "state": "SUCCESS",
                                "list": list,
                                "start": 1,
                                "total": total
                            });
                        }
                    });
                });
            };
            callback(req, res, next);
        } else if (req.query.action === 'uploadimage' || req.query.action === 'uploadfile' || req.query.action === 'uploadvideo') {
            var busboy = new Busboy({
                headers: req.headers
            });
            busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
                req.ueditor = {};
                req.ueditor.fieldname = fieldname;
                req.ueditor.file = file;
                req.ueditor.filename = filename;
                req.ueditor.encoding = encoding;
                req.ueditor.mimetype = mimetype;
                res.ue_up = function (url) {
                    var tmpdir = path.join(os.tmpdir(), path.basename(filename));
                    var name = snowflake.nextId() + path.extname(tmpdir);
                    var dest = path.join(static_url, url, req.query.norename?filename:name);
                    if(req.query.norename){
                      console.log(dest)
                      fs.unlink(dest, function(err){
                        if(err){
                             throw err;
                        }
                        console.log('文件:'+dest+'删除成功！');
                      })
                    }
                    var writeStream = fs.createWriteStream(tmpdir);
                    file.pipe(writeStream);
                    writeStream.on("close", function () {
                        fse.move(tmpdir, dest, function (err) {
                            if (err) throw err;
                            res.json({
                                'url': baseUrl +'/'+ path.join(url, name).replace(/\\/g, '/'),
                                'title': req.body.pictitle,
                                'original': filename,
                                'state': 'SUCCESS'
                            });
                        });
                    })
                };
                callback(req, res, next);
            });
            req.pipe(busboy);
        } else if (req.query.action === 'deletefile') {
            res.ue_delete = function (fullPath) {
                //filePath fullpath
                let filePath='public'+fullPath.replace(baseUrl,'')
                console.log(filePath)
                fs.unlink(filePath, err => {
                    if (err) {
                        print.error(res, { message: '删除失败！', error: err })
                    } else {
                        print.success(res, { message: '删除成功！' })
                    }
                })
            }
            callback(req, res, next);
        } else {
            callback(req, res, next);
        }
        return;
    };
};
module.exports = ueditor;