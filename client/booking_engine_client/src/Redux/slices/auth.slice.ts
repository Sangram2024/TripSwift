"use client";

import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";
import { AuthState, User } from "../states/auth.state";
import axios from "axios";
import { store } from "../store";

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
    setUser(
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.user>
    ) {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAccessToken, logout, setUser } = authSlice.actions;

export const login =
  (data: { email: string; password: string }) =>
  async (dispatch: typeof store.dispatch) => {
    const res = await axios.post("http://localhost:8020/api/v1/auth/login", {
      ...data,
    });

    dispatch(setAccessToken(res.data.data?.accessToken));
    dispatch(getUser());
    console.log(res.data.data.accessToken, "access token");
  };

export const getUser =
  () =>
  async (dispatch: typeof store.dispatch, getState: typeof store.getState) => {
    const { accessToken } = getState().authReducer;
    const res = await axios.get("http://localhost:8020/api/v1/user/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    dispatch(setUser(res?.data?.data?.user));
    console.log(res?.data?.data?.user, "user");
  };

export default authSlice.reducer;
