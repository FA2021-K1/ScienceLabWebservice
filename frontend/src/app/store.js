import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../dataSlice"
import styleReducer from "../styleSlice"
import sidebarReducer from "../sidebarSlice"

export default configureStore({
    reducer:{
        data: dataReducer,
        style: styleReducer,
        sidebar: sidebarReducer
    }
})
