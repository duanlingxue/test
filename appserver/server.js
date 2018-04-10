var mysql      = require('mysql');

module.exports = function mySql() {
     this.connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'base'
    });
//sql语句
    //查
    this.sql = 'SELECT * FROM user'; //查询user表
    this.sqlSetting = 'SELECT * FROM setting WHERE userId=?'; //查询setting表
    this.sqlScore = 'SELECT * FROM score WHERE userId=?'; //查询score表
    this.sqlNewslist = 'SELECT * FROM newslist'; //查询新闻列表
    this.sqlNewsinfo = 'SELECT * FROM newsinfo WHERE id=?'; //查询新闻详情
    //增
    this.addSql = "INSERT INTO user ( name, password) VALUES (?, ?)" //注册
    this.addSqlSetting = "INSERT INTO setting ( min, max , score , userId) VALUES (?,?,?,?) " //设置
    this.addSqlScore = "INSERT INTO score ( name, time , score , userId) VALUES (?,?,?,?) " //分数
    //改
    this.updataSqlSetting = "UPDATE setting SET  min=?, max=? , score=? , userId=? WHERE id=?" //设置 的 更新
    //删
    this.delSql = 'DELETE FROM score where userId=?';//删除score
}