// src/store/authSlice.ts

import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { AuthState, User } from "../states/auth.state";
import axios from "axios";

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (
      state,
      action: PayloadAction<typeof initialState.accessToken>
    ) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAccessToken, logout } = authSlice.actions;

export const login = async () => {
  const res = await axios.post("http://localhost:8020/api/v1/auth/login", {
    email: "<EMAIL>",
    password: "<PASSWORD>",
  });
  console.log(res);
};

export default authSlice.reducer;
