import { createSlice } from "@reduxjs/toolkit";

export const initialAuthState = {
    isAuthenticated: false,
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
      login(state) {
        state.isAuthenticated = true;
        console.log('test');
      },
      logout(state) {
        state.isAuthenticated = false;
        console.log('test 2');
      },
    },
  });

  export default authSlice