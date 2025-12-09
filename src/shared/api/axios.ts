import axios from 'axios';


const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000/api/v1';

const clientApi = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

clientApi.defaults.headers.common["Accept"] = 'application/json';

clientApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('access_token')}`;

// clientApi.interceptors.request.use((config => {
//   const token = localStorage.getItem('access_token');
//   if (token) {
//     config.headers = {
//       ...config.headers,
//       'Authorization': `Bearer ${token}`,
//     };
//   }
//   return config;
// }), error => {
//   return Promise.reject(error);
// });

export default clientApi;