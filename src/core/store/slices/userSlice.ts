import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  userName: string;
  isAuth: boolean;
  expeditionId: string;
}

const initialState: IUser = {
  userName: "",
  isAuth: false,
  expeditionId: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    refreshUser: (state) => {
      state.isAuth = false;
      state.expeditionId = "";
      state.userName = "";
    },
    saveUser: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      if (action.payload) state.isAuth = true;
    },
    saveAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logoutUser: (state) => {
      state.userName = "";
      state.isAuth = false;
      state.expeditionId = "";
    },
    saveExpedition: (state, action: PayloadAction<string>) => {
      state.expeditionId = action.payload;
    },
  },
});

export const { saveUser, logoutUser, saveExpedition, saveAuth, refreshUser } =
  userSlice.actions;
