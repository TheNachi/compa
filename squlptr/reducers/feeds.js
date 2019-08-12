const initialState = {
  feeds: [],
};

export default (state=initialState, action) => {

  if (action.type === 'feeds_fetched') {
    return {
      ...state,
      feeds: action.data,
    };
  }

  return {...state};
};
