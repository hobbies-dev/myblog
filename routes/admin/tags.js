
var express = require('express');
var router = express.Router();
//引入mongodb驱动
var mongoClient = require('mongodb').MongoClient
// mongodb协议
const DB_STR = 'mongodb://localhost:27017/blogdb'

//通过objectId把字符串转化成ObjectId类型的id
var ObjectId = require('mongodb').ObjectId;



/* GET home page. */
//后台标签列表
router.get('/', function(req, res, next) {
    //分类列表的具体实现
    res.render('admin/tag_list');
});
router.get('/add', function(req, res, next) {
    //分类列表的具体实现
    res.render('admin/tag_add');
});

module.exports = router;