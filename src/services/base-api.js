import axios from "axios";

const baseUrl = "https://dummyjson.com/";

export const get = (url) => {
  return axios.get(`${baseUrl}${url}`);
};

export const post = (url) => {
  return axios.post(`${baseUrl}${url}`);
};

export const put = (url) => {
  return axios.put(`${baseUrl}${url}`);
};

const commonHanleRequest = () => {
  
}