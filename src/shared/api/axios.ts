import axios from 'axios';

const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000/api/v1';

const clientApi = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
    // Set Accept here, as it doesn't rely on localStorage
    'Accept': 'application/json',
  },
});

// Use the request interceptor to safely attach the token
clientApi.interceptors.request.use((config) => {
  // Check if we are in a browser environment
  if (typeof window !== 'undefined' && localStorage.getItem('access_token')) {
    const token = localStorage.getItem('access_token');
    
    // Add the Authorization header to the request configuration
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default clientApi;


export const authAPI = {
  getUser: async () => {
    const response = await clientApi.get('/user');
    return response.data;
  },
  logout: async () => {
    const response = await clientApi.post('/logout');
    return response.data;
  },
};
// import axios from 'axios';


// const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000/api/v1';

// const clientApi = axios.create({
//   baseURL: backendUrl,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// clientApi.defaults.headers.common["Accept"] = 'application/json';

// clientApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('access_token') || ''}`;

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

// export default clientApi;