import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 0,
  photo: false,
  items: [],
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    increaseStep: (state) => {
      state.step += 1;
    },
    photoPresent: (state) => {
      state.photo = true;
    },
    addItem: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    deleteItem: (state, action) => {
      state.items = [
        ...state.items.filter((_, index) => index !== action.payload),
      ];
    },
  },
});

export const { increaseStep, photoPresent, addItem, deleteItem } =
  registrationSlice.actions;

export const selectStep = (state) => state.registration.step;
export const selectPhoto = (state) => state.registration.photo;
export const selectItems = (state) => state.registration.items;

export default registrationSlice.reducer;
