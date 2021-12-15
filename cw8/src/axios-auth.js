import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: 'AIzaSyAuHparLfgNDiBtdw413s8_cpIogp9Pyt0'
  }
});

export default instance;
