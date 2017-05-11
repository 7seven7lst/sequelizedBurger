import { combineReducers } from 'redux';

// this will create a list listByFilter['<filter>'] as {ids, isFetching, errorMsg}
const createList = filter => {
  const handleDevour = (state, action) => {
    const { result: devouredId, entities } = action.response;
    const { devoured } = entities.burgers[devouredId];
    const shouldRemove = (
      (devoured && filter === 'available') ||
      (!devoured && filter === 'devoured')
    );
    return shouldRemove ?
      state.filter(id => id !== devouredId) :
      state;
  };

  const ids = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_BURGERS_SUCCESS':
        return filter === action.filter ?
          action.response.result :
          state;
      case 'ADD_BURGER_SUCCESS':
        console.log("ADD_BURGER SUCCSSS, action is >>>>", action, state);
        return filter !== 'devoured' ?
          [...state, action.response.result] :
          state;
      case 'UPDATE_BURGER_SUCCESS':
        return handleDevour(state, action);
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_BURGERS_REQUEST':
        return true;
      case 'FETCH_BURGERS_SUCCESS':
      case 'FETCH_BURGERS_FAILURE':
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_BURGERS_FAILURE':
        return action.message;
      case 'FETCH_BURGERS_REQUEST':
      case 'FETCH_BURGERS_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;
