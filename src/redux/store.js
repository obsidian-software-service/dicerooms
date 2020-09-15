import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import modalReducer from "./modalSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
  },
});
