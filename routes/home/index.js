var express = require('express');
var router = express.Router();
//引入mongodb驱动
var mongoClient = require('mongodb').MongoClient
// mongodb协议
const DB_STR = 'mongodb://localhost/blogdb'


/* GET home page. */
router.get('/', function(req, res, next) {
  //连接数据库，获取数据
  mongoClient.connect(DB_STR,(err,client) => {
    "use strict";
    if(err){
      res.send(err)
        return;
    }
    //获取文章集合posts
    var db = client.db('blogdb');
    var cl = db.collection('posts');
    cl.find().toArray((err,docs) => {
      if(err){
        res.send(err);
        return;
      }
        //同时获取分类的数据
        var db = client.db('blogdb');
        var cl1 = db.collection('cats');
        cl1.find().toArray((err,result) => {
          if(err){
            res.send(err);
            return;
          }
          res.render('home/index',{data:docs,data1:result})
        })
    })

  })
});

module.exports = router;
