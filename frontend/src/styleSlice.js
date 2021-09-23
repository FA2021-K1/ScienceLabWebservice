import { createSlice } from '@reduxjs/toolkit';
import { styles } from './style';

export const styleSlice = createSlice({
    name:'style',
    initialState: styles,
    reducers : {},
})

export default styleSlice.reducer