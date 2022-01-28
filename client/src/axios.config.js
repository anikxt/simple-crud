import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://simple-crud-production.up.railway.app',
  responseType: 'json',
});

export default axios;
