import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // unexpected error
  if (!expectedError) {
    logger.log(error);
    toast.error("an unexpected error occurred.");
  }

  return Promise.reject(error); // also handles expected errors
  // whenever we have response w/ error, this func will be caleld; then control will pass to our catch block below
}); // first func will be called if success, second will be called if error

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
