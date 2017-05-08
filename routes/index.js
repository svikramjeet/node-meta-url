var models  = require('../models');
var express = require('express');
var router  = express.Router();
var devops = require('../controllers/devops');
var users  = require('../controllers/users');


// var multer = require('multer');
// var storage = multer.diskStorage({
//   destination: function(req,file,cb){
//     cb(null,'uploads');
//   },
//   filename: function(req,file,cb){
//     cb(null, Date.now() + '_'+ file.originalname);
//   }
// });
// var upload = multer({storage: storage });
var fs = require('fs');
// var multiparty = require('connect-multiparty'),
// multipartyMiddleware = multiparty();
// router.use(multipartyMiddleware);
var dotenv = require('dotenv');
dotenv.load();
var AWS = require('aws-sdk');
AWS.config.region = process.env.AWS_REGION;
var s3bucket = new AWS.S3({Bucket: process.env.AWS_BUCKET, region: process.env.AWS_REGION, accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET });


router.get('/login',devops.checkSignIn,devops.login);
router.post('/login',devops.checkLogin);
router.get('/',devops.checkSignIn,devops.getAlldevops);
router.get('/add',devops.checkSignIn,devops.addDevops);
router.post('/add',devops.checkSignIn,devops.saveDevops);
router.post('/adda',devops.checkSignIn,function(req, res){
  var file = req.files.photo;
  file.originalFilename = Date.now() + '_' + file.originalFilename;
  var params = {
    Key: file.originalFilename,
    Body: fs.createReadStream(file.path),
    Bucket: process.env.AWS_BUCKET,
    ACL: 'public-read-write'
  };
  s3bucket.upload(params, function (err, data) {
    if (err) {
          res.render('add', { layout : null,title: 'home',message:err });
     }
   console.log(req.files);
   var name = req.body.name;
   var department = req.body.department;
      console.log(department+'<br/>'+name);
             models.devops.findOne({        
                where: { name: req.body.name },
              })
              .then(function (getUser) {
                if(getUser==null)
                {
                  models.devops.create({ name: name, department: department,url:file.originalFilename }, {})
                  .then(function(devops) {
                    models.devops.findAll().then(function(devops) {
                      //res.send(devops);return false;
                        res.render('list', { layout : null,title: 'list',data:devops,message:'Developer Added' });
                      });
                  })
                  .catch(function(error) {
                      res.render('add', { layout : null,title: 'home',message:error });
                  })
                }
                else
                {
                  res.render('add', { layout : null,title: 'home',message:'Usename already exists' });
                }
              })
            .catch(function(error) {
                      res.render('add', { layout : null,title: 'home',message:error });
                  })
  })
});

router.get('/delete/:id',devops.checkSignIn,devops.deleteDevops);
router.get('/edit/:id',devops.checkSignIn,devops.editDevops);
router.post('/update/:id',devops.checkSignIn,devops.updateDevops);
router.get('/adduser',devops.checkSignIn,users.addUser);
router.post('/adduser',devops.checkSignIn,users.saveUser);
router.get('/listuser',devops.checkSignIn,users.getAllusers);
router.get('/logout',users.logout);
module.exports = router;