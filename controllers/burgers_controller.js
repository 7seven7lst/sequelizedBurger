'use strict';
const path = require('path');
let db = require("../models");

module.exports = app => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });

  app.get('/api/get/burgers', (req, res) => {
    db.burger.selectAll(db)
    .then(data => res.json(data))
  });

  app.get('/api/get/customers', (req, res) => {
    db.customer.selectAll()
    .then(data => res.json(data))
  });

  app.post('/api/add/customer', (req, res) => {
    const newCustomer = {
      customer_name: req.body.customer_name, 
    };
    db.customer.insertOne(newCustomer)
    .then(dbNewCustomer=>{
      res.json(dbNewCustomer);
    })
  })

  app.post('/api/add/burger', (req, res) => {
    console.log("hit the add burger route>>>>");
    const newBurger = {
      burger_name: req.body.burger_name, 
      devoured: req.body.devoured, 
      date: req.body.date,
      customerId: req.body.customerId
    };
    db.burger.insertOne(db, newBurger)
    .then(dbNewBurger=>{
      res.json(dbNewBurger);
    })
  });

  app.post('/api/update/burger/:id', (req, res) => {
    const id = req.params.id;
    const updatedBurger = {
      id: id,
      burger_name: req.body.burger_name, 
      devoured: true,
      date: req.body.date,
    }
    db.burger.updateOne(db, {id:id}, {devoured: true})
    .then(response=>{
      db.burger.findOne({where: {id:id}, include: [db.customer] })
      .then(response=>{
        res.json(response.toJSON());
      })
    });
  });
  // If no matching route is found default to home
  app.use((req, res) => {
    res.redirect('/');
  });
}
