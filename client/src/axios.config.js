import Axios from 'axios';

const axios = Axios.create({
  baseURL:
    process.env.RAILWAY_STATIC_URL === 'development' ? 'localhost:8000' : '',
  responseType: 'json',
});

export default axios;
