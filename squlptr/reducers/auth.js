// initial state
const initialState = {
  isLoggedIn: '',
  isSignedup: '',
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  phone: '',
  loading: false,
  error: '',
  signIn: true
};

// authentication reducer
export default (state = initialState, action) => {
  return state;
};
