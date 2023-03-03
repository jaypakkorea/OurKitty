import axios from 'axios';

const baseURL = 'https://ourkitty.site/api';
//const baseURL = 'http://localhost:8088/api';
//const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNjQ1NTU3Njg5IiwicHJvdmlkZXIiOiJrYWthbyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc1MzIwMjI4LCJleHAiOjE2NzU0MDY2Mjh9.csb7UPcsEs24x-YwQeavUdqx5LKulasMofHOBlImq3c';


const adminAuthAPI = (options?: any) => {
    const token = localStorage.getItem("adminToken");

    return axios.create({
        baseURL,
        headers: {
            Authorization: token,
        },
        ...options
    });
}

const adminAuthFormAPI = (options?: any) => {
    const token = localStorage.getItem("adminToken");

    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'multipart/form-data;',
            Authorization: token,
        },
        ...options
    });
}

const adminAuthApplicationFormAPI = (options?: any) => {
    const token = localStorage.getItem("adminToken");

    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        ...options
    });
}

export const adminAuthInstance = adminAuthAPI();
export const adminAuthFormInstance = adminAuthFormAPI();
export const adminAuthAppFormInstance = adminAuthApplicationFormAPI();
