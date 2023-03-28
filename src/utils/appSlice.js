import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    ismenuOpen: false,
    selectedCategory: "Home",
    videoCategory: "0",
    isMobileSearchBarOpen: false,
    showMore: false,
    showComment: false,
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
    toggleMobileSearchBar: (state) => {
      state.isMobileSearchBarOpen = !state.isMobileSearchBarOpen;
    },
    toggleShowMore: (state) => {
      state.showMore = !state.showMore;
    },
    toggleShowComment: (state) => {
      state.showComment = !state.showComment;
    },
  },
});

export const {
  toggleMenu,
  selectCategory,
  setVideoCategory,
  toggleMobileSearchBar,
  toggleShowMore,
  toggleShowComment,
} = appSlice.actions;

export default appSlice.reducer;
