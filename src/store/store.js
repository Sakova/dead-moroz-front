import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./registration/registrationSlice";
import userReducer from "./user/userSlice";
import childReducer from "./child/childSlice";
import elfReducer from "./elf/elfSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    registration: registrationReducer,
    child: childReducer,
    elf: elfReducer,
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
          "elf/fetchUsers/fulfilled",
          "elf/fetchCreateAssessment/fulfilled",
          "elf/fetchCreateFeedback/fulfilled",
          "elf/fetchTranslateProfile/fulfilled"
        ],
        ignoredActionPaths: [],
        ignoredPaths: ["child.popoverAnchorEl"],
      },
    }),
});
