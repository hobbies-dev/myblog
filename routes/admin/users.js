var express = require('express');
var router = express.Router();
//引入mongodb驱动
var mongoClient = require('mongodb').MongoClient
// mongodb协议
const DB_STR = 'mongodb://localhost:27017/myblog'

//通过objectId把字符串转化成ObjectId类型的id
var ObjectId = require('mongodb').ObjectId;


/* GET users listing. */
router.get('/', function(req, res, next) {
  //载入登录页面
    res.render('admin/login')
});

//用户登录处理
router.post('/signin',(req,res) => {
  "use strict";
  //获取用户名和密码
    var username = req.body.username;
    var pwd = req.body.pwd;
    //得到用户名和密码后，需要将数据库中的用户名和密码比较
    mongoClient.connect(DB_STR,(err,client) => {
      if(err){
        res.send(err)
          return;
      }
      var db = client.db('myblog');
      var cl = db.collection('users');
      cl.find({username,pwd}).toArray((err,docs) => {
        if(err){
          res.send(err);
          return;
        }
        if(docs.length){
          //登录成功
            req.session.isLogin = true;
            res.redirect('/admin/index')
        }else{
          //登录失败
            res.redirect('/admin/users')
        }
      })
    })
})

//用户注销操作
router.get('/logout',(req,res) => {
  "use strict";
  //清除session，然后跳转就OK了
    req.session.isLogin = null;
    res.redirect('/admin/users')
})

module.exports = router;
