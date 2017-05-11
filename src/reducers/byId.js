const byId = (state = {}, action) => {
  if (action.response) {
    console.log("what is the state so far??>>", state);
    console.log("what is action.response??>>>", action.response);
    // action.response.entities.burgers is an array of burgers
    // here we return a byId with a list of burgers
    return {
      ...state,
      ...action.response.entities.burgers,
    };
  }
  return state;
};

export default byId;

// get the burger in the byId
export const getBurger = (state, id) => state[id];
