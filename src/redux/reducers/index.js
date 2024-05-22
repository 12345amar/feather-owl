// redux/reducers.js
import { combineReducers } from "redux";
import authReducer from "./authSlice";
import subscriptionsSlice from "./subscriptionsSlice";
import fileSlice from "./fileSlice";
import fileStorePermissions from "./fileStorePermissions";
import uploadContents from "./contentUploadSlice";
import fileStoreRecoverySlice from "./fileStoreRecoverySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  subscription: subscriptionsSlice,
  files: fileSlice,
  fileStorePermissions,
  contentUpload: uploadContents,
  fileStoreRecover: fileStoreRecoverySlice,
  // Add other reducers here
});

export default rootReducer;
