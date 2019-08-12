import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "rest-auth/registration/";

export function register(user) {
  console.log({
    email: user.username,
    password1: user.password,
    password2: user.password,
    username: user.username
  });
  return http.post(apiEndpoint, {
    email: user.username,
    password1: user.password,
    password2: user.password,
    username: user.username
  });
}
