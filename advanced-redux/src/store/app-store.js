import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: {
        uiReducer: uiSlice.reducer,
        cartReducer: cartSlice.reducer
    },
    
})

export default store;