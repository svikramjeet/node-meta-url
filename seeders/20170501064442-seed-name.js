'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
      return queryInterface.bulkInsert('devops', [
        {
        name: 'Jaspal',
        department: '.net',
        createdAt:'2017-05-01 12:01:50.009+05:30',
        updatedAt:'2017-05-01 12:01:50.009+05:30'
      },
       {
        name: 'sandy',
        department: 'node',
        createdAt:'2017-05-01 12:01:50.009+05:30',
        updatedAt:'2017-05-01 12:01:50.009+05:30'
      },
       {
        name: 'mohit',
        department: 'node',
        createdAt:'2017-05-01 12:01:50.009+05:30',
        updatedAt:'2017-05-01 12:01:50.009+05:30'
      },
       {
        name: 'sahil',
        department: 'web',
        createdAt:'2017-05-01 12:01:50.009+05:30',
        updatedAt:'2017-05-01 12:01:50.009+05:30'
      }
      ], {});
    
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
