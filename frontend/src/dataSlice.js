import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import data from './mockData.json';
import axios from "axios"

export const getJsonData = createAsyncThunk("data/getJsonData",
async (thunkAPI) => {
    const path = process.env.REACT_APP_SCIENCE_LAB_WEB_SERVICE_API + 'measurements'
    const response = await axios.get(path);
    return response;
});

export const dataSlice = createSlice({
    name:'data',
    initialState: {
        selectedTime: new Date(),
        data: null,
        dataState: "idle"
    },
    reducers : {
        updateSelectedTime: (state, action) => {
            state.selectedTime = action.payload
        }
    },
    extraReducers: {
        [getJsonData.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.dataState = "loaded";
        },
        [getJsonData.pending]: (state, action) => {
            state.dataState = "pending";
        },
        [getJsonData.rejected]: (state, action) => {
            state.dataState = "rejected";
            state.data = data;
        }
    }
})

export const { updateSelectedTime } = dataSlice.actions

export default dataSlice.reducer