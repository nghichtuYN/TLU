import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./Slice/MemberSlice";  
export const store = configureStore({
  reducer: {
    member: memberReducer
  },
});
