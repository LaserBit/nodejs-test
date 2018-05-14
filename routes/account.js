var express = require('express');
var path = require('path');
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
// var client = require('../private/postgreconnection');

// DBと接続
//client.connect();

// passport設定
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
            return done(null, false, { message: 'ユーザーIDが正しくありません。' });
            }
            if (!user.validPassword(password)) {
            return done(null, false, { message: 'パスワードが正しくありません。' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.get('/register', function(req, res, next) {
    res.render('account/register', { title: '新規ユーザー登録' });
});

router.post('/register', function (req, res, next) {
    var userName = req.body.user_name;
    var password = req.body.password;
    console.log("REGISTER" + userName + password);
    // var query = 'INSERT INTO public.users (username, password) VALUES (userName, password)';
    var query = 'INSERT INTO users (username, password) VALUES (userName, password)';
    client.query(query, (err, res) => {
        if (err) throw err;
        console.log("RESULT" + result);
        client.end();
    });
    res.redirect('../');
});

router.get('/login', function(req, res, next) {
    res.render('account/login', { title: 'ログイン' });
});

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: 'account/login',  // 失敗したときの遷移先
    }),
    function(req, res, next){
        res.send("login success");
        res.redirect('../');
    }
);

module.exports = router;
