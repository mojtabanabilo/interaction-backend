import axios from "axios";
import { userData } from "../types/type";

export const post = (
  url: string,
  data: userData,
  setError?: Function,
  setData?: Function
) => {
  axios
    .post(url, data)
    .then((res) => {
      setData && setData(res);
      console.log(res);
    })
    .catch((er) => {
      setError && setError(er);
    });
};
