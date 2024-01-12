import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../types";

const userInfoLocalStorate = localStorage.getItem("userInfo");
const userInfoParse: UserInfo = userInfoLocalStorate
  ? JSON.parse(userInfoLocalStorate)
  : null;

const initialState = {
  userInfo: userInfoParse,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState as { userInfo: UserInfo | null },
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
