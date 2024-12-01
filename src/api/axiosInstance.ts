import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 디버깅 할 떄 필요시 주석 해제하고 사용
    // console.log('--- Request Details ---');
    // console.log('URL:', config.url);
    // console.log('Method:', config.method);
    // console.log('Params:', config.params);
    // console.log('Data (Body):', config.data);
    // console.log('Headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('--- Request Error ---');
    console.error(error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('URL:', response.config.url, '\nData:', response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        'URL:',
        error.response.config?.url,
        '\nData:',
        error.response.data,
      );
    } else {
      console.error('Error Message:', error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
