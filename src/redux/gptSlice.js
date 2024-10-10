import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showAiSearch: false,
    movieResult: null,
    movieNames: null,
  },
  reducers: {
    toggleAiSearchView: (state) => {
      state.showAiSearch = !state.showAiSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResult } = action.payload;
      state.movieNames = movieNames;

      state.movieResult = movieResult;
    },
  },
});

export const { toggleAiSearchView, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;
