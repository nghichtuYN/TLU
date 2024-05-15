import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./Slice/MemberSlice";
import bookReducer from "./Slice/BookSlice";
export const store = configureStore({
  reducer: {
    member: memberReducer,
    book: bookReducer,
  },
});
