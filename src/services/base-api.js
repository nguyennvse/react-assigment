import axios from "axios";

const baseUrl = "https://dummyjson.com/";

export const get = (url) => {
  return axios.get(`${baseUrl}${url}`).finally(()=>{});
};

export const post = (url) => {
  return axios.post(`${baseUrl}${url}`).finally(()=>{});
};

export const put = (url) => {
  return axios.put(`${baseUrl}${url}`).finally(()=>{});
};

const commonHanleRequest = () => {
  
}