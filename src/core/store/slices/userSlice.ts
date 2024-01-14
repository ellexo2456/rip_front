import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const Role = { USER: 1, ADMIN: 2};

export interface IUser {
  userName: string;
  isAuth: boolean;
  expeditionId: string;
  role: number;
}

const initialState: IUser = {
  userName: "",
  isAuth: false,
  expeditionId: "",
  role: 0,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    refreshUser: (state) => {
      state.isAuth = false;
      state.expeditionId = "";
      state.userName = "";
      state.role = 0;
    },
    saveUser: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      if (action.payload) state.isAuth = true;
    },
    saveUserRole: (state, action: PayloadAction<number>) => {
      state.role = action.payload;
      // if (action.payload) state.isAuth = true;
    },
    saveAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logoutUser: (state) => {
      state.userName = "";
      state.isAuth = false;
      state.expeditionId = "";
      state.role = 0;
    },
    saveExpedition: (state, action: PayloadAction<string>) => {
      state.expeditionId = action.payload;
    },
  },
});

export const { saveUser, logoutUser, saveExpedition, saveAuth, refreshUser, saveUserRole } =
  userSlice.actions;
