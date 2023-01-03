import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Root from "./pages/root.page";
import ErrorPage from "./pages/error.page";
import GiftsPage from "./pages/child/gifts.page";
import ProfilePage from "./pages/child/profile.page";
import AuthPage from "./pages/authentication";
import { SignIn } from "./pages/authentication/sign-in.page";
import { SignUp } from "./pages/authentication/sign-up.page";
import ElfPage from "./pages/elf/elf.page";
import ChildPage from "./pages/elf/child.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "child-gifts",
        element: <GiftsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "elf-page",
        element: <ElfPage />,
      },
      {
        path: "child-page",
        element: <ChildPage />,
      },
    ],
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
