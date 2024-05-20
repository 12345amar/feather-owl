// src/redux/slices/todosSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getFileStores,
  createFileStores,
  deleteFileStores,
} from "@/services/api";

/**
 * initial state for files
 */
const initialState = {
  fileStores: [],
  createFile: null,
  deleteFile: null,
  error: null,
  loading: false,
};

/**
 *redux toolkit slice for files
 */
const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    // You can add more reducers for update and delete operations
  },
  extraReducers: (builder) => {
    builder.addCase(getFileStores.fulfilled, (state, action) => {
      state.loading = false;
      state.fileStores = action.payload;
    });
    builder.addCase(getFileStores.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createFileStores.fulfilled, (state, action) => {
      state.loading = false;
      state.createFile = action.payload;
    });
    builder.addCase(createFileStores.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteFileStores.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteFile = action.payload;
    });
    builder.addCase(deleteFileStores.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const {} = fileSlice.actions;
export default fileSlice.reducer;
