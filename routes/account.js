const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require('../db')

// passport設定
passport.use(new LocalStrategy(
    function (username, password, done) {
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

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

router.get('/register', function (req, res, next) {
    res.render('account/register', { title: '新規ユーザー登録' });
});

router.post('/register', function (req, res, next) {
    const userName = req.body.user_name;
    const password = req.body.password;
    const query = 'INSERT INTO public.users (user_name, password) VALUES ($1, $2)';
    // DBと接続
    db.connect();
    db.query(query, [userName, password])
        .then(result => console.log(result))
        .catch(e => console.error(e.stack))
        .then(() => db.end())
    res.redirect('../');
});

router.get('/login', function (req, res, next) {
    res.render('account/login', { title: 'ログイン' });
});

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: 'account/login',  // 失敗したときの遷移先
    }),
    function (req, res, next) {
        res.send("login success");
        res.redirect('../');
    }
);

module.exports = router;
