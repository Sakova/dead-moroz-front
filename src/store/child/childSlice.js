import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchChildGifts,
  fetchCreateGift,
  fetchDeleteGift,
  fetchUpdateGift,
} from "./childApi";

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

export const updateChildGiftAsync = createAsyncThunk(
  "child/fetchUpdateGift",
  async (data) => {
    const response = await fetchUpdateGift(data);
    return response;
  }
);

export const deleteChildGiftAsync = createAsyncThunk(
  "child/fetchDeleteGift",
  async (giftId) => {
    const response = await fetchDeleteGift(giftId);
    return response;
  }
);

const LOADING = "loading";
const IDLE = "idle";

const initialState = {
  gifts: [],
  isModelOpen: false,
  popoverAnchorEl: null,
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
    setPopoverAnchorEl: (state, action) => {
      state.popoverAnchorEl = action.payload;
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
        const gift = action.payload?.data;
        if (gift && gift.total_pages === state.currentPage)
          state.gifts.push(gift);
      })
      .addCase(updateChildGiftAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(updateChildGiftAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        const fetchGift = action.payload.data;
        state.gifts = state.gifts.map((gift) =>
          gift.id === fetchGift.id ? fetchGift : gift
        );
      })
      .addCase(deleteChildGiftAsync.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(deleteChildGiftAsync.fulfilled, (state, action) => {
        state.status = IDLE;
        const giftId = action.payload.giftId;
        state.gifts = state.gifts.filter((gift) => gift.id !== giftId);
      });
  },
});

export const { setModel, setCurrentPage, setPopoverAnchorEl } =
  childSlice.actions;

export const selectChildGifts = (state) => state.child.gifts;
export const selectIsModelOpen = (state) => state.child.isModelOpen;
export const selectPopoverAnchorEl = (state) => state.child.popoverAnchorEl;
export const selectStatus = (state) => state.child.status;
export const selectCurrentPage = (state) => state.child.currentPage;

export default childSlice.reducer;
