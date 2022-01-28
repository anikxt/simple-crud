import axios from 'axios';

const baseURL = process.env.REACT_APP_RAILWAY_STATIC_URL;

console.log('BASEURL: -> ', baseURL);

const axiosInstance = axios.create({
  baseURL: baseURL === 'development' ? 'localhost:8000' : '',
  responseType: 'json',
});

export default axiosInstance;
