'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('customers',[
      {
        customer_name: 'John Doe',
      },
      {
        customer_name: 'Jane Doe',
      },
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('customers', 
      { customer_name: 
        {
          $in: 
          [
            'John Doe',
            'Jane Doe',
          ]
        }
      }, 
      {}, 
      {primaryKeys:[],primaryKeyAttributes:[]}
    );
  }
};
