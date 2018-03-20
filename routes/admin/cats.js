/**
 * Created by 2333 on 2018/3/19.
 */
var express = require('express');
var router = express.Router();
//引入mongodb驱动
var mongoClient = require('mongodb').MongoClient
// mongodb协议
const DB_STR = 'mongodb://localhost/blogdb'

//通过objectId把字符串转化成ObjectId类型的id
var ObjectId = require('mongodb').ObjectId;



/* GET home page. */
//后台分类列表
router.get('/', function(req, res, next) {
    //分类列表的具体实现
    mongoClient.connect(DB_STR,(err,client) =>{
        "use strict";
        if(err){
            res.send(err)
            return;
        }
        var db = client.db('myblog')
        var cl = db.collection('cats')
        cl.find().toArray((err,docs) => {
            if(err){
                res.send(err)
                return;
            }
            //数据和视图一起渲染
            res.render('admin/category_list',{data:docs})
        })
    })
    // res.render('admin/category_list');
});

//后台分类添加
router.get('/add', function(req, res, next) {
    res.render('admin/category_add');
});
//后台分类添加的具体实现
router.post('/add',(req,res,next) => {
    "use strict";
    //第一步，获取表单提交过来的数据
    var title = req.body.title;
    var sort  = req.body.sort
    // console.log(title,sort)
    //第二步，验证提交过来的数据

    //第三步，将上面的数据保存到数据库，并完成提示和跳转
    mongoClient.connect(DB_STR,(err,client) =>{
        if(err){
            res.send(err)
            return;
        }
        //连接成功后，db就是myblog数据库
        const db = client.db('myblog');
        //获取cats集合
        var cl = db.collection('cats')
        //将获取的表单数据添加到数据库的集合中
        cl.insert({title,sort},(err,result) => {
            if(err){
                res.send(err)
            }else{
                //插入数据成功
                res.send("添加分类成功 <a href='/admin/cats'>查看分类列表</a>")
            }
        })
    })
})


//后台分类编辑
router.get('/edit', function(req, res, next) {
    //获取id
    var id = req.query.id;
    mongoClient.connect(DB_STR,function (err,client) {
        if(err){
            res.send(err)
            return;
        }
        var db= client.db('myblog')
        var cl = db.collection('cats')
        cl.find({_id:ObjectId(id)}).toArray((err,docs) => {
            "use strict";
            if(err){
                res.send(err)
                return;
            }
            console.log(docs)
            //将数据渲染到视图中
            res.render('admin/category_edit',{data:docs[0]});
        })
    })
});
//后台分类编辑，编辑后将数据写入到数据库
router.post('/edit',(req,res,next) => {
    "use strict";
    //1,获取表单中的数据
    var title =req.body.title;
    var sort = req.body.sort;
    var id = req.body.id
    mongoClient.connect(DB_STR,(err,client) => {
        if(err){
            res.send(err)
            return;
        }
        var db = client.db('myblog')
        var cl = db.collection('cats')
        cl.update({_id:ObjectId(id)},{$set:{title,sort}},(err,result) => {
            if(err){
                res.send(err)
                return;
            }else{
                res.send("更新成功 <a href='/admin/cats'>返回到分类列表</a> ")
            }
        })
    })
})

// 后台分类删除
router.get('/delete', function(req, res) {  //这里不能使用post请求
    //获取id
    var id = req.query.id;
    mongoClient.connect(DB_STR,(err,client) => {
        "use strict";
        if(err){
            res.send(err)
            return;
        }
        var db = client.db('myblog')
        var cl = db.collection('cats')
        cl.remove({_id:ObjectId(id)},(err,result) => {
            if(err){
                res.send(err)
                return;
            }
            res.redirect('/admin/cats')
        })
    })
});

module.exports = router;


















