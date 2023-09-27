import { PersonRemoveAlt1Outlined } from '@mui/icons-material';
import {createSlice} from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers:  {
        add(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title,
                    image: newItem.image
                });
            } else {
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
        },
        remove(state, action) {
          const id = action.payload
          const existingItem = state.items.find(item => item.id === id)
          state.totalQuantity-- 
          if (existingItem.quantity === 1) {
            state.items = state.items.filter(item => item.id !== id)
          } else {
            existingItem.quantity--
            existingItem.totalPrice = existingItem.totalPrice - existingItem.price
          }
        },
        removeOneItem(state, action) {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)
            state.items = state.items.filter(item => item.id !== id)
            state.totalQuantity = state.totalQuantity - existingItem.quantity
        },
        removeAllItems(state, action) {
            state.items = []
            state.totalQuantity = 0
        }
    } 
})

export const cartActions = cartSlice.actions
export default cartSlice