import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../dataSlice"
import styleReducer from "../styleSlice"

export default configureStore({
    reducer:{
        data: dataReducer,
        style: styleReducer
    }
})
