const getInitialState = () => ({
  user: {
    avatar: null,
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
      const { avatar, firstname, lastname, username, email, phone, interests } = action.data;
      
      return {
        ...state,
        user: {
          ...state.user,
          avatar: avatar || null,
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
