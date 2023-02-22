import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import toggleSlice from "./toggle-slice";
const cartFromStorage = localStorage.getItem('cart')
const initialCartState = { items: cartFromStorage ? JSON.parse(cartFromStorage) : [] }
const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        toggle: toggleSlice.reducer
    },
    // preloadedState: {
    //     cart: initialCartState
    // }
})

export default store