var models = require('../models');
var bcrypt = require('bcrypt');
const saltRounds = 10;
// module.exports.controller = function(app) {


exports.getAllusers = function(req, res, next) {
      models.users.findAll( { where: { username: {  $ne: 'admin' } } }).then(function(users) {
         res.render('listuser', { layout : null,title: 'list',data:users,message:'' });
         });
 };
exports.addUser = function(req, res, next) {
      res.render('adduser', { layout : null,title: 'add',message:null });
};
 exports.saveUser = function(req, res, next) {
      var username = req.body.username;
      var salt = bcrypt.genSaltSync(saltRounds);
      var encrypted_password = bcrypt.hashSync(req.body.password, salt);
      models.users.findOne({        
            where: { username: req.body.username }            
            })        
            .then(function (user_exist) {
                  if (user_exist == null) {
                      models.users.create({ username: username, password: encrypted_password }, {})
                        .then(function(users) {
                              models.users.findAll( { where: { username: {  $ne: 'admin' } } }).then(function(allUsers) {
                              res.render('listuser', { layout : null,title: 'list',data:allUsers,message:'User Added' });
                              });
                        })
                        .catch(function(error) {
                              res.render('adduser', { layout : null,title: 'home',message:error });
                        })
                  }
                  else
                  {
                        res.render('adduser', { layout : null,title: 'home',message:'user already exists' });
                  }
            })
            .catch(function (err) {
                  res.render('adduser', { layout : null,title: 'home',message:err.message });
            })

 };
exports.logout = function(req, res, next) {
  req.session.destroy(function (err) {
    if (!err)
     {
      res.redirect('/login');
    } 
    else 
    {
      console.log(err);
    }
  });
};
// }