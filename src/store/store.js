import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./registration/registrationSlice";
import userReducer from "./user/userSlice";
import childReducer from "./child/childSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    registration: registrationReducer,
    child: childReducer,
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
          "user/fetchCreateAddress/fulfilled",
          "child/fetchCreateGift/pending",
          "child/fetchCreateGift/fulfilled",
          "child/fetchChildGifts/fulfilled",
          "child/setPopoverAnchorEl",
          "child/fetchUpdateGift/pending",
          "child/fetchUpdateGift/fulfilled",
        ],
        ignoredActionPaths: [],
        ignoredPaths: ["child.popoverAnchorEl"],
      },
    }),
});
