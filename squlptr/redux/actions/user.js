import { SqulptrInstance } from '../http';

export const getUserDetails = () => dispatch => {
  SqulptrInstance.then(instance => {
    instance.get('/user')
      .then(response => {
        dispatch({
          type: 'user_details_fetched',
          data: response.data.data,
        });
      })
      .catch(err => {});
  });
};
