import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    category:[]
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateCategory: (state, action) => {
      const {
        category=[]
      } = action.payload;
      state.category=category
    },
    resetCategory: (state) => {
      state.category=[];
    },
  },
});
export const { resetCategory,updateCategory } = categorySlice.actions;
export default categorySlice.reducer;
