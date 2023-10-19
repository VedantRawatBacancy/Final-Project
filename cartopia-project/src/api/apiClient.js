import axios from "axios"
const instance = axios.create({
    baseURL: 'http://localhost:3000/api'
});
axios.interceptors.request.use(function (config) {
    if (localStorage.getItem("token") !== undefined || localStorage.getItem("token") !== null) {
        config.headers["authorization"] = localStorage.getItem("token");
      }
      console.log(config)
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
})

instance.defaults.headers.common['Authorization'] = localStorage.getItem('token');
instance.defaults.headers.common['accept-language'] = 'en';
export default instance;