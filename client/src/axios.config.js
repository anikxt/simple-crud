import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'localhost:8000' : '',
});

export default axios;
