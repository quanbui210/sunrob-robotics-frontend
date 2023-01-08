import {createSlice} from '@reduxjs/toolkit'


const toggleSlice = createSlice({
    name: 'toggleSlice',
    initialState: {
        show: false,
    },
    reducers: {
        show: (state)=> {
            state.show = true;
        },
        hide: (state)=> {
            state.show = false;
        }
    }
})

export const toggleActions = toggleSlice.actions
export default toggleSlice