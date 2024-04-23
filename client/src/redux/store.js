import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Slice/CounterSlice";
import memberReducer from "./Slice/MemberSlice";
import bookReducer from "./Slice/BookSlice";
import authorReducer from "./Slice/AuthorSlice";
import categoryReducer from "./Slice/CategorySlice";
import studentReducer from "./Slice/StudentSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    member: memberReducer,
    author: authorReducer,
    book: bookReducer,
    category: categoryReducer,
    student: studentReducer,
  },
});
