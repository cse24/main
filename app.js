"use strict"
//모듈 가져오기
const fs = require('fs');
const mysql = require('mysql');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const nunjucks = require('nunjucks');
///////////////////////////////////////////////////

dotenv.config();

//라우팅 모듈
const AuthRouter = require("./routes/user/auth");
const ClientRouter = require("./client");

const { sequelize } = require('./models');

///////////////////////////////////////////////////////////////////////
const app = express();
app.set('port', process.env.PORT||5000);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});


sequelize.sync({ force: false })
  .then(() => {

    console.log('database connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET || 'qkwlek12!!',
  cookie: {
    httpOnly: true,
    secure: false, // 배포시 true로 바꿀 것
  }
}));
app.use(passport.initialize());
app.use(passport.session());

const db = require('./models');




//라우팅
//////////////////////////////////////////////////

app.use('/login', AuthRouter);
app.use('/client',ClientRouter);

////////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


 



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(app.get('port')), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
}

module.exports = app;