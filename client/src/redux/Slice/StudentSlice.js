import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    student:[]
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    updateStudent: (state, action) => {
      const {
        student=[]
      } = action.payload;
      state.student=student
    },
    resetStudent: (state) => {
      state.student=[];
    },
  },
});
export const { resetStudent,updateStudent } = studentSlice.actions;
export default studentSlice.reducer;
