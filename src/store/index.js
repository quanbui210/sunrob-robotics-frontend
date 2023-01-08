import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import toggleSlice from "./toggle-slice";
const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        toggle: toggleSlice.reducer
    }
})

export default store