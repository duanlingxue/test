
var mySql = require ('./server')
var serverSQL = new mySql();

serverSQL.connection.connect();

//登录
exports.login = function (app) {
    app.post('/login', function (req, res) {
        var loginName = req.body.userName;
        var loginPassword = req.body.userPassword;
        serverSQL.connection.query(serverSQL.sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            var code;
            var userMsg;
            for(var i=0;i<result.length;i++){
                if(loginName==result[i].name&&loginPassword==result[i].password){
                    code = 200;
                    userMsg=result[i];
                    break;
                }else{
                    code = 400;
                }
            }
            res.set("Content-Type", "application/json")
            if(code==400){
                res.send({
                    code:code,
                    message:'账号或密码错误',
                    data:{}
                })
            }else{
                delete userMsg.password;
                res.send({
                    code:code,
                    message:'成功',
                    data:userMsg,
                })
            }
        });
    })
}
//注册
exports.register = function (app) {
    app.post('/register', function (req, res) {
        var userName = req.body.userName;
        var userPassword = req.body.userPassword;
        serverSQL.connection.query(serverSQL.sql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            var code;
            var userMsg;
            for(var i=0;i<result.length;i++){
                if(userName==result[i].name){
                    code = 400;
                    break;
                }else{
                    code = 200;
                }
            }
            if(code==200){
                var addSqlParams= [userName,userPassword];
                serverSQL.connection.query(serverSQL.addSql,addSqlParams,function (err, result) {
                    if(err){
                        console.log('[INSERT ERROR] - ',err.message);
                        return;
                    }
                    res.send({
                        code:code,
                        message:'注册成功',
                        data:{}
                    })
                })

            }else{
                res.send({
                    code:code,
                    message:'用户名已存在',
                    data:{}
                })
            }
        });
    });
}


//上传分数
exports.unload = function (app) {
    app.post('/upload',function (req, res) {
        var params = req.body;
        for (var i=0;i<params.length;i++){
            var addparams = [];
            for (var key in params[i]){
                addparams.push(params[i][key])
            }
            serverSQL.connection.query(serverSQL.addSqlScore,addparams,function (err, result) {
                if(err){
                    console.log('[insert score ERROR] - ',err.message);
                    return;
                }
            })
        }
        res.send({
            code:200,
            message:'上传成功',
            data:{}
        })
    })
}
//设置分数
exports.setting = function (app) {
    //查询已有分数设置
    app.get('/settingSelect',function (req, res) {
        var params = [];
        params.push(req.query.userId)
        serverSQL.connection.query(serverSQL.sqlSetting,params,function (err, result){
            if(err){
                console.log('[SELECT setting ERROR] - ',err.message);
                return;
            }
            res.send({
                code:200,
                message:'成功',
                data:result
            })
        })
    })
    //设置分数
    app.post("/setScore",function (req,res) {
        var params = req.body;
        for (var i = 0;i<params.length;i++){
            var addparams = [];
            var paramsId ;
            paramsId = params[i].id;
            delete params[i].id;
            for (var key in params[i]){
                addparams.push(params[i][key])
            }
            console.log(paramsId)
            if(paramsId!=undefined){
                addparams.push(paramsId);
                serverSQL.connection.query(serverSQL.updataSqlSetting,addparams,function (err, result) {
                    if(err){
                        console.log('[updata setting ERROR] - ',err.message);
                        return;
                    }
                })
            }else{
                serverSQL.connection.query(serverSQL.addSqlSetting,addparams,function (err, result){
                    if(err){
                        console.log('[INSERT setting ERROR] - ',err.message);
                        return;
                    }

                })
            }
        }
        res.send({
            code:200,
            message:'设置成功',
            data:{}
        })
    })
}
//查询历史记录
exports.history = function (app) {
    app.get('/history',function (req, res) {
        var params = [];
        params.push(req.query.userId)
        serverSQL.connection.query(serverSQL.sqlScore,params,function (err, result) {
            if(err){
                console.log('[SELECT setting ERROR] - ',err.message);
                return;
            }
            res.send({
                code:200,
                message:'成功',
                data:result
            })
        })
    })
}
//删除历史记录
exports.delHistory = function (app) {
    app.get('/deleteHistory',function (req, res) {
        var params = [];
        params.push(req.query.userId)
        serverSQL.connection.query(serverSQL.delSql,params,function (err, result) {
            if(err){
                console.log('[SELECT setting ERROR] - ',err.message);
                return;
            }
            res.send({
                code:200,
                message:'清空成功',
                data:{}
            })
        })
    })
};
//查询新闻列表
exports.newsList = function (app) {
    app.get('/newsList',function (req, res) {
        serverSQL.connection.query(serverSQL.sqlNewslist,function (err, result) {
            if(err){
                console.log('[SELECT Newslist ERROR] - ',err.message);
                return;
            }
            res.send({
                code:200,
                message:'成功',
                data:result
            })
        })
    })
}
//查询新闻详情
exports.newsInfo = function (app) {
    app.get('/newsInfo',function (req, res) {
        var params = [];
        params.push(req.query.id)
        serverSQL.connection.query(serverSQL.sqlNewsinfo,params,function (err, result) {
            if(err){
                console.log('[SELECT Newslist ERROR] - ',err.message);
                return;
            }
            res.send({
                code:200,
                message:'成功',
                data:result[0]
            })
        })
    })
}