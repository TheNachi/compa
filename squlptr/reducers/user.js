const getInitialState = () => ({
  user: {
    avatar: 'https://images.unsplash.com/photo-1556228852-6d35a585d566?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phone: '',
    gender: 'Female',
    interests: [],
  }
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case 'user_details_fetched':
      const { firstname, lastname, username, email, phone, interests } = action.data;
      
      return {
        ...state,
        user: {
          ...state.user,
          firstname,
          lastname,
          username,
          email,
          phone,
          interests,
        },
      };
  }

  return { ...state };
};
