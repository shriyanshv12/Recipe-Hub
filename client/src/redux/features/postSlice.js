import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createPost = createAsyncThunk(
    "post/createPost",
    async ({ updatedPostData, navigate, toast }, { rejectWithValue }) => {
      try {
        const response = await api.createPost(updatedPostData);
        toast.success("Recipe Added Successfully");
        navigate("/");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const getPosts = createAsyncThunk(
    "post/getPosts",
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.getPosts();
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  export const getPost = createAsyncThunk(
    "post/getPost",
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.getPost(id);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const getPostsByUser = createAsyncThunk(
    "post/getPostsByUser",
    async (userId, { rejectWithValue }) => {
      try {
        const response = await api.getPostsByUser(userId);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const deletePost = createAsyncThunk(
    "post/deletePost",
    async ({ id, toast }, { rejectWithValue }) => {
      try {
        const response = await api.deletePost(id);
        toast.success("Recipe Deleted Successfully");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const updatePost = createAsyncThunk(
    "post/updatePost",
    async ({ id, updatedPostData, toast, navigate }, { rejectWithValue }) => {
      try {
        const response = await api.updatePost(updatedPostData, id);
        toast.success("Recipe Updated Successfully");
        navigate("/");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  const postSlice = createSlice({
    name: "post",
    initialState: {
      post: {},
      posts: [],
      userPosts: [],
      error: "",
      loading: false,
    },
    reducers: {
        POST_RECEIVED(state, action) {
          state.post = action.payload;
        },
      },
        extraReducers: (builder) => {
            builder.addCase(createPost.pending, (state, action) => {
              state.loading = true;
            });
            builder.addCase(createPost.fulfilled, (state, action) => {
              state.loading = false;
              state.post = action.payload;
            });
            builder.addCase(createPost.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload.message;
            });
            builder.addCase(getPosts.pending, (state, action) => {
                state.loading = true;
              });
              builder.addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
              });
              builder.addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
              });
              builder.addCase(getPost.pending, (state, action) => {
                state.loading = true;
              });
              builder.addCase(getPost.fulfilled, (state, action) => {
                state.loading = false;
                state.post = action.payload;
              });
              builder.addCase(getPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
              });
              builder.addCase(getPostsByUser.pending, (state, action) => {
                state.loading = true;
              });
              builder.addCase(getPostsByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userPosts = action.payload;
              });
              builder.addCase(getPostsByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
              });
              builder.addCase(deletePost.pending, (state, action) => {
                state.loading = true;
              });
              builder.addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                const {
                  arg: { id },
                } = action.meta;
                if (id) {
                  state.userPosts = state.userPosts.filter((item) => item._id !== id);
                  state.posts = state.posts.filter((item) => item._id !== id);
                }
              });
              builder.addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
              });

            }
        }
    );
    export default postSlice.reducer;