/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { isAxiosError } from "axios";
import { IUserAuthData } from "./typing";
import * as bcrypt from "bcryptjs";
import { store } from "../../store";
import { refreshUser, saveAuth } from "../../store/slices/userSlice";
import { addNotification, refreshApp } from "../../store/slices/appSlice";

const authApi = axios.create({
  baseURL: "/api/auth",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

const hashPassword = async (password: string): Promise<number[]> => {
  const saltRounds = 5; // уровень сложности хэширования
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const passwordArray = hashedPassword
    .split("")
    .map((char) => char.charCodeAt(0));

  return passwordArray;
};

export const loginUser = async (userData: IUserAuthData) => {
  try {
    const hashedPassword = await hashPassword(userData.password);
    await authApi.post("/login", {
      ...userData,
      password: hashedPassword,
    });
    localStorage.setItem("userName", userData.email);
    store.dispatch(saveAuth(true));
  } catch (error) {
    if (isAxiosError(error)) {
      store.dispatch(
        addNotification({
          message: error.response?.data.message || error.message,
          isError: true,
        })
      );
    }
    console.log("unexpected error: ", error);
    throw error;
  }
};

export const registerUser = async (userData: IUserAuthData) => {
  try {
    const hashedPassword = await hashPassword(userData.password);
    await authApi.post("/register", {
      ...userData,
      password: hashedPassword,
    });
    localStorage.setItem("userName", userData.email);
    store.dispatch(saveAuth(true));
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error message: ", error.message);
    } else {
      console.log("unexpected error: ", error);
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    await authApi.post("/logout");
    store.dispatch(refreshApp());
    store.dispatch(refreshUser());
    localStorage.removeItem("userName");
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error message: ", error.message);
    } else {
      console.log("unexpected error: ", error);
    }
    throw error;
  }
};
