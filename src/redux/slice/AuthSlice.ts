// store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Register user thunk
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Call the API endpoint to register the user and handle the response
      // Replace with your actual API call
    //   const response = await yourApi.register(userData);

      // Handle the success case and return the user data
    //   return response.data;
    } catch (error) {
      // Handle the error case and pass the error message to the rejectWithValue function
    //   return rejectWithValue(error.response.data);
    }
  }
);

// Login user thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Call the API endpoint to login the user and handle the response
      // Replace with your actual API call
    //   const response = await yourApi.login(userData);

      // Handle the success case and return the user data
    //   return response.data;
    } catch (error:any) {
      // Handle the error case and pass the error message to the rejectWithValue function
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
