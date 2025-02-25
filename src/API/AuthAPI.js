import axios from "axios";

const axiosIns = axios.create({
    baseURL: "https://expense-tracker-api-gi5q.onrender.com"
})

const authApi = {
    register: (user) => {
        return axiosIns.request({
            url: `/api/auth/register`,
            method: "POST",
            data : user
        })
    },
    login: (user) => {
        return axiosIns.request({
            url: `/api/auth/login`,
            method: "POST",
            data : user
        })
    },
    logout: () => {
        return axiosIns.request({
            url: `/api/auth/logout`,
            method: "GET",
        })
    },
    verify: (user) => {
        return axiosIns.request({
            url: `/api/auth/verify`,
            method: "GET",
            data : user
        })
    }
}

export default authApi