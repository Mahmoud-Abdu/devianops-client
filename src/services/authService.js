import axios from "axios";
import jwtDecode from "jwt-decode";
 
const registerUrl = "http://localhost:5000/api/users";
const loginUrl = "http://localhost:5000/api/login";

export const register = async (user) => {
  return axios.post(registerUrl, user);
};

export const login = async (user) => {
  try {
    const response = await axios.post(loginUrl, user);
    const { data: token } = response;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.log("error", error);
  }
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const user = jwtDecode(token);
    console.log("use ", user);
    return user;
  } else return "";
};

export const logout = () => {
  localStorage.removeItem("token");
};
