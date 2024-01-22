import axios from "axios";
import { userData } from "../types/type";

export const post = (url : string, data : userData) => {
    axios.post(url, data)
    .then(res => res)
    .then(res => console.log(res))
}