import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    caching: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});

export const { caching } = searchSlice.actions;
export default searchSlice.reducer;
