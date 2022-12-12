import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./registration/registrationSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    registration: registrationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "user/fetchLogInWithToken/fulfilled",
          "user/fetchLogIn/fulfilled",
          "user/fetchRegisterUser/fulfilled",
          "user/fetchUpdateUser/fulfilled",
          "user/fetchUpdateUser/pending",
        ],
        ignoredActionPaths: [],
        ignoredPaths: [],
      },
    }),
});
