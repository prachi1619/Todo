
import axios from "axios";
import Auth from "./auth";

const API_URL = "https://todoserver-s269.onrender.com/api/v1";

export const login = async (user) => {
  try {
    const {data,status} = await axios.post(`${API_URL}/signin`, user);
    if (status === 200) {
      Auth.saveAuthorizationToken(data.data.token);
    }
    return data;
  } catch (err) {
    console.error(err, "err");
  }
};

export const signup = async (user) => {
  try {
    const data = await axios.post(`${API_URL}/signup`, user);
    return data;
   } catch (err) {
    console.error(err, "err");
  }
};
