import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchCreateUser,
  fetchLogIn,
  fetchLogOut,
  fetchLogInWithToken,
} from "./userAPI";

const LOADING = "loading";
const IDLE = "idle";

const initialState = {
  auth_token: null,
  data: {
    id: null,
    email: null,
  },
  status: IDLE,
};

export const registerUserAsync = createAsyncThunk(
  "user/fetchRegisterUser",
  async (data) => {
    const response = await fetchCreateUser(data);
    return response;
  }
);

export const logInUserAsync = createAsyncThunk(
  "user/fetchLogIn",
  async (data) => {
    const response = await fetchLogIn(data);
    return response;
  }
);

export const logOutUserAsync = createAsyncThunk(
  "user/fetchLogOut",
  async (state) => {
    const response = await fetchLogOut(state);
    return response.data;
  }
);

export const logInUserWithTokenAsync = createAsyncThunk(
  "user/fetchLogInWithToken",
  async (token) => {
    const response = await fetchLogInWithToken(token);
    // The value we return becomes the `fulfilled` action payload
    console.log(response);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.data = action.payload.data.user;
        state.auth_token = action.payload.headers.authorization;
        localStorage.setItem("auth_token", state.auth_token);
      })
      .addCase(logInUserAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(logInUserAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.data = action.payload.data.user;
        state.auth_token = action.payload.headers.authorization;
        localStorage.setItem("auth_token", state.auth_token);
      })
      .addCase(logOutUserAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(logOutUserAsync.fulfilled, (state) => {
        state.data = initialState.data;
        state.auth_token = initialState.auth_token;
        localStorage.removeItem("auth_token");
      })
      .addCase(logInUserWithTokenAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(logInUserWithTokenAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.data = action.payload.data;
        state.auth_token = localStorage.getItem("auth_token");
      });
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;

export const selectAuthToken = (state) => state.auth_token;
export const selectUserEmail = (state) => state.user.email;
export const selectUserID = (state) => state.user?.id;
export const isLoggedIn = (state) => {
  const loggedOut =
    state.auth_token == null || state.auth_token === JSON.stringify(null);
  return !loggedOut;
};

export default userSlice.reducer;
