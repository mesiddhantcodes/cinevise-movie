import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    // Add reducers here
    // In this reducer we have the different reducers with different slices
  },
});

export default appStore;
