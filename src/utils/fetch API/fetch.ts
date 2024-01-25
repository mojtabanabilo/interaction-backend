import axios from "axios";
import { userData } from "../types/type";

export const post = (url: string, data: userData, setStateErr?: Function, statusCode?: Function) => {
    axios.post(url, data)
    .then(res => {
        statusCode && statusCode(res.status)
        console.log(res);
    })
    .catch(er => {
        setStateErr && setStateErr(er)
    })
}