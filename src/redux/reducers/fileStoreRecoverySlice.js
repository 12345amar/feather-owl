/**
 * Redux fileStoreRecoverySlice to manage file store state of redux toolkit to use data in entire apps
 */
import { createSlice } from "@reduxjs/toolkit";
import { getFileStoreRecovery, updateFileStoreRecovery } from "@/services/api";

const initialState = {
  canRecoveredFiles: [],
  fileStoreRecovered: null,
  error: null,
  loading: false,
};

const fileStoreRecoverySlice = createSlice({
  name: "filestorerecovery",
  initialState,
  reducers: {
    clearRecoverFile: () => {
      return {
        fileStoreRecovered: null,
        error: null,
        loading: false,
      };
    },
    // You can add more reducers for update and delete operations
  },
  extraReducers: (builder) => {
    builder.addCase(getFileStoreRecovery.fulfilled, (state, action) => {
      state.loading = false;
      state.canRecoveredFiles = action.payload;
    });
    builder.addCase(getFileStoreRecovery.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateFileStoreRecovery.fulfilled, (state, action) => {
      state.loading = false;
      state.fileStoreRecovered = action.payload;
    });
    builder.addCase(updateFileStoreRecovery.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { clearRecoverFile } = fileStoreRecoverySlice.actions;
export default fileStoreRecoverySlice.reducer;
