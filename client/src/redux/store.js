import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Slice/CounterSlice";
import memberReducer from "./Slice/MemberSlice";
import bookReducer from "./Slice/BookSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    member: memberReducer,
    book: bookReducer,
  },
});
