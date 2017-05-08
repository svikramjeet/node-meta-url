var models = require('../models');
var fs = require('fs');
// module.exports.controller = function(app) {
var bcrypt = require('bcrypt');
const saltRounds = 10;

// var multer = require('multer');

// var storage = multer.diskStorage({
//   destination: function (request, file, callback) {
//     callback(null, 'public/images');
//   },
//   filename: function (request, file, callback) {
//     console.log(file);
//     callback(null, file.originalname)
//   }
// });
// var upload = multer({storage: storage});
// var multer = require('multer');
// var storage = multer.diskStorage({
//   destination: function(req,file,cb){
//     cb(null,'public/Images/stayingOptions');
//   },
//   filename: function(req,file,cb){
//     cb(null, Date.now() + '_'+ file.originalname);
//   }
// });
// var upload = multer({storage: storage });


exports.getAlldevops = function(req, res, next) {
      models.devops.findAll().then(function(devops) {
         res.render('list', { layout : null,title: 'list',data:devops,message:'' });
         });
 };
exports.addDevops = function(req, res, next) {
      res.render('add', { layout : null,title: 'add',message:null });
};
 exports.saveDevops = function(req, res, next) {
     let file = req.files.photo;
     console.log(file);
     file_name = Date.now() + '_' + file.name;
  // Use the mv() method to place the file somewhere on your server
  file.mv('./uploads/'+file_name, function(err) {
    if (err)
      return res.status(500).send(err);
  });

     var name = req.body.name;
     var department = req.body.department;
     //console.log(req.files);return false;


        models.devops.create({ name: name, department: department,url:file_name }, {})
          .then(function(devops) {
             models.devops.findAll().then(function(devops) {
                res.render('list', { layout : null,title: 'list',data:devops,message:'Developer Added' });
              });
          })
           .catch(function(error) {
              res.render('add', { layout : null,title: 'home',message:error });
          })
 };
 exports.deleteDevops =  function (req, res, next) {
     //res.send(req.params);
     models.devops.destroy({ where: req.params })
        .then(function(){
        res.redirect('/?message=deleted');
        })
};
 exports.editDevops =  function (req, res, next) {
        models.devops.findById(req.params.id).then(function(devops) {
            res.render('edit', { layout : null,title: 'list',data:devops,message:'' });
        })

};
 exports.updateDevops =  function (req, res, next) {
    var name = req.body.name;
    var department = req.body.department;
    var id = req.params.id;
    console.log(id);
    models.devops.update(
        { name: req.body.name },
         { where: { id: id } }).
         then(function () {
            models.devops.findAll().then(function(devops) {
                 res.redirect('/?message=updated');
              });
        })

};
exports.login = function(req, res, next) {
      res.render('login', { layout : null,title: 'Login',message:null });
  };
 exports.checkLogin =  function (req, res, next) {
       models.users.findOne({
        where: { username: req.body.username },
      })
       .then(function (getUser) {
            if (getUser === null) {
              res.render('login', { layout : null,title: 'Login',message:'Invalid username' });
            }
            else {
                 //if (req.body.password == getUser.password)
                 if(bcrypt.compareSync(req.body.password, getUser.password))
                  {
                     req.session.user = getUser.id;
                     res.redirect('/');
                  }
                 else
                 {
                     res.render('login', { layout : null,title: 'Login',message:'Invalid password' });
                 }
            }
        }).catch(function (err) {
            res.render('login', { layout : null,title: 'Login',message:err.message });
        })

};
 exports.checkSignIn =  function (req, res, next) {
    if(req.session)
    {
        if(req.originalUrl =='/login' && req.session.user!='')
        {
           res.redirect('/');
        }
        else
        {
          res.locals.user = req.session.user;
          return next();
        }

    }
    else if(req.originalUrl =='/login')
    {
      res.render('login', { layout : null,title: 'Login',message:null });
    }
    else
    {
         res.redirect('/login');
    }


};

// }
