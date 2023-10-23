import axios from "axios"
const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        "accept-language": "en",
      },
});
instance.interceptors.request.use(function (config) {
    if (localStorage.getItem("token") !== undefined || localStorage.getItem("token") !== null) {
        config.headers["authorization"] = localStorage.getItem("token");
      }
    return config;
}, function (error) {
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
})

export default instance;