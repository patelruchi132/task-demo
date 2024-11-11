import axios from "axios";
const axiosApi = axios.create({
  baseURL:" https://api.coincap.io/v2",
});

axiosApi.interceptors.response.use(
  (response) => {

    return response.data;

  },
  (error) => {

    return Promise.reject(error);

  }
);
const makeRequest = (method, url, config = {}) => {
  let requestConfig = {
    ...config,
    method,
    url,
  };
  return axiosApi(requestConfig);
};
export const get = (url, config = {}) => makeRequest("get", url, config);
export const post = (url, config = {}) => makeRequest("post", url, config);
export const patch = (url, config = {}) => makeRequest("patch", url, config);
export const del = (url, config = {}) => makeRequest("delete", url, config);