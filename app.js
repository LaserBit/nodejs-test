const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const calculation = require('./routes/calculation');
const account = require('./routes/account');
const bodyParser = require('body-parser');
const session = require("express-session");
const passport = require("passport");
const db = require('./db')
const app = express();

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

// サーバーをポート 8080 で起動
const server = app.listen(process.env.PORT || 8080, function () {
    console.log('listening on port 8080');
});

server.on('close', () => {
    client.end()
})
