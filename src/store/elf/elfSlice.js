import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchUsers,
  fetchCreateAssessment,
  fetchUpdateAssessment,
  fetchCreateFeedback,
  fetchUpdateFeedback,
  fetchTranslateProfile,
} from "./elfApi";

export const getUsersAsync = createAsyncThunk(
  "elf/fetchUsers",
  async (page) => {
    const response = await fetchUsers(page);
    return response;
  }
);

export const createAssessmentAsync = createAsyncThunk(
  "elf/fetchCreateAssessment",
  async (details) => {
    const response = await fetchCreateAssessment(details);
    return response;
  }
);

export const updateAssessmentAsync = createAsyncThunk(
  "elf/fetchUpdateAssessment",
  async (details) => {
    const response = await fetchUpdateAssessment(details);
    return response;
  }
);

export const createFeedbackAsync = createAsyncThunk(
  "elf/fetchCreateFeedback",
  async (details) => {
    const response = await fetchCreateFeedback(details);
    return response;
  }
);

export const updateFeedbackAsync = createAsyncThunk(
  "elf/fetchUpdateFeedback",
  async (details) => {
    const response = await fetchUpdateFeedback(details);
    return response;
  }
);

export const translateProfileAsync = createAsyncThunk(
  "elf/fetchTranslateProfile",
  async (details) => {
    const response = await fetchTranslateProfile(details);
    return response;
  }
);

const LOADING = "loading";
const IDLE = "idle";

const initialState = {
  users: [],
  chosenUser: null,
  chosenUserIndex: null,
  status: IDLE,
};

export const elfSlice = createSlice({
  name: "elf",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.chosenUser = state.users[action.payload];
      state.chosenUserIndex = action.payload;
    },
    cancelTranslation: (state) => {
      state.chosenUser = state.users[state.chosenUserIndex];
    },
    addCreatedGift: (state, aciton) => {
      state.chosenUser.gifts.push(aciton.payload);
    },
    removeDeletedGift: (state, action) => {
      const giftId = action.payload.giftId;
      state.chosenUser.gifts = state.chosenUser.gifts.filter(
        (gift) => gift.id !== giftId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.users = action.payload.data;
      })
      .addCase(createAssessmentAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(createAssessmentAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.chosenUser.assessments[0] = action.payload.data;
      })
      .addCase(updateAssessmentAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateAssessmentAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.chosenUser.assessments[0] = action.payload.data;
      })
      .addCase(createFeedbackAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(createFeedbackAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.chosenUser.feedbacks[0] = action.payload.data;
      })
      .addCase(updateFeedbackAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateFeedbackAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.chosenUser.feedbacks[0] = action.payload.data;
      })
      .addCase(translateProfileAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(translateProfileAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.chosenUser.items = action.payload.data.items;

        const gifts = action.payload.data.gifts;
        const translatedGifts = state.chosenUser.gifts.map((gift, index) => {
          gift.description = gifts[index];
          return gift;
        });
        state.chosenUser.gifts = translatedGifts;
      });
  },
});

export const { setUser, cancelTranslation, addCreatedGift, removeDeletedGift } =
  elfSlice.actions;

export const selectUsers = (state) => state.elf.users;
export const selectChosenUser = (state) => state.elf.chosenUser;
export const selectChosenUserItems = (state) => state.elf.chosenUser?.items;
export const selectChosenUserGifts = (state) => state.elf.chosenUser?.gifts;
export const selectElfStatus = (state) => state.elf.status;

export default elfSlice.reducer;
