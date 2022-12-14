import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchCreateUser,
  fetchLogIn,
  fetchLogOut,
  fetchLogInWithToken,
  fetchUpdateUser,
  fetchCreateAddress,
} from "./userAPI";

const LOADING = "loading";
const IDLE = "idle";

const initialState = {
  auth_token: null,
  data: {
    id: null,
    email: null,
    avatar: null,
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
  async () => {
    const response = await fetchLogOut();
    return response.data;
  }
);

export const logInUserWithTokenAsync = createAsyncThunk(
  "user/fetchLogInWithToken",
  async (token) => {
    const response = await fetchLogInWithToken(token);
    return response;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/fetchUpdateUser",
  async (data) => {
    const response = await fetchUpdateUser(data);
    return response;
  }
);

export const updateAddressAsync = createAsyncThunk(
  "user/fetchCreateAddress",
  async (data) => {
    const response = await fetchCreateAddress(data);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getRandomAvatar: (state) => {
      const value = Math.floor(Math.random() * 100);
      state.data.avatar = `https://avatars.dicebear.com/api/big-smile/${value}.svg?mood[]=happy`;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.data = action.payload?.data;
        state.auth_token = action.payload?.headers.authorization;
        localStorage.setItem("auth_token", state.auth_token);
      })
      .addCase(logInUserAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(logInUserAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.data = action.payload?.data;
        state.auth_token = action.payload?.headers.authorization;
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
        if (action.payload === undefined) {
          state.auth_token = initialState.auth_token;
          localStorage.removeItem("auth_token");
        } else {
          state.data = action.payload?.data;
          state.auth_token = localStorage.getItem("auth_token");
        }
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.data = action.payload.data;
      })
      .addCase(updateAddressAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateAddressAsync.fulfilled, (state) => {
        state.status = IDLE;
      });
  },
});

export const { getRandomAvatar } = userSlice.actions;

export const selectAuthToken = (state) => state.user?.auth_token;
export const selectUserEmail = (state) => state.user?.email;
export const selectUserID = (state) => state.user?.id;
export const selectUser = (state) => state.user?.data;
export const selectUserRole = (state) => state.user?.data?.role;
export const selectProfileItems = (state) => state.user?.data?.items;
export const isLoggedOut = (state) => {
  return state.user.auth_token == null;
};
export const selectAvatar = (state) => state.user?.data?.avatar;
export const selectStatus = (state) => state.user?.status;

export default userSlice.reducer;
