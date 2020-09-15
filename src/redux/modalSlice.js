import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    open: false,
    step: "",
  },
  reducers: {
    openModal: (state, action) => {
      state.step = action.payload;
      state.open = true;
    },
    hideModal: (state) => {
      state.open = false;
    },
  },
});

export const { openModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
