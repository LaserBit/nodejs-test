const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require('../db')

// passport設定
passport.use(new LocalStrategy(
    function (username, password, cb) {
        pool.query('SELECT id, user_name, password FROM users WHERE user_name=$1', [username], (err, result) => {
            if (err) {
                console.error('Error when selecting user on login', err)
                return cb(err)
            }
            if (!result) {
                return cb(null, false);
            }
            if (result.rows.length > 0) {
                const first = result.rows[0]
                if (password == first.password) {
                    cb(null, { id: first.id, username: first.username })
                } else { cb(null, false) }
            }
        })
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
    pool.connect().then(client => {
        client.query(query, [userName, password]).then(res => {
            client.release()
            console.log("new user inserted")
        })
            .catch(e => {
                client.release()
                console.error('query error', e.message, e.stack)
            })
    })
    res.redirect('../');
});

router.get('/login', function (req, res, next) {
    res.render('account/login', { title: 'ログイン' });
});

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: './login',  // 失敗したときの遷移先
    }),
    function (req, res, next) {
        console.log("login success")
        res.redirect('../');
    }
);

module.exports = router;
