

// redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '@/services/api';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    loading: false,
},
reducers: {
  clearError: state => {
    state.error = null;
  },
},
extraReducers: builder => {
  builder
    .addCase(login.pending, state => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(register.pending, state => {
      state.loading = true;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    // .addCase(forgotPassword.pending, state => {
    //   state.loading = true;
    // })
    // .addCase(forgotPassword.fulfilled, (state, action) => {
    //   state.loading = false;
    //   // Handle success
    // })
    // .addCase(forgotPassword.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
},
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
