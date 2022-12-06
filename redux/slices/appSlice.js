import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workModalShowed: false,
  selectedDay: null,
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
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showWorkModal, hideWorkModal, setSelectedDay } =
  counterSlice.actions;

export default counterSlice.reducer;
