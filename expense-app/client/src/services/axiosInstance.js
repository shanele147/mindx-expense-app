/**
 * @return {object} - axiosInstance return the Config object {} for axios
 */
import axios from "axios";
import { BASE_URL } from "../config/domain";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default axiosInstance;
