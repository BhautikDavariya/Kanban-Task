import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from './api'

const rootReducer = configureStore({
    reducer: {
        tasks: tasksReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        thunk:{
            extraArgument: {}
        }
    }) as any
})

export default rootReducer