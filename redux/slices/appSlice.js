import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workModalShowed: false,
};

export const counterSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showWorkModal: (state, action) => {
      state.workModalShowed = true;
    },
    hideWorkModal: (state, action) => {
      state.workModalShowed = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showWorkModal, hideWorkModal } = counterSlice.actions;

export default counterSlice.reducer;
