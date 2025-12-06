// =====================================================
// axiosInstance.ts
// =====================================================

import axios from "axios";

import { getAccessToken,getRefreshToken,setTokens,logoutUser} from "./authUtils";


const API_BASE = "http://localhost:8000";



const axiosInstance = axios.create({
  baseURL: API_BASE,

});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;

  },

  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired?
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = getRefreshToken();
      if (!refresh) {
        logoutUser();
        window.location.href = "/sign-in";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/account/api/token/refresh/`,
          { refresh }
        );

        setTokens(res.data.access, refresh);
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

        return axiosInstance(originalRequest);
      } catch (e) {
        logoutUser();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

