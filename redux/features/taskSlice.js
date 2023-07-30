import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";


const baseUri = "http://localhost:3000";

const getroken = () =>{
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        return token;
      }
}
const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getroken()}`
}
// Create Task
export const createTask = createAsyncThunk("task/createTask", async (data) => {
    try {
     
        const response = await axios.post(`${baseUri}/api/tasks`, data, { headers });
        return response.data;
    } catch (error) {
        console.log(error.response.data);
    }
});

// Read Task
export const readTask = createAsyncThunk(
    "task/readTask",
    async ({ id, req }) => {
        try {
            const response = await axios.get(`${baseUri}/api/tasks/${id}`,{ headers});
            return response.data;
        } catch (error) {
            console.log(error.response.data);
        }
    }
);

// Update Task
export const updateTask = createAsyncThunk(
    "task/updateTask",
    async ({ id, data }) => {
        try {
            const response = await axios.put(`${baseUri}/api/tasks/${id}`, data, { headers });
            return response.data;
        } catch (error) {
            console.log(error.response.data);
        }
    }
);

// Delete Task
export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
    try {
        const response = await axios.delete(`${baseUri}/api/tasks/${id}`,{ headers });
        return response.data;
    } catch (error) {
        console.log(error.response.data);
    }
});


const taskSlice = createSlice({
    name: "task",
    initialState: {
        task: {},
        loading: null,
        success: null,
        message: null,
        open: false
    },
    reducers: {
        hideTaskMessage: (state) => {
            state.open = false;
            state.message = null;
          },
    },
    extraReducers: {
        [HYDRATE]: (state, { payload }) => {
            return {
                ...state,
                ...payload.task,
            };
        },
        [createTask.pending]: (state) => {
            state.loading = true;
        },
        [createTask.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.task = payload.task;
            state.success = true;
            state.open = true;
            state.message = payload.message;
        },
        [createTask.rejected]: (state, { payload }) => {
            state.loading = false;
            state.message = payload;
        },
        [readTask.pending]: (state) => {
            state.loading = true;
        },
        [readTask.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.task = payload.task;
            state.success = true;
        },
        [readTask.rejected]: (state, { payload }) => {
            state.loading = false;
            state.message = payload;
        },
        [updateTask.pending]: (state) => {
            state.loading = true;
        },
        [updateTask.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.task = payload.task;
            state.success = true;
            state.open = true;
            state.message = payload.message;
        },
        [updateTask.rejected]: (state, { payload }) => {
            state.loading = false;
            state.message = payload;
        },
        [deleteTask.pending]: (state) => {
            state.loading = true;
        },
        [deleteTask.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = payload;
            state.open = true;
            state.message = payload.message;
        },
        [deleteTask.rejected]: (state, { payload }) => {
            state.loading = false;
            state.message = payload;
        }
    },
});
export const { hideTaskMessage } = taskSlice.actions;
export default taskSlice.reducer;
