import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8081/api/",
    withCredentials: true,
});

export const getData = () =>
    instance
        .get("udp/sensor")  
        .then((response) => response.data);

export const uploadBoard = (variables) =>
    instance.post(`posts/new`, variables, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.data);