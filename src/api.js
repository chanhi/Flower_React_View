import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
//---------------react-query를 이용한 api 파일--------------------
const instance = axios.create({
    baseURL: "http://localhost:8081/api/",
    withCredentials: true,
});

export const getData = () => instance.get("udp/sensor").then((response) => response.data);

export const getActuator = (type) => {
    instance.get(`udp/${type}`).then((response)=>response.data);
} 
    

export const getScreenShot = () => instance.get("udp/screenshot").then((response)=>response.data);

export const uploadBoard = (variables) => {
    instance.post(`posts/new`, variables, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => response.data);
}