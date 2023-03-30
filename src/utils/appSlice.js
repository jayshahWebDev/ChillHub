import { createSlice } from "@reduxjs/toolkit";

let category = "Home";
if (window.location.href.includes("history")) category = "History";
if (window.location.href.includes("watchLater")) category = "Watch Later";

const appSlice = createSlice({
  name: "app",
  initialState: {
    ismenuOpen: false,
    selectedCategory: category,
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
