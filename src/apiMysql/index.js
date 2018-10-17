var express = require('express');
var mysql = require('mysql');
var mysqlbase = {
  host: 'localhost', // 本地数据库
  user: 'root', // 数据库用户名
  password: 'root', // 数据库连接密码
  database: 'web_tool', // 连接的是哪个数据库
  port: 3306
};
var app = express();
// 请求跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

var connection = mysql.createConnection(mysqlbase);

connection.connect();

var data = '';
// SELECT * FROM goods 查询xishengwei数据库下面的goods表
connection.query('SELECT * FROM user', function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  data = results;
});
// app.use(express.static('./public'));

app.get('/news', function (req, res) {
  res.json(data);
});
