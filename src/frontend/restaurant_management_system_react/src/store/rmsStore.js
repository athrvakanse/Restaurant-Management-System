// src/store/rmsStore.js
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const rmsStore = configureStore({
  reducer: {
    loggedInUser: userSlice.reducer,
  },
});

export default rmsStore;
