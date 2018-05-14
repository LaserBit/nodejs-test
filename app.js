var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var calculation = require('./routes/calculation');
var account = require('./routes/account');
var bodyParser = require('body-parser');
var session = require("express-session");
var passport = require("passport");
var app = express();

// テンプレートエンジンを EJS に設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

// 静的ファイルは無条件に公開
app.use(express.static(path.join(__dirname, 'public')));

// ルーティング設定
app.use('/calculation', calculation);
app.use('/account', account);
app.use('/', routes);

// セッションミドルウェア設定
app.use(session({ secret: "i1ifhu8z", resave: true, saveUninitialized: false }));

// 認証ミドルウェアpassportの初期化
app.use(passport.initialize());
app.use(passport.session());

const { Client } = require('pg');

// サーバーをポート 8080 で起動
app.listen(process.env.PORT || 8080, function () {
  console.log('listening on port 8080');
});
