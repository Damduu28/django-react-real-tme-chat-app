import axios from 'axios';
import { API_URL } from './config';
import { jwtDecode } from 'jwt-decode';
// import { memoizedRefreshToken } from '../features/auth/authService'
import dayjs from 'dayjs'
import { memoizedRefreshToken } from '../features/auth/authService';


const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('chatAuthToken') ? JSON.parse(localStorage.getItem('chatAuthToken')).access : null}`,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});


axiosInstance.interceptors.request.use(
  async config => {
    let tokens = localStorage.getItem('chatAuthToken') ? JSON.parse(localStorage.getItem('chatAuthToken')) : null
    if (tokens) {
      config.headers.Authorization = `Bearer ${tokens?.access}`
    }

    const user = jwtDecode(tokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return config

    const newTokens = memoizedRefreshToken()
    config.headers.Authorization = `Bearer ${newTokens.access}`
    return config
  },
  error => {
    return Promise.reject(error);
  }
)

// axiosInstance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     const config = error?.config;
//     if (error?.response?.status === 401 && !config._retry && !config.sent) {
//       config._retry = true;
//       config.sent = true;

//       try {
//         const tokens = await memoizedRefreshToken();

//         if (tokens?.access) {
//           config.headers = {
//             ...config.headers,
//             Authorization: `Bearer ${tokens?.access}`
//           };

//         }
//         return axiosInstance(config);
//       } catch (refreshError) {
//         console.error('Error refreshing token:', refreshError);
//         window.location.pathname = "/login"
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;


