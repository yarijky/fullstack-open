const filterReducer = (state = "ALL", action) => {
  console.log('STATE: ', state, 'ACTION: ', action )
  switch (action.type) {
    case "ALL":
      return "ALL"
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
};

export const filterChange = (filter) => {
  if (filter !== "") {
    return {
      type: "SET_FILTER",
      payload: filter,
    };
  }
  return {
    type: "ALL",
  };
  
};

export default filterReducer;
