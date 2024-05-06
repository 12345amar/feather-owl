// src/redux/slices/todosSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getPricePlans, getSubscriptions } from '@/services/api';

const initialState = {
    pricePlans: [],
  subscriptions: [],
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
      state.pricePlans.push(...action.payload);
    });
    builder.addCase(getPricePlans.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions.push(...action.payload);
    });
    builder.addCase(getSubscriptions.pending, (state, action) => {
        state.loading = true;
    });

    
  },
});

export const { } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
