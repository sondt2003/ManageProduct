var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var DashboardRouter = require('./routes/Dashboard');
var ProductRouter = require('./routes/Product');
var UserRouter = require('./routes/User');
var LoginRouter = require('./routes/Login');
var CategoryRouter = require('./routes/Category');
var RegisterRouter = require('./routes/Register');

var ApiLoginRouter = require('./routes/api/ApiLogin');
var ApiRegisterRouter = require('./routes/api/ApiRegister');
var ApiUserRouter = require('./routes/api/ApiUser');
var ApiProductRouter = require('./routes/api/APiProduct');
var ApiCategoryRouter = require('./routes/api/ApiCategory');
var app = express();

app.use(express.static('./public'))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'nhvhi3432j492j1213412hfdsaheaeaasasdc',
  resave: true,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/Dashboard', DashboardRouter);
app.use('/User', UserRouter);
app.use('/Product', ProductRouter);
app.use('/Login', LoginRouter);
app.use('/Register', RegisterRouter);
app.use('/Category', CategoryRouter);

app.use('/apiLogin', ApiLoginRouter);
app.use('/apiRegister', ApiRegisterRouter);
app.use('/apiUser', ApiUserRouter);
app.use('/apiProduct', ApiProductRouter);
app.use('/apiCategory', ApiCategoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  // Tùy chỉnh lại render cho phù hợp với API
  // VD: link api: GET  /api/users
  if (req.originalUrl.indexOf('/apiUser') == 0) {
    // link bắt đầu bằng /api   là truy cập vào trang API ==> thông báo lỗi kiểu api
    res.json({
      status: err,
      msg: err.message
    });
  } else {
    // render the error page
    res.render('error');
  }

});

module.exports = app;
