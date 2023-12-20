import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { store } from "../store";

const initialState = {
  accessToken: "",
  isAuthenticated: false,
  authLoading: "",
  user: {},
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAccessToken(
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.accessToken>
    ) {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    removeAccessToken(state: Draft<typeof initialState>) {
      state.accessToken = "";
      state.isAuthenticated = false;
    },
    setUser(
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.user>
    ) {
      state.user = action.payload;
    },
  },
});

export const { setAccessToken, removeAccessToken, setUser } = authSlice.actions;

export const login =
  (data: { email: string; password: string }) =>
  async (dispatch: typeof store.dispatch) => {
    const res = await axios.post("http://localhost:8020/api/v1/auth/login", {
      ...data,
    });

    dispatch(setAccessToken(res.data.data?.accessToken));
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
  };

export default authSlice.reducer;
