var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var pg = require('pg');
var dotenv = require('dotenv');
var pg = require('pg');
dotenv.load()
var connectionString = conString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);
client.connect();
// configure app to use bodyParser()
// this will let us get the data from a POST
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
  app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));

var port = process.env.PORT || 1111;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)


app.get('/', function (req, res, next) {  
  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('SELECT id,name, age FROM kids;', [], function (err, result) {
      done()

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

     // res.json(result.rows);
     res.render('list', { layout : null,title: 'home',data:result.rows ,message: null});
    })
  })
});
app.get('/edit/:id', function (req, res, next) {  
    const user = req.params;
    console.log(user.id);
  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('SELECT id,name, age FROM kids where id = $1 ;', [user.id], function (err, result) {
      done()

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

     // res.json(result.rows);
     console.log(result.rows[0]);
     res.render('edit', { layout : null,title: 'home',data:result.rows[0] });
    })
  })
});
app.get('/add', function(req, res) {
    res.render('add', { layout : null,title: 'add' ,message: null});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

// app.use('/add', router);
// app.use('/', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port); 
app.post('/save', function (req, res, next) {  
  const user = req.body

  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('INSERT INTO kids (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
      done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

      if (err) {
        // pass the error to the express error handler
        //return next(err)
        res.render('add', { layout : null,title: 'add',message: err });
      }

       //res.render('list', { layout : null,title: 'add',message: 'Value saved successfully' });
       res.redirect('/?message=Value saved successfully');
    })
  })
});
app.post('/edit/:id', function (req, res, next) {  
  const user = req.body

  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('update  kids set name = $1 ,age = $2  where id = $3;', [user.name, user.age, user.id], function (err, result) {
      done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

      if (err) {
        // pass the error to the express error handler
        //return next(err)
        res.render('edit', { layout : null,title: 'add',message: err });
      }

       res.render('list', { layout : null,title: 'add',message: 'Value updated successfully' });
    })
  })
});