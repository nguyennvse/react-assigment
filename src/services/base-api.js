import axios from "axios";

const baseUrl = "https://dummyjson.com/";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-Type": "application/json",
  },
});
export const get = (url) => {
  return axios.get(`${baseUrl}${url}`);
};

export const post = (url) => {
  return axios.post(`${baseUrl}${url}`);
};

export const put = (url) => {
  return axios.put(`${baseUrl}${url}`);
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("authenToken");
    if (token) {
      config.headers["x-access-token"] = token;
    }
    console.log('config',config);
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalConfig = error.config;
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true
      const refreshToken = window.localStorage.getItem("refreshToken");
      const username = window.localStorage.getItem("username");
      // config.headers["x-access-token"] = refreshToken;
      const res = await axiosInstance.post("/users/token", {username, refreshToken });
      window.localStorage.setItem("authenToken", res.data.token);
      return axiosInstance(originalConfig);
    }
  }
);
