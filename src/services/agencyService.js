import http from "./httpService";
import { apiUrl } from "../config.json";

export function getAgencies() {
  return http.get(apiUrl + "agencies/");
}
