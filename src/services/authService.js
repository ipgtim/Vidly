import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "rest-auth/login/";
const tokenKey = "token";

http.setJWT(getJWT());

export async function login(username, password) {
  const { data } = await http.post(apiEndpoint, { username, password });
  const { token: jwt } = data;
  console.log("login jwt yo!", jwt);
  localStorage.setItem(tokenKey, jwt);
}

export async function loginWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt);
  console.log("loginwithjwt", jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    // solves issue of anonymous user
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null; // no current user (anonymous user)
  }
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJWT,
  logout,
  getCurrentUser,
  getJWT
};
