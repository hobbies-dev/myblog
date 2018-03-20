var express = require('express');
var router = express.Router();
//引入mongodb驱动
var mongoClient = require('mongodb').MongoClient
// mongodb协议
const DB_STR = 'mongodb://localhost:27017/myblog'

//通过objectId把字符串转化成ObjectId类型的id
var ObjectId = require('mongodb').ObjectId;

/* GET home page. */
router.get('/', function(req, res, next) {
    var id = req.query.id;
    mongoClient.connect(DB_STR,(err,client) => {
        "use strict";
        if(err){
            res.send(err)
            return;
        }
        var db = client.db('myblog');
        var cl = db.collection('posts')
        cl.find({_id:ObjectId(id)}).toArray((err,docs) => {
            if(err){
                res.send(err);
                return;
            }
            //数据和视图一起进行渲染
            res.render('home/article',{data:docs[0]});
        })
    })

});

module.exports = router;