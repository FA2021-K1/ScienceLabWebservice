import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
    name:'data',
    initialState: {
        currentTime: new Date(),
        data: null,
        dataState: "idle"
    },
    reducers : {
        updateCurrentTime: (state, action) => {
            state.currentTime = action.payload
        }
    }
})

export const { updateCurrentTime } = dataSlice.actions

export default dataSlice.reducer