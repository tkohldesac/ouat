import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4444';
axios.defaults.withCredentials = true;

export default axios;