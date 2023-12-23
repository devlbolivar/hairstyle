import { createSlice } from "@reduxjs/toolkit";

const userInfoLocalStorate = localStorage.getItem("userInfo");
const userInfoParse = userInfoLocalStorate
  ? JSON.parse(userInfoLocalStorate)
  : null;

const initialState = {
  userInfo: userInfoParse,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
