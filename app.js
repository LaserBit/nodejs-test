var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var bodyParser = require('body-parser');
var app = express();

// テンプレートエンジンを EJS に設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 静的ファイルは無条件に公開
app.use(express.static(path.join(__dirname, 'public')));
// ルーティング設定
app.use('/', routes);

// サーバーをポート 8080 で起動
app.listen(process.env.PORT || 8080, function () {
  console.log('listening on port 8080');
});