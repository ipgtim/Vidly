import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "rest-auth/login/";
const tokenKey = "token";

http.setJWT(getJWT());

export async function login(username, password) {
  const { data: jwt } = await http.post(apiEndpoint, { username, password });
  console.log("yo", jwt);
  localStorage.setItem(tokenKey, jwt);
}

export async function loginWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt);
  console.log("yo2", jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null; // no current user
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
