// redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { login, userRegister } from "@/services/api";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logoutUser: () => {
      return {
        user: null,
        error: null,
        loading: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
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
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
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

export const { clearError, logoutUser } = authSlice.actions;

export default authSlice.reducer;
