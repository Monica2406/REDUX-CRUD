import axios from "axios";

// Instance of axios
const axiosIns = axios.create({
    baseURL: "https://expense-tracker-api-gi5q.onrender.com",
    headers: {
        Authorization: sessionStorage.getItem("token")
    }
});

// API property
const ExpenseApi = {
    readAll: () => {
        return axiosIns.request({
            method: "GET",
            url: `/api/transaction/all`,
        });
    },
    create: (transaction) => {
        return axiosIns.request({
            method: "POST",
            url: `/api/transaction/add`,
            data: transaction,
        });
    },
    readSingle: (id) => { // Fixed typo from "readSinge" to "readSingle"
        return axiosIns.request({
            method: "GET",
            url: `/api/transaction/single/${id}`,
        });
    },
    update: ({ id, transaction }) => {
        return axiosIns.request({
            method: "PATCH",
            url: `/api/transaction/update/${id}`,
            data: transaction,
        });
    },
    delete: (id) => {
        return axiosIns.request({
            method: "DELETE",
            url: `/api/transaction/delete/${id}`,
        });
    },
};

export default ExpenseApi;
