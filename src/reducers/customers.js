const customers = (state = {}, action) => {
  if (action.response) {
    console.log("what is the state so far??>>", state);
    console.log("what is action.response??>>>", action.response);
    // action.response.entities.burgers is an array of burgers
    // here we return a byId with a list of burgers
    return {
      ...state,
      ...action.response.entities.customers,
    };
  }
  return state;
};

export default customers;
