var express = require('express');
var router = express.Router();
//引入mongodb驱动
var mongoClient = require('mongodb').MongoClient
// mongodb协议
const DB_STR = 'mongodb://localhost:27017/blogdb'

//通过objectId把字符串转化成ObjectId类型的id
var ObjectId = require('mongodb').ObjectId;



/* GET home page. */
//显示文章列表
router.get('/', function(req, res, next) {
    //3.获取文章
    mongoClient.connect(DB_STR,function (err,client) {
        "use strict";
        if(err){
            res.send(err)
            return;
        }
        var db = client.db('blogdb')
        var cl = db.collection('posts')
        cl.find().toArray((err,docs) =>{
            if(err){
                res.send(err)
                return;
            }
            res.render('admin/article_list',{data:docs});
        })
    })

});
//1.显示添加文章列表
router.get('/add', function(req, res, next) {
    mongoClient.connect(DB_STR,function (err,client) {
        "use strict";
        if(err){
            res.send(err)
            return;
        }
        var db = client.db('blogdb')
        var cl = db.collection('cats')
        cl.find().toArray((err,docs) =>{
            if(err){
                res.send(err)
                return;
            }
            res.render('admin/article_add',{data:docs});
        })
    })
});
//2.完成具体添加文章的功能
router.post('/add',function (req,res) {
    //获取表单提交的数据
    var cat = req.body.category_id
    var title = req.body.subject;
    var summary = req.body.summary
    var content = req.body.content;
    //发布文章的时间
    var time = new Date();


    //将拿到的数据封装到一个post中
    var post = {
        "cat":cat,
        "title":title,
        "summary":summary,
        "content":content,
        "time":time
    }
    // console.log(post)
    mongoClient.connect(DB_STR,function (err,client) {
        "use strict";
        if(err){
            res.send(err)
            return;
        }
        var db = client.db('blogdb')
        var cl = db.collection('posts')
        cl.insert(post,(err,result) => {
            if(err){
                res.send(err)
                return;
            }
            //成功
            res.send('文章添加成功 <a href="/admin/posts">查看文章列表</a>')
        })
    })
})
module.exports = router;