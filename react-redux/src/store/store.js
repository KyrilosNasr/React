import { configureStore } from "@reduxjs/toolkit";
import authSlice, { initialAuthState } from "./auth-slice";
import counterSlice, { initialCounterState } from "./counter-slice";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
  preloadedState: {
    counter: initialCounterState,
    auth:initialAuthState
  }
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;
