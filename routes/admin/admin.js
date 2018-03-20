/**
 * Created by 2333 on 2018/3/17.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin/admin');
});

module.exports = router;