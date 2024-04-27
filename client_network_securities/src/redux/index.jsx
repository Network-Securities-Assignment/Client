import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/slice'
import userReducer from './user/slice'
import groupReducer from './group/slice'
import historyReducer from './history/slice'

const store = configureStore({
    reducer:{
        auth: authReducer,
        user: userReducer,
        group: groupReducer,
        history: historyReducer
    }
})

export default store