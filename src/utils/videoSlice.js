import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videoHistory: [],
    watchLaterVideo: [],
  },
  reducers: {
    addVideoInHistory: (state, action) => {
      if (state?.videoHistory?.length <= 0) {
        state.videoHistory.push(action.payload);
        return;
      }
      for (let i = 0; i < state.videoHistory.length; i++) {
        if (state.videoHistory[i].id == action?.payload?.id) {
          state.videoHistory.splice(i, 1);
          state.videoHistory.unshift(action.payload);
          return;
        }
      }
      state.videoHistory.unshift(action.payload);
    },
    addVideoInWatchLater: (state, action) => {
      state.watchLaterVideo.push(action.payload);
    },
    removeVideoFromWatchLater: (state, action) => {
      state.watchLaterVideo = state.watchLaterVideo.filter(
        (video) => video.id != action.payload
      );
    },
  },
});

export const {
  addVideoInHistory,
  addVideoInWatchLater,
  removeVideoFromWatchLater,
} = videoSlice.actions;

export default videoSlice.reducer;
