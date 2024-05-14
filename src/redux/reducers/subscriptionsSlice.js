// src/redux/slices/todosSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getPricePlans, getSubscriptions, getUserSubscriptions } from '@/services/api';

const initialState = {
    pricePlans: [],
    subscriptions: [],
    userSubscriptions: [],
    error: null,
    loading: false,
};

const subscriptionsSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    // You can add more reducers for update and delete operations
  },
  extraReducers: (builder) => {
    builder.addCase(getPricePlans.fulfilled, (state, action) => {
      state.loading = false;
      state.pricePlans = action.payload
    })
    builder.addCase(getPricePlans.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(getSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        console.log("========action.payload", action.payload)
        state.subscriptions = action.payload
    })
    builder.addCase(getSubscriptions.pending, (state, action) => {
        state.loading = true;
    })
    builder.addCase(getUserSubscriptions.fulfilled, (state, action) => {
      state.loading = false;
      if (!action?.payload?.length) {
          state.error = 'Something went to wrong'
          state.userSubscriptions = []
      }
      if (action?.payload?.length) {
        state.userSubscriptions = action.payload
      }
    })
    builder.addCase(getUserSubscriptions.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(getUserSubscriptions.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Something went to wrong.'
    })
  },
});

export const { } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
