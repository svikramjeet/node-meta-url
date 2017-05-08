'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('devops', 'depatment', 'department')
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('devops', 'department', 'depatment')
  }
};
