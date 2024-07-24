import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('http://localhost:5000/posts');
  console.log(response.data);
  return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error adding post:', err);
    return rejectWithValue(err.response.data);
  }
});

export const editPost = createAsyncThunk('posts/editPost', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`http://localhost:5000/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error editing post:', err);
    return rejectWithValue(err.response.data);
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:5000/posts/${id}`);
    return id;
  } catch (err) {
    console.error('Error deleting post:', err);
    return rejectWithValue(err.response.data);
  }
});

// Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
