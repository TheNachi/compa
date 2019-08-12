import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const SqulptrInstance = new Promise(resolve => {
  resolve(AsyncStorage.getItem('USER_TOKEN'));
}).then(token => {
  console.log('Resolved token', token);

  return axios.create({
    baseURL: 'https://squlptr-api-staging.herokuapp.com/api',
    headers: {
      Authorization: token
    }
  });
});
