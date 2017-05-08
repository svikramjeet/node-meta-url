var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
//var pg = require('pg');
var dotenv = require('dotenv');
//var Sequelize = require('sequelize');
dotenv.load();
var fs = require('fs');
var connectionString = conString = process.env.DATABASE_URL || 'redis://h:null@localhost:6379';
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis_url = process.env.REDIS_URL || 'postgres://postgres:ucreate@localhost:5432/node';

var fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(cookieParser());
app.use(session({
    store: new RedisStore({url:redis_url}),secret: 'max',
    cookie: {
        expires: new Date(Date.now() + 60 * 60000),
        maxAge: 60 * 60000
    }
}));


app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 1111;
var router = express.Router();
//var models = require('./models');
var routes = require('./routes/index');
app.use('/', routes);
// dynamically include routes (Controller)
// fs.readdirSync('./controllers').forEach(function (file) {
//   if(file.substr(-3) == '.js') {
//       route = require('./controllers/' + file);
//       route.controller(app);
//   }
// });
app.listen(port);
console.log('Listening on port ' + port);
