import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    ismenuOpen: false,
    selectedCategory: "Home",
    videoCategory: "",
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
  },
});

export const { toggleMenu, selectCategory, setVideoCategory } =
  appSlice.actions;

export default appSlice.reducer;
