// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    loadUser: (state, action) => {
      return action.payload;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
