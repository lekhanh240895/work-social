import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  worksList: [
    {
      id: 1,
      userID: 1,
      date: "2022-12-16",
      workCount: 1,
      status: "This is a hard day",
      attachments: [],
      startTime: "07:00",
      endTime: "15:00",
      selected: true,
    },
    {
      id: 2,
      userID: 1,
      date: "2022-12-20",
      workCount: 2,
      status: "This is another hard working day",
      attachments: [],
      startTime: "14:00",
      endTime: "22:00",
      selected: true,
    },
    {
      id: 3,
      userID: 1,
      date: "2022-12-25",
      workCount: 0,
      status: "This is another hard working day",
      attachments: [],
      startTime: "6:00",
      endTime: "14:00",
      selected: true,
    },
    {
      id: 4,
      userID: 1,
      date: "2022-12-13",
      workCount: 0.5,
      status: "This is another hard working day",
      attachments: [],
      startTime: "6:00",
      endTime: "14:00",
      selected: true,
    },
    {
      id: 5,
      userID: 1,
      date: "2022-12-31",
      workCount: 1.5,
      status: "",
      attachments: [],
      startTime: "14:00",
      endTime: "22:00",
      selected: true,
    },
  ],
};

export const counterSlice = createSlice({
  name: "works",
  initialState,
  reducers: {
    setWorksList: (state, action) => {
      state.worksList = action.payload;
    },
    addWork: (state, action) => {
      state.worksList.push(action.payload);
    },
    updateWork: (state, action) => {
      const workIndex = state.worksList.findIndex(
        (w) => w.id === action.payload.id
      );
      state.worksList[workIndex] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWorksList, addWork, updateWork } = counterSlice.actions;

export default counterSlice.reducer;
