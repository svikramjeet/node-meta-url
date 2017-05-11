var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/metadata',function(req,res){
var url = req.query.url;
var unfurl = require('unfurl.js');
(async function () {
  let result = await unfurl(url)
  // console.log('title', result.other.title);
  // console.log('description', result.other.description);
  // console.log('icon', result.other.icon);
  // console.log('url', url)
  res.send(result);
})().catch(console.error)
});
app.listen(2525);
console.log('Listening on port 2525');
