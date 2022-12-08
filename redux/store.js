import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import worksReducer from "./slices/worksSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    works: worksReducer,
  },
});
