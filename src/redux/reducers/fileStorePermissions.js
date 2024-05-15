// src/redux/slices/todosSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getFileStorePermissions } from "@/services/api";

const initialState = {
  userFileStorePermissions: [],
  error: null,
  loading: false,
};

const fileStorePermissions = createSlice({
  name: "fileStorePermissions",
  initialState,
  reducers: {
    // You can add more reducers for update and delete operations
  },
  extraReducers: (builder) => {
    builder.addCase(getFileStorePermissions.fulfilled, (state, action) => {
      state.loading = false;
      state.userFileStorePermissions = action.payload;
    });
    builder.addCase(getFileStorePermissions.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const {} = fileStorePermissions.actions;
export default fileStorePermissions.reducer;
