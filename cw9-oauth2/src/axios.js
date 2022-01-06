import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://messenger-with-encryption-default-rtdb.firebaseio.com'
});

export default instance;
