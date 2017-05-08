var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var pg = require('pg');
var dotenv = require('dotenv');
dotenv.load();
var connectionString = conString = process.env.DATABASE_URL || 'redis://h:null@localhost:6379';
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var router = express.Router();
var pg = require('pg');
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  var handleError = function(err) {
    if(!err) return false;
    done(client);
    next(err);
    return true;
  };

  client.query('SELECT * FROM devops', function(err, result) {
    if(handleError(err, client, done)) return;

    if (result.rows.length > 0) {
     console.log(result.rows.length);
    }
  });
});
