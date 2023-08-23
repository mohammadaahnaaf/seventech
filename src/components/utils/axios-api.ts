import Axios from "axios";
import {axiosRoot} from "./axios-root";

const authTokenRefresh = async () => {
    try {
        const res = await axiosRoot.post("/auth/refresh-token", {
            refreshToken: localStorage.getItem("refresh_token"),
        });

        const { access_token, refresh_token } = res.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
    } catch (err) {
        console.log(err);
    }
};

export const axiosAPI = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosAPI.interceptors.request.use(function (config: any) {
    const token = localStorage.getItem('access_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
}, function (error: any) {
    return Promise.reject(error);
});

axiosAPI.interceptors.response.use(
    (res: any) => res,
    async (err: any) => {
        const originalRequest = err.config;

        if (err.response.status === 401 && !originalRequest._retry) {
            await authTokenRefresh();
            originalRequest._retry = true;
            return axiosAPI(originalRequest);
        }

        return Promise.reject(err);
    }
);