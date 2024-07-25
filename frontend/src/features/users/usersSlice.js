import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

// Thunks for async actions
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (formData) => {
  const response = await axiosInstance.post('/users', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const editUser = createAsyncThunk('users/editUser', async ({ id, formData }) => {
  const response = await axiosInstance.put(`/users/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axiosInstance.delete(`/users/${id}`);
  return id;
});

export const loginUser = createAsyncThunk('users/loginUser', async ({ username, password }) => {
  const response = await axios.post('http://localhost:5000/users/login', { username, password });
  const { token } = response.data;
  localStorage.setItem('token', token); // Store token in local storage
  return response.data;
});

// Slice
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
    loggedInUser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload.user;
      });
  },
});

export default usersSlice.reducer;
