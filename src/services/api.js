import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://backend-z7o8.onrender.com'
})