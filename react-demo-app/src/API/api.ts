import axios from "axios";
import { Task } from "../helper/types";
import { base_url } from "../helper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface TasksState {
    tasks: Task[];
    error?: string;
}

const initState: TasksState = {
    tasks: [],
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const res = await axios.get(base_url)
    return res.data
})


export const createTasks = createAsyncThunk('tasks/createTasks', async (data: any, {dispatch}) => {
    const res = await axios.post(base_url, data)
    dispatch(fetchTasks())
    return res.data
})

export const updateTasks = createAsyncThunk('tasks/updateTasks', async ({id,data}: {
    id: string;
    data: any
}, {dispatch}) => {
    const res = await axios.put(`${base_url}/${id}`, data)
    dispatch(fetchTasks())
    return res.data
})

export const deleteTasks = createAsyncThunk('tasks/deleteTasks', async (id: string, {dispatch}) => {
  await  axios.delete(`${base_url}/${id}`)
   dispatch(fetchTasks())
})

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action.payload
        })
    }
})

export default tasksSlice.reducer