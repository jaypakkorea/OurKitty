import axios from 'axios';
import Swal from "sweetalert2";

//const baseURL = 'http://localhost:8088/api'
const baseURL = 'https://ourkitty.site/api';

// 일반 유저 관련
const baseAPI = (options?: any) => {
    return axios.create({ baseURL, ...options });
}

const commonUserErrorHandle = (error: any) => {
    const { status, message } = error.response.data!;
    if (status === 401) {
        Swal.fire(message, '', 'error')
    }
}

const commonAdminErrorHandle = (error: any) => {
    const { status, message } = error.response.data!;
    if (status === 401) {
        Swal.fire({
            title: '<br/>⚠️ 로그인 후 사용해주세요!<br/>',
            html: (
                `<a href='/user/login'> 로그인 하러가기 → </a>`
            ),
            confirmButtonText: '닫기',
        })
    }
}

const authAPI = (options?: any) => {
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            Authorization: token,
        },
        ...options
    });

    axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },

        function (error) {
            commonUserErrorHandle(error);
            return Promise.reject(error);
        }
    )


    return axiosInstance;
}

const authFormAPI = (options?: any) => {
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'multipart/form-data;',
            Authorization: token,
        },
        ...options
    });

    axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },

        function (error) {
            commonUserErrorHandle(error);
            return Promise.reject(error);
        }
    )


    return axiosInstance
}

const authApplicationFormAPI = (options?: any) => {
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;',
            Authorization: token,
        },
        ...options
    });

    axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },

        function (error) {
            commonUserErrorHandle(error);
            return Promise.reject(error);
        }
    )

    return axiosInstance
}

// Admin 관련 
const authAdminAPI = (options?: any) => {
    const token = localStorage.getItem("adminToken");

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            Authorization: token,
        },
        ...options
    });

    axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },

        function (error) {
            commonAdminErrorHandle(error);
            return Promise.reject(error);
        }
    )

    return axiosInstance
}

const authAdminFormAPI = () => {
    const token = localStorage.getItem("adminToken");

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: token,
        },
    });

    axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },

        function (error) {
            commonAdminErrorHandle(error);
            return Promise.reject(error);
        }
    )

    return axiosInstance
}

const authAdminMultipartFormAPI = () => {
    const token = localStorage.getItem("adminToken");


    const axiosInstance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
        },
    });

    axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },

        function (error) {
            commonAdminErrorHandle(error);
            return Promise.reject(error);
        }
    )

    return axiosInstance
}

export const baseInstance = baseAPI();
export const authInstance = authAPI();
export const authFormInstance = authFormAPI();

export const authAdminInstance = authAdminAPI();
export const authAdminFormInstance = authAdminFormAPI();
export const authAdminMultipartFormInstance = authAdminMultipartFormAPI();
