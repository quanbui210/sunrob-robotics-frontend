import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    isLoading: false,
    isFailed: false,
    signUpSuccess: false,
    loginSuccess: false,
    isLoggedOut: true,
    userLoggedIn: {
        name: '',
        userId: '',
        role: '',
    }
}

const baseURL = '/api/v1'

const loginThunk = createAsyncThunk('auth/login', async (user) => {
    try {
        const response = await axios.post(`${baseURL}/auth/login`, user)
        console.log(response.data)
        return response.data
    } catch (e) {
        console.log(e)
    }   
})

const logoutThunk = createAsyncThunk('auth/logout', async () => {
    try {
        const response = await axios.get(`${baseURL}/auth/logout`)
        return response.data
    } catch(e) {
        console.log(e);
    }
})

const signupThunk = createAsyncThunk('auth/signup', async (user) => {
    try {
        const response = await axios.post(`${baseURL}/auth/signup`, user)
        console.log(response.data);
        return response.data
    } catch (e) {
        console.log(e);
    }
})

const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{ 
        builder.addCase(signupThunk.pending, (state)=> {
            state.isLoading =  true
        })
        builder.addCase(signupThunk.fulfilled, (state)=> {
            state.isLoading = false
            state.signUpSuccess = true
        })
        builder.addCase(signupThunk.rejected, (state) => {
            state.isFailed = true
            state.isLoading = false
        })
        builder.addCase(loginThunk.pending, (state)=> {
            state.isLoading =  true
        })
        builder.addCase(loginThunk.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isLoggedIn = true
            state.loginSuccess = true
            state.isLoggedOut = false
            const {user} = action.payload
            state.userLoggedIn = user
            console.log(state.userLoggedIn.role, state.userLoggedIn.role === 'Admin');
            if (state.userLoggedIn.role === 'Admin') {
                state.isAdmin = true
                console.log('ADMINNNN');
            } else {
                state.isAdmin = false
            }
            console.log(state.isAdmin);
            })
        builder.addCase(loginThunk.rejected, (state) => {
            state.isFailed = true
            state.isLoading = false
        })
        builder.addCase(logoutThunk.pending, (state)=> {
            state.isLoading = true
        })
        builder.addCase(logoutThunk.fulfilled, (state) => {
            state.isLoggedOut = true
            state.isLoggedIn = false
            state.signUpSuccess = false
            state.isAdmin = false
            state.loginSuccess = false
        })
    }
})

export const authActions = {...authSlice.actions, signupThunk, loginThunk, logoutThunk}
export default authSlice
