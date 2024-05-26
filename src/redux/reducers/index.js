// redux/reducers.js
import { combineReducers } from "redux";
import authReducer from "./authSlice";
import subscriptionsSlice from "./subscriptionsSlice";
import fileSlice from "./fileSlice";
import fileStorePermissions from "./fileStorePermissions";
import uploadContents from "./contentUploadSlice";
import fileStoreRecoverySlice from "./fileStoreRecoverySlice";
import userProfileSlice from "./userProfileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  subscription: subscriptionsSlice,
  files: fileSlice,
  fileStorePermissions,
  contentUpload: uploadContents,
  fileStoreRecover: fileStoreRecoverySlice,
  userProfiles: userProfileSlice,
  // Add other reducers here
});

export default rootReducer;
