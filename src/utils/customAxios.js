import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const customAxios = axios.create({
    baseURL: `${BASE_URL}/api/v1`,
});

export default customAxios;