'use strict';
const _ = require('lodash');
const Promise = require('bluebird');

module.exports = (sequelize, DataTypes) => {
  let Customer = sequelize.define('customer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customer_name : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  }, 
  {
    timestamps: false,
    // Creating a custom method for our User model. This will check if an unhashed password entered by
    // The user can be compared to the hashed password stored in our database
    classMethods: {
      associate: function(models) {
        // An Author (foreignKey) is required or a Post can't be made
        Customer.hasMany(models.burger, {
          onDelete: "cascade"
        });
      },
      selectAll: function(models) {
        return this.findAll({})
        .then(data => _.map(data, d => d.toJSON()))
      },
      insertOne: function(newCustomer) {
        return this.build(newCustomer).save()
        .then(dbNewCustomer => {
          console.log("customer has been inserted");
          return dbNewCustomer.toJSON();
        })
        .catch(error => {
          console.log("error inserting cutomer");
        })
      },
    },
  });
  return Customer;
}
