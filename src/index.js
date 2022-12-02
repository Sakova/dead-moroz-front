import React from "react";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store/store";
import { logInUserWithTokenAsync } from "./store/user/userSlice";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

let localAuthToken = localStorage.auth_token;
let cookieExists = localAuthToken !== "undefined" && localAuthToken !== null;
if (cookieExists) {
  const auth_token = localStorage.getItem("auth_token");
  const authTokenExists = auth_token !== "undefined" && localAuthToken !== null;
  if (authTokenExists) {
    store.dispatch(logInUserWithTokenAsync(auth_token));
  }
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
