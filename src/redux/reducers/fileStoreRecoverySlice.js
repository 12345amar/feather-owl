// src/redux/slices/todosSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getFileStoreRecovery } from "@/services/api";

const initialState = {
  canRecoveredFiles: [],
  error: null,
  loading: false,
};

const fileStoreRecoverySlice = createSlice({
  name: "filestorerecovery",
  initialState,
  reducers: {
    // You can add more reducers for update and delete operations
  },
  extraReducers: (builder) => {
    builder.addCase(getFileStoreRecovery.fulfilled, (state, action) => {
      state.loading = false;
      state.userFileStorePermissions = action.payload;
    });
    builder.addCase(getFileStoreRecovery.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const {} = fileStoreRecoverySlice.actions;
export default fileStoreRecoverySlice.reducer;
