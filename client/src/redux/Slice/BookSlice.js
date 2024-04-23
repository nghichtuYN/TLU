import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    book:[]
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    updateBook: (state, action) => {
      const {
        book=[]
      } = action.payload;
      state.book=book
    },
    resetBook: (state) => {
      state.book=[];
    },
  },
});
export const { resetBook,updateBook } = bookSlice.actions;
export default bookSlice.reducer;
