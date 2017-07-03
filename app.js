const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const passport = require('passport');
const JWTConfig = require('./config/jwtConfig');

const index = require('./routes/index');
const userRoutes = require('./routes/userRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

const app = express();

// NOTE: Use for development purposes only
app.use((req, res, next) => {
  /** Website allowed to connect to node. */
  res.setHeader('Access-Control-Allow-Origin', '*');
  /** Request Methods you wish to allow. */
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  /** Request Headers you wish to allow. */
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  /** Set to true if you need the website to include cookies in the requests sent
  * to the API (e.g. in case you use sessions) */
  res.setHeader('Access-Control-Allow-Credentials', true);
  /** Pass to next layer of middleware */
  next();
});
// FIXME: Whenever this repo is used to start a new project replace authToken in connect with Database for that particular app.
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/authToken');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line
db.once('open', () => {
  console.log('Connected to DB'); // eslint-disable-line
});
// NOTE: Passport initialized
passport.use(JWTConfig);
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/token', tokenRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
