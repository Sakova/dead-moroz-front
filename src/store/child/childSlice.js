import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchChildGifts, fetchCreateGift } from "./childApi";

export const getChildGiftsAsync = createAsyncThunk(
  "child/fetchChildGifts",
  async (page) => {
    const response = await fetchChildGifts(page);
    return response;
  }
);

export const createChildGiftAsync = createAsyncThunk(
  "child/fetchCreateGift",
  async (data) => {
    const response = await fetchCreateGift(data);
    return response;
  }
);

const LOADING = "loading";
const IDLE = "idle";

const initialState = {
  gifts: [],
  isModelOpen: false,
  status: IDLE,
  currentPage: 1,
};

export const childSlice = createSlice({
  name: "child",
  initialState,
  reducers: {
    setModel: (state) => {
      state.isModelOpen = state.isModelOpen ? false : true;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChildGiftsAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(getChildGiftsAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        state.gifts = action.payload.data;
      })
      .addCase(createChildGiftAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(createChildGiftAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        let gift = action.payload?.data;
        if (gift && gift.total_pages === state.currentPage)
          state.gifts.push(gift);
      });
  },
});

export const { setModel, setCurrentPage } = childSlice.actions;

export const selectChildGifts = (state) => state.child.gifts;
export const selectIsModelOpen = (state) => state.child.isModelOpen;
export const selectStatus = (state) => state.child.status;

export default childSlice.reducer;
