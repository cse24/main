"use strict"

const express = require('express');
const passport = require('../../passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./check_login.js');
const User = require('../../models/users');

const router = express.Router();

router.post('/signup', isNotLoggedIn, async (req, res, next) => {
    const { name, id_, password, age, local, isClient } = req.body;
    console.log(req.body)
    try {
        const exUser = await User.findOne({ where: { id_ } });
        if (exUser) {
            return res.json({success : false , data : "이미 존재하는 아이디입니다."});
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            id_,
            name,
            password: hash,
            age,
            local,
            isClient,
        });
        console.log('회원가입됨');
        // return res.redirect('/');
        return res.json({ success: true, data: null });// 클라 연동시
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, async (req, res, next) => {
    passport.authenticate('local-login', (authError, user, info) => {

        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect('/?loginError=$i{info.message}');
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            const data = {
                isClient : req.user.isClient,
            };
            return res.json({ success: true, data });

        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.json({ success: true, data: null });
});

module.exports = router;