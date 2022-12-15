var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var passport = require('passport');
var flash = require('connect-flash');
require('dotenv').config();

var hist_route = require('./routes/hist_route');
var user_route = require('./routes/user_route');
var account_route = require('./routes/account_route');
var pos_route = require('./routes/pos_route');
var veh_route = require('./routes/veh_route');
var rela_route = require('./routes/rela_route');
var user_veh_route = require('./routes/user_veh_route')
var session_connection = require('./config/session_database');

var app = express();

app.use((req, res, next) => {
  // const allowedOrigins = ['http://localhost:3000'];
  // const origin = req.headers.origin;
  // if (allowedOrigins.includes(origin)) {
  //   res.setHeader('Access-Control-Allow-Origin', origin);
  // }

  const origin = req.headers.origin
  res.setHeader('Access-Control-Allow-Origin', origin)

  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept'
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

var session_store = new MySQLStore(
  {
    expiration: 1000 * 60 * 60 * 24 * 30,
    createDatabaseTable: true,
    schema: {
      tableName: 'session_infomation',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  },
  session_connection
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: session_store,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    resave: false,
  })
);

app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

app.use('/history', hist_route);
app.use('/user', user_route);
app.use('/account', account_route);
app.use('/position', pos_route);
app.use('/relative', rela_route);
app.use('/vehicle', veh_route);
app.use('/user_veh', user_veh_route)

app.get('/',(req,res)=>{
  res.send("IT Nihongo 2")
})

module.exports = app;
