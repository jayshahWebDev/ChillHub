import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    ismenuOpen: false,
    selectedCategory: "Home",
    videoCategory: "",
    pageToken: null,
  },
  reducers: {
    toggleMenu: (state) => {
      state.ismenuOpen = !state.ismenuOpen;
    },
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setVideoCategory: (state, action) => {
      state.videoCategory = action.payload;
    },
    setNextPageToken: (state, action) => {
      state.pageToken = action.payload;
    },
  },
});

export const {
  toggleMenu,
  selectCategory,
  setVideoCategory,
  setNextPageToken,
} = appSlice.actions;

export default appSlice.reducer;
