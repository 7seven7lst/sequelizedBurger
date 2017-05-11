import { normalize } from 'normalizr';
import * as schema from './schema';
import * as api from '../api';
import { getIsFetching } from '../reducers';

export const fetchBurgers = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_BURGERS_REQUEST',
    filter,
  });

  return api.fetchBurgers(filter).then(
    response => {
      console.log("adfsd", normalize(response, schema.arrayOfBurgers));
      dispatch({
        type: 'FETCH_BURGERS_SUCCESS',
        filter,
        response: normalize(response, schema.arrayOfBurgers),
      });
    },
    error => {
      dispatch({
        type: 'FETCH_BURGERS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const addBurger = (burger) => (dispatch) => {
  console.log("burger is >>>>", burger);
  api.addBurger(burger).then(response => {
    console.log("response is>>>", response);
    dispatch({
      type: 'ADD_BURGER_SUCCESS',
      response: normalize(response, schema.burger),
    });
  });
}
  

export const toggleBurger = (id) => (dispatch) =>
  api.updateBurger(id).then(response => {

    dispatch({
      type: 'TOGGLE_BURGER_SUCCESS',
      response: normalize(response, schema.burger),
    });
  });

export const fetchCustomers = () => (dispatch, getState) => {
  console.log("state is >>>>", getState());
  /*
  if (getIsFetching(getState()), filter) {
    return Promise.resolve();
  }
  */
  dispatch({
    type: 'FETCH_CUSTOMERS_REQUEST',
  });

  return api.fetchCustomers().then(
    response => {
      console.log("adfsd", normalize(response, schema.arrayOfCustomers));
      dispatch({
        type: 'FETCH_CUSTOMERS_SUCCESS',
        response: normalize(response, schema.arrayOfCustomers),
      });
    },
    error => {
      dispatch({
        type: 'FETCH_CUSTOMERS_FAILURE',
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const addCustomer = (text) => (dispatch) =>
  api.addCustomer(text).then(response => {
    dispatch({
      type: 'ADD_CUSTOMERS_SUCCESS',
      response: normalize(response, schema.customer),
    });
  });
