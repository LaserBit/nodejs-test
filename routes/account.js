var express = require('express');
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

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

router.get('/login', function(req, res, next) {
    res.render('account/login');
});

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: 'account/login',  // 失敗したときの遷移先
    }),
    function(req, res, next){
        res.send("login success");
        res.render('index');
    }
);

module.exports = router;
