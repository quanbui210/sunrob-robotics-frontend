import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const baseURL = '/api/v1'
const createOrderThunk = createAsyncThunk('order/create', async (order) => {
    try {
        const response = await axios.post(`${baseURL}/orders`, order)
        const newOrder = await response.data
        return newOrder
    } catch (e) {
        
    }
})
const showUserOrder = createAsyncThunk('order/showOrder', async() => {
    try {
        const response = await axios.get(`${baseURL}/orders/showOrders`)
        const orders = await response.data
        return orders
    } catch (e) {
        
    }
})
const createReview = createAsyncThunk('order/review', async(review, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${baseURL}/reviews`, review)
        const newReview = await response.data
        return newReview
    } catch(e) {
        return rejectWithValue(e.reponse?.data || 'Your have already reviewed this product')

    }
})
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        orderError: false,
        pending: false,
        newOrder: {},
        myOrders: [],
        reviewFailed: false,
        reviewError: ''
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
        toggleError(state) {
            state.reviewFailed = false
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
    },
    extraReducers: (builder) => {
        builder.addCase(createOrderThunk.pending, state => {
            state.pending = true
        }) 
        builder.addCase(createOrderThunk.fulfilled, (state, action) => {
            state.pending = false
            state.newOrder = action.payload
        })
        builder.addCase(createOrderThunk.rejected, state => {
            state.orderError = true
        })
        builder.addCase(showUserOrder.fulfilled, (state,action) => {
            state.myOrders = action.payload.reverse()
            state.reviewFailed = false
        })
        builder.addCase(createReview.rejected, (state, action) => {
            state.reviewFailed = true
            state.reviewError = action.payload
        })
        } 
})

export const cartActions = {...cartSlice.actions, createOrderThunk, showUserOrder, createReview}
export default cartSlice