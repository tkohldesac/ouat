import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "https://ouata-server.vercel.app/" : 'http://localhost:4444';
axios.defaults.withCredentials = true;

export default axios;