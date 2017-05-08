'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'users',
      'password',
       {
         type : Sequelize.TEXT
       }

    )
  },

  down: function (queryInterface, Sequelize) {
        queryInterface.changeColumn(
      'users',
      'password',
         {
         type : Sequelize.STRING
       }
    )
  }
};
