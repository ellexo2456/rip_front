import axios, { isAxiosError } from "axios";
import { responseBody } from "..";
import { IGetALpinistsResponse, IGetALpinistsByIdResponse } from "./typing";
import { logout } from "../auth";
import { store } from "../../store";
import { saveExpedition, saveUser } from "../../store/slices/userSlice";

export const alpinistApi = axios.create({
  baseURL: "/api/",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

alpinistApi.interceptors.response.use(
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

export const getAlpinists = async (serachName?: string) => {
  try {
    const response: IGetALpinistsResponse = responseBody(
      await alpinistApi.get("/", {
        params: serachName ? { country: serachName } : undefined,
      })
    );
    console.log("core alpinists", response);

    const userName = response.user.ID ? response.user.email : "";
    const expId =
      response.draft.id ? String(response.draft.id) : "";
    store.dispatch(saveUser(userName));
    store.dispatch(saveExpedition(expId));

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(
        "error message: ",
        error.response?.data.message || error.message
      );
    } else {
      console.log("unexpected error: ", error);
    }
    throw error;
  }
};

export const getAlpinistById = async (id: string) => {
  try {
    const response: IGetALpinistsByIdResponse = responseBody(
      await alpinistApi.get(`/alpinist/${id}`)
    );
    console.log("core alpinist by id", response);
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(
        "error message: ",
        error.response?.data.message || error.message
      );
    } else {
      console.log("unexpected error: ", error);
    }
    throw error;
  }
};

export const deleteAlpinistFromExpById = async (id: number) => {
  try {
    await alpinistApi.delete(`/alpinist/expedition/${id}`);
    console.log("core delete alpinist From Exp by id");
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(
        "error message: ",
        error.response?.data.message || error.message
      );
    } else {
      console.log("unexpected error: ", error);
    }
    throw error;
  }
};

export const deleteExpeditionById = async (id: number) => {
  try {
    await alpinistApi.delete(`/expedition/${id}`);
    console.log("core delete Exp by id");
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(
        "error message: ",
        error.response?.data.message || error.message
      );
    } else {
      console.log("unexpected error: ", error);
    }
    throw error;
  }
};