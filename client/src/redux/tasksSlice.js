import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, task }) => {
    const response = await axios.patch(`${API_URL}/${id}`, task);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
