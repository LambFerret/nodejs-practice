const express = require('express');
const app = express();
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handlebars = require('express-handlebars')

//router modules declare
const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const loginRouter = require('./routes/login');
const regiRouter = require('./routes/register')
const transRouter = require('./routes/transform')

//express SETTINGS
app.engine('hbs', handlebars({
  defaultLayout: 'basic',
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
}))
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//router modules
app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/login', loginRouter);
app.use('/register', regiRouter);
app.use('/transform', transRouter);

// 404 error
app.use(function (req, res, next) {
  next(createError(404));
});
// error else
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// app start
app.listen(3000, () => {
  console.log(`localhost opened`)
})
