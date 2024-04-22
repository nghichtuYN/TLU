import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    totalBook: 0
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    updateBook: (state, action) => {
      const {
        totalBook=0
      } = action.payload;
      state.totalBook=totalBook
    },
    resetBook: (state) => {
      state.totalBook="";
    },
  },
});
export const { resetBook,updateBook } = bookSlice.actions;
export default bookSlice.reducer;
