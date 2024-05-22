import { createSlice } from "@reduxjs/toolkit";
import { uploadContent } from "@/services/api";

const initialState = {
  contentupload: [],
  error: null,
  loading: false,
};

const uploadContents = createSlice({
  name: "contentupload",
  initialState,
  reducers: {
    // You can add more reducers for update and delete operations
  },
  extraReducers: (builder) => {
    builder.addCase(uploadContent.fulfilled, (state, action) => {
      state.loading = false;
      state.contentupload = action.payload;
    });
    builder.addCase(uploadContent.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const {} = uploadContents.actions;
export default uploadContents.reducer;
