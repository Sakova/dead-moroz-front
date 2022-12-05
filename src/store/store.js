import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "user/fetchLogInWithToken/fulfilled",
          "user/fetchLogIn/fulfilled",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: [],
        // Ignore these paths in the state
        ignoredPaths: [],
      },
    }),
});
