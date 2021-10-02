const express = require('express');
const app = express();
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars')
const flash = require("connect-flash")
const logger = require('morgan');
const port = process.env.PORT || 8001
const sessionConfig = require("./lib/session")
app.use(sessionConfig)
const passport = require("./lib/pass")(app);
const cors = require("cors")
const graphQL = require("./data/graphQL")

//router modules declare
const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const loginRouter = require('./routes/login')(passport);
const regiRouter = require('./routes/register')
const transRouter = require('./routes/transform')
const commuRouter = require('./routes/community')
const RestRouter = require('./routes/restAPI')
const settRouter =require("./routes/settings")


//express SETTINGS
app.engine('hbs', handlebars({
  defaultLayout: 'basic',
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
}))
app.use(cors())
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(flash())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(__dirname+'/node_modules/bootstrap/dist'))


//router modules
app.use('/graphql', graphQL)
app.use('/', indexRouter);
app.use('/settings', settRouter);
app.use('/profile', profileRouter);
app.use('/login', loginRouter);
app.use('/register', regiRouter);
app.use('/transform', transRouter);
app.use('/community', commuRouter);
app.use('/restapi', RestRouter);

// 404 error
app.use(function (req, res, next) {
  next(createError(404));
});

// else error
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// app start
app.listen(port, () => {
  console.log(`http://${port} is opened`)
})
