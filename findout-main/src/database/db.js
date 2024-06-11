import axios from "axios";

const apiFecth = axios.create({
    baseURL: "https://localhost:7290/swagger/index.html",
    responseType: "json",
});

export default apiFecth;