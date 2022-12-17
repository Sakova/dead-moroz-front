import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Root from "./pages/root.page";
import ErrorPage from "./pages/error.page";
import AuthPage from "./pages/authentication";
import { SignIn } from "./pages/authentication/sign-in.page";
import { SignUp } from "./pages/authentication/sign-up.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [{}],
  },
  {
    path: "sign-in",
    element: <AuthPage />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
    ],
  },
  {
    path: "sign-up",
    element: <AuthPage />,
    children: [
      {
        index: true,
        element: <SignUp />,
      },
    ],
  },
]);
