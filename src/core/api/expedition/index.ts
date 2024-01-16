/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, {isAxiosError} from "axios";
import {responseBody} from "..";
import {store} from "../../store";
import {saveAuth} from "../../store/slices/userSlice";
import {
    IChangeExp,
    IGetExpeditionByIdResponse,
    IGetExpeditionsResponse,
} from "./typing";
import {logout} from "../auth";

export const expApi = axios.create({
    baseURL: "/api/expedition",
    headers: {"Content-Type": "application/json", Accept: "application/json"},
});

expApi.interceptors.response.use(
    (response) => {
        const regex = new RegExp(`(^| )${"session_token"}=([^;]+)`);
        const match = document.cookie.match(regex);
        if (match) {
            store.dispatch(saveAuth(true));
        }
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            logout();
        }
        return Promise.reject(error);
    }
);

export const getExpeditions = async () => {
    try {
        const response: IGetExpeditionsResponse = responseBody(
            await expApi.get("/filter")
        );
        console.log("core exp", response);
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
        // throw error;
    }
};

export const getExpeditionsWithFilters = async (startDate: string, endDate: string, status: string) => {
    try {
        const response: IGetExpeditionsResponse = responseBody(
            await expApi.get("/filter", {
                params: {
                    startTime: startDate,
                    endTime: endDate,
                    status: status,
                }
            })
        );
        console.log("core exp", response);
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

export const changeExpModerStatus = async (id: number, status: string) => {
    try {
        await expApi.put(`/${id}/status`, {
            status: status,
        })
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


export const getExpeditionById = async (id: string) => {
    try {
        const response: IGetExpeditionByIdResponse = responseBody(
            await expApi.get(`/${id}`)
        );
        console.log("core exp by id", response);
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

export const changeExpeditionById = async (body: IChangeExp) => {
    try {
        await expApi.put("", body);
        console.log("core change exp");
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
