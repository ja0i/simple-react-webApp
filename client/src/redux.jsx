import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await fetch('/data');
  return res.json();
});

export const fetchPost = createAsyncThunk('post/fetchPost', async (postId) => {
  const res = await fetch(`/data/${postId}`);
  return res.json();
});

// Posts slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    currentPost: null,
    status: 'idle',
    error: null
  },
  reducers: {
    searchPosts: (state, action) => {
      const term = action.payload.toLowerCase();
      state.items = state.items.filter(post => 
        post.title.toLowerCase().includes(term) ||
        post.body.toLowerCase().includes(term)
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      });
  }
});

// Configure store
export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer
  }
});

export const { searchPosts } = postsSlice.actions;

