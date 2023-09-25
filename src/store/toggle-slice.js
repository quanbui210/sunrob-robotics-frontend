import {createSlice} from '@reduxjs/toolkit'


const toggleSlice = createSlice({
    name: 'toggleSlice',
    initialState: {
        show: false,
        isSignup: true,
        isLogin: false
    },
    reducers: {
        show: (state)=> {
            state.show = true;
        },
        hide: (state)=> {
            state.show = false;
        },
        isSignupAction: (state) => {
            state.isSignup = true
            state.isLogin = false
        },
        isLogin: (state) => {
            state.isSignup = false
            state.isLogin = true
        }
    }
})

export const toggleActions = toggleSlice.actions
export default toggleSlice