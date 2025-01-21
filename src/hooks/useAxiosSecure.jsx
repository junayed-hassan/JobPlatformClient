import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxios = () => {
  const { logOut } = useAuth();

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.status);

      if (error.status === 403 || error.status === 401) {
        logOut();
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxios;
