import axios from 'axios';
import Cookies from "js-cookie";
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER}`
const token= Cookies.get("access_token")
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
export default axios;