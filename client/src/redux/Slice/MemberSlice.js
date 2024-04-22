import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fullName: "",
  email: "",
  access_token: "",
  userName: "",
  id: "",
  isAdmin: false,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    updateMember: (state, action) => {
      const {
        fullName = "",
        email = "",
        access_token = "",
        userName = "",
        id = "",
        isAdmin,
      } = action.payload;
      state.fullName = fullName;
      state.email = email;
      state.access_token = access_token;
      state.id = id;
      state.userName = userName;
      state.isAdmin = isAdmin;
    },
    resetMember: (state) => {
      state.fullName = "";
      state.adminEmail = "";
      state.access_token = "";
      state.id = "";
      state.userName = "";
      state.isAdmin = false;
    },
  },
});
export const { updateMember,resetMember } = memberSlice.actions;
export default memberSlice.reducer;
