import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    open: false,
    type: "",
  },
  reducers: {
    openModal: (state, action) => {
      state.type = action.payload.modalType;
      state.content = action.payload.content;
      state.open = true;
    },
    hideModal: (state) => {
      state.open = false;
    },
  },
});

export const { openModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
