import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

// 동시에 401 요청시 대기큐로 처리
const processQueue = (error, token = null) => {
  if (token) {
    console.log('[🔁 Queue] AccessToken 발급 완료. 대기 중이던 요청들을 재실행합니다.');
  } else {
    console.log('[⛔️ Queue] AccessToken 발급 실패. 대기 중이던 요청들을 모두 거절합니다.');
  }

  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// 요청 전에 accessToken 헤더에 설정
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`[📤 Request] 액세스 토큰 추가됨: ${token}`);
    } else {
      console.log('[📤 Request] 액세스 토큰 없음 (비로그인 상태일 수 있음)');
    }
    return config;
  },
  error => {
    console.log('[❌ Request Error]', error);
    return Promise.reject(error);
  }
);

// 응답 에러 처리
axiosInstance.interceptors.response.use(
  response => {
    console.log(`[✅ Response] 요청 성공: ${response.config.url}`);
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      console.log(`[⚠️ 401 Unauthorized] ${originalRequest.url} 요청에서 토큰 만료 감지됨`);

      if (isRefreshing) {
        console.log('[⏳ Waiting] 이미 토큰 재발급 중. 큐에 요청 추가');
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: token => {
              console.log('[🔁 Retry] 대기 중이던 요청 재시도');
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              resolve(axiosInstance(originalRequest));
            },
            reject: err => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      console.log('[🔄 Refreshing] 새로운 accessToken 발급 시도');

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/login/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data?.data;
        console.log(`[✅ Success] 새로운 accessToken 발급됨: ${newAccessToken}`);

        localStorage.setItem('accessToken', newAccessToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        console.log(`[🔁 Retry] 원래 요청 재시도: ${originalRequest.url}`);
        return axiosInstance(originalRequest);
      } catch (err) {
        alert("재발급 실패");
        console.log('[❌ Refresh Failed] accessToken 재발급 실패. 로그인 페이지로 이동');
        processQueue(err, null);
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    console.log(`[❌ Response Error] ${error.config?.url || 'Unknown URL'} 요청 실패`, error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
