import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    author:[]
};

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    updateAuthor: (state, action) => {
      const {
        author=[]
      } = action.payload;
      state.author=author
    },
    resetAuthor: (state) => {
      state.author=[];
    },
  },
});
export const { resetAuthor,updateAuthor } = authorSlice.actions;
export default authorSlice.reducer;
