var express = require('express');
var app = express();

var api = require('./api')
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
var multer = require('multer');
// app.use(multer()); // for parsing multipart/form-data


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers" ,"*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

 api.login(app);   //登录
api.register(app); //注册
api.unload(app);   //上传成绩
api.setting(app);  //查询设置
api.history(app);  //查询历史记录
api.delHistory(app);  //清空历史记录
api.newsList(app);  //查询新闻列表
api.newsInfo(app);  //查询新闻详情

var server = app.listen(9000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("有人来了", host, port)

})