import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import configReducer from "./configSlice";
import gptReducer from "./gptSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
    // Add reducers here
    // In this reducer we have the different reducers with different slices
  },
});

export default appStore;
