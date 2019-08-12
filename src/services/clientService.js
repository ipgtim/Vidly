import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "clients/";

function clientUrl(clientId) {
  return `${apiEndpoint}${clientId}`;
}

export function getClients() {
  return http.get(apiEndpoint);
}

export function getClient(clientId) {
  return http.get(clientUrl(clientId));
}

export function saveClient(client) {
  if (client.id) {
    const body = { ...client };
    delete body.id;
    return http.put(clientUrl(client.id), body);
  }
  // else dealing w/new client:
  return http.post(apiEndpoint, client);
}

export function deleteClient(clientId) {
  return http.delete(clientUrl(clientId));
}
