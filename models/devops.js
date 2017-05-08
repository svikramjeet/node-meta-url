'use strict';
module.exports = function(sequelize, DataTypes) {
  var devops = sequelize.define('devops', {
    name: DataTypes.STRING,
    department: DataTypes.STRING(5),
    status: DataTypes.BOOLEAN,
    url: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return devops;
};

exports.registerDevop = function (req, res) {
    Model.Users.create({ name: req.body.name, department: req.body.department })
        .then(function (insertedUser) {
            //return objCommon.apiResponse(res, insertedUser.dataValues, true, 'success');
            res.render('add', { layout : null,title: 'home',message:'Developer Added' });
        }).catch(function (error) {
            //return objCommon.apiResponse(res, 'Email-Id already exists', false, 'error');
            res.render('add', { layout : null,title: 'home',message:error });
        })
}