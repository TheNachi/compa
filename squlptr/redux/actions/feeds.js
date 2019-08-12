import { SqulptrInstance } from '../http';

export const fetchFeeds = () => dispatch => {
  SqulptrInstance.then(instance => {
    instance.get('/feeds')
      .then(response => {
        dispatch({
          type: 'feeds_fetched',
          data: response.data.data,
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  });
};
