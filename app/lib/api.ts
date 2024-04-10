import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
    baseURL: `http://localhost:3000`,
    withCredentials: true,
    timeout: 3000,
});

const handleTokenError = async (err: AxiosError) => {
    try {
        await fetch("/api/refresh_token");
        return axiosInstance.request(err.config as AxiosRequestConfig<any>);
    } catch (e) {
        return Promise.reject(err);
    }
};

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            console.log(error);
            return handleTokenError(error);
        }
        return Promise.reject(error);
    }
);
