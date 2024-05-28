import { createSlice } from "@reduxjs/toolkit";
import { userProfile } from "@/services/api";

const initialState = {
  userProfile: [],
  error: null,
  loading: false,
};

const userProfilesSlice = createSlice({
  name: "userprofiles",
  initialState,
  reducers: {
    // You can add more reducers for update and delete operations
  },
  extraReducers: (builder) => {
    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.userProfile = action.payload;
    });
    builder.addCase(userProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {} = userProfilesSlice.actions;
export default userProfilesSlice.reducer;
