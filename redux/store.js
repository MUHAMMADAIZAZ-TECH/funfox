import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import tasksReducer from './features/tasksSlice';
import taskReducer from './features/taskSlice';
import authReducer from "./features/authSlice";

const makeStore = () => configureStore({
    reducer: {
        tasks: tasksReducer,
        task: taskReducer,
        auth: authReducer,
    },
    devtools: true
})


export const wrapper = createWrapper(makeStore)
