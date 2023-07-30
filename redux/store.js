import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import tasksReducer from './features/tasksSlice';
import taskReducer from './features/taskSlice';
import authReducer from "./Slicers/Authentication/AuthenticationSlice";
import userReducer from "./Slicers/UserSlicer/UserSlicer";

const makeStore = () => configureStore({
    reducer: {
        tasks: tasksReducer,
        task: taskReducer,
        auth: authReducer,
        user: userReducer,
    },
    devtools: true
})


export const wrapper = createWrapper(makeStore)
