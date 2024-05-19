import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fullName: "",
  email: "",
  access_token: "",
  userName: "",
  id: "",
  isAdmin: false,
  mobileNumber:"",
  password:''
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
        username = "",
        id = "",
        isAdmin,
        mobileNumber="",
        password=""
      } = action.payload;
      console.log(action.payload)
      state.fullName = fullName;
      state.email = email;
      state.access_token = access_token;
      state.id = id;
      state.userName = username;
      state.isAdmin = isAdmin;
      state.mobileNumber=mobileNumber
      state.password=password
    },
    resetMember: (state) => {
      state.fullName = "";
      state.adminEmail = "";
      state.access_token = "";
      state.id = "";
      state.userName = "";
      state.isAdmin = false;
      state.mobileNumber="";
      state.password=""
    },
  },
});
export const { updateMember,resetMember } = memberSlice.actions;
export default memberSlice.reducer;
