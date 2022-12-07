import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDay: {},
};

export const counterSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showWorkModal, hideWorkModal, setSelectedDay } =
  counterSlice.actions;

export default counterSlice.reducer;
