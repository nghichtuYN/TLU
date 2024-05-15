import { createSlice } from '@reduxjs/toolkit'
const initialState={
  search:'',
}
export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    searchBook: (state, action) => {
      state.search = action.payload
    },
    resetSearchBook: (state) => {
      state.search = "";
    },
  }
})

export const { searchBook ,resetSearchBook} = bookSlice.actions

export default bookSlice.reducer