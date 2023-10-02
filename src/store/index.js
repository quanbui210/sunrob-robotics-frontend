import cartSlice from "./cart-slice";
import toggleSlice from "./toggle-slice";
import authSlice from "./auth-slice";

import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
  }
  
  
  
  const rootReducer = combineReducers({
      cart: cartSlice.reducer,
      toggle: toggleSlice.reducer,
      auth: authSlice.reducer
    })
    
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)
export default store
