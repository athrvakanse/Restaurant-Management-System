// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,  // changed from [] to null

  reducers: {
    loadUser: (state, action) => {
      return action.payload; // setting user data
    },

    logoutUser: () => {
      return null; // resetting state on logout
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
