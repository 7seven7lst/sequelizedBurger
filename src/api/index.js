import { v4 } from 'node-uuid';
import * as axios from 'axios';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

export const fetchCustomers = () =>
  axios.get('/api/get/customers')
  .then(response => {
    console.log("getting all the customers>>>>", response.data);
    return response.data;
  })
  .catch(error => {
    throw new Error(`Unable to get customers from backend`);
  });

export const addCustomer = newCustomer =>
  axios.post('/api/add/customer', newCustomer)
    .then(response => response.data)
    .catch(error => {
      throw new Error(`Unable to save customer to backend`);
    });

export const fetchBurgers = filter =>
  axios.get('/api/get/burgers')
  .then(response => {
    let burgers = response.data;
    switch (filter) {
      case 'all':
        return burgers;
      case 'available':
        return burgers.filter(b => !b.devoured);
      case 'devoured':
        return burgers.filter(b => b.devoured);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  })
  .catch(error => {
    throw new Error(`Unable to get burgers from backend`);
  });

export const addBurger = newBurger =>
  axios.post('/api/add/burger', newBurger)
    .then(response => {
      console.log("response is>>>", response);
      return response.data;
    })
    .catch(error => {
      throw new Error(`Unable to save burger to backend`);
    });

export const updateBurger = id => {
  return axios.post(`/api/update/burger/${id}`, {devoured:true})
    .then(response => response.data)
    .catch(error => {
      throw new Error(`Unable to update burger to backend`);
    });
}
