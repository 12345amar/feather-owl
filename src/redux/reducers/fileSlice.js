// src/redux/slices/todosSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getFileStores,
  createFileStores,
  deleteFileStores,
  updateFileStores
} from "@/services/api";

/**
 * initial state for files
 */
const initialState = {
  fileStores: [],
  createFile: null,
  deleteFile: null,
  updateFile: null,
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
    clearError: (state) => {
      state.error = null;
    },
    clearCreateFile: () => {
      return {
        createFile: null,
        error: null,
        loading: false,
      };
    },
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

    builder.addCase(updateFileStores.fulfilled, (state, action) => {
      state.loading = false;
      state.updateFile = action.payload;
    });
    builder.addCase(updateFileStores.pending, (state, action) => {
      state.loading = true;
    });

    
  },
});

export const { clearError, clearCreateFile } = fileSlice.actions;
export default fileSlice.reducer;
