import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import {
  getRandomAvatar,
  logInUserWithTokenAsync,
} from "./store/user/userSlice";
import { store } from "./store/store";
import { router } from "./App";

import "./assets/index.css";

let localAuthToken = localStorage.auth_token;
let cookieExists = localAuthToken !== undefined && localAuthToken !== null;
if (cookieExists) {
  const authToken = localStorage.getItem("auth_token");
  const authTokenExists = authToken !== "undefined" && localAuthToken !== null;
  if (authTokenExists) {
    store.dispatch(logInUserWithTokenAsync(authToken)).then((res) => {
      if (res.payload === undefined) {
        window.location.href = "/sign-in";
      } else if (!res.payload.data.avatar) {
        store.dispatch(getRandomAvatar());
      }
    });
  }
} else if (
  window.location.pathname !== "/sign-in" &&
  window.location.pathname !== "/sign-up"
) {
  window.location.href = "/sign-in";
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
