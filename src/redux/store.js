import { configureStore, createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("authUser"));

const authSlice = createSlice({
  name: "auth",
  initialState: savedUser || { isAuthenticated: false, user: null },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("authUser", JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("authUser");
    },
  },
});

export const { login, logout } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
