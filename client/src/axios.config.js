import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.RAILWAY_STATIC_URL || 'http://localhost:8080/',
});

export default axios;
