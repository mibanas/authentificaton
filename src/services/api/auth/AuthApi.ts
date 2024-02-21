import { FormData } from "@/src/interfaces/auth/userInterface";
import axios from "axios";

export const login = async (authData: FormData) => {

    const response = await axios.post("http://localhost:3030/auth/login", authData);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", JSON.stringify(response.data.role));
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
};

export const logout = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  } catch (error) {
    throw error
  }
}

export const register = async (authData: any) => {
  try {
    const response = await axios.post("http://localhost:3030/users", authData);
    return response.data;
  } catch (error) {
    throw error
  }
};
