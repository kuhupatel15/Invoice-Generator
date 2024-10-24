import axios from "axios";
// import { backendUri } from "./BackendUri";

const baseUrl = axios.create({
  baseURL: 'http://localhost:5000',
});

export default baseUrl;