import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for async actions
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:5000/users');
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (formData) => {
  const response = await axios.post('http://localhost:5000/users', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const editUser = createAsyncThunk('users/editUser', async ({ id, formData }) => {
  const response = await axios.put(`http://localhost:5000/users/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`http://localhost:5000/users/${id}`);
  return id;
});

// Slice
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
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
      });
  },
});

export default usersSlice.reducer;
