/**
 * This file use for running all rest api from frontend where we submit form or make request to get data.
 * There is only one proxy call to handle all request of rest api in backend side
 * All APIs connected with redux toolkit and thunk 
 * For calling any api of this file from frontend component we use useDispatch hooks from redux toolkit
 */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { successMessage, errorMessage } from "@/utils/apiMessages";
import { apiUrls } from "@/utils/apiUrls";
import {
  encryptToken,
  encryptKey,
  parseJwt,
  decryptToken,
  userType,
} from "@/utils/constants";
import https from "https";

/**
 * Prepare header for proxy api call
 * @returns 
 */
const myHeaders = () => {
  const myHeader = new Headers();
  const accessToken = sessionStorage.getItem("afo");
  const decryptTokens = `Bearer ${decryptToken(
    accessToken,
    encryptKey.LOGIN_SECRET
  )}`;
  myHeader.append("Authorization", decryptTokens);
  return myHeader;
};

/**
 * Prepare all secret key to login WSO2 Auth
 * @returns 
 */
const getAuthorizationCredentials = async () => {
  const clientId = process.env.NEXT_PUBLIC_WSO2_CLIENT_ID;
  const secretId = process.env.NEXT_PUBLIC_WSO2_SECRET_ID;
  const grantType = process.env.NEXT_PUBLIC_WSO2_GRANT_TYPE;
  const scope = process.env.NEXT_PUBLIC_WSO2_SCOPE;
  const authTokenUrl = process.env.NEXT_PUBLIC_WSO2_AUTH_TOKEN_URL;
  const basicAuthCredential = btoa(clientId + ":" + secretId);
  return {
    clientId,
    secretId,
    grantType,
    scope,
    authTokenUrl,
    basicAuthCredential,
  };
};

/**
 * Login by access_token, please generat token from postman and get access_token
 * @param {*} paramsData 
 * @returns 
 */
const developerLogin = (paramsData) => {
  try {
    if (paramsData?.accessToken) {
      const jwtTokenDecode = parseJwt(paramsData?.accessToken);
      const encryptedAccessToken = encryptToken(
        paramsData?.accessToken,
        encryptKey.LOGIN_SECRET
      );
      if (!paramsData?.isAuthCheck) {
        sessionStorage.setItem("afo", encryptedAccessToken);
      }

      return { ...jwtTokenDecode, tokenExpireTime: 3600 };
    }
  } catch (error) {
    return { error: { message: "Access token is not correct." } };
  }
};

/**
 * Login by user, will move in backend side
 */
export const login = createAsyncThunk("auth/login", async (requestParams) => {
  try {
    const { username, password, isDeveloper = false } = requestParams;
    if (isDeveloper) {
      return await developerLogin(requestParams);
    }
    if (!username) {
      return { error: { message: errorMessage.usernameRequired } };
    }
    if (!password) {
      return { error: { message: errorMessage.passwordRequired } };
    }
    const { grantType, scope, authTokenUrl, basicAuthCredential } =
      await getAuthorizationCredentials();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${basicAuthCredential}`);
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", grantType);
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    urlencoded.append("scope", scope);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
      agent: new https.Agent({
        rejectUnauthorized: false, // This will ignore SSL certificate errors
      }),
    };
    const response = await fetch(authTokenUrl, requestOptions);
    const result = await response.json();
    console.log("Login API:", result);
  } catch (error) {
    console.error("Login API:", error);
    const message = error?.response?.data?.username?.[0]
      ? error?.response?.data?.username?.[0]
      : "Something went to wrong";
    throw { error: { message } };
  }
});

/**
 * User registration
 */
export const userRegister = createAsyncThunk(
  "auth/register",
  async (requestParams) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const stringifiedData = JSON.stringify(requestParams);
    try {
      const response = await fetch(apiUrls.REGISTER_URL, {
        method: "POST",
        headers: myHeaders,
        body: stringifiedData,
        redirect: "follow",
      });
      const result = await response.json();
      if (result) {
        return result;
      }
      return { error: { message: error?.message } };
    } catch (error) {
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

/**
 * Get User subscription
 */
export const getUserSubscriptions = createAsyncThunk(
  "subscription/getUserSubscriptions",
  async () => {
    try {
      const res = await fetch(apiUrls.SUBSCRIPTIONS, {
        method: "GET",
        headers: myHeaders(),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("api subscriptions:", error);
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

/**
 * Get Price Plan List
 */
export const getPricePlans = createAsyncThunk(
  "subscription/getPricePlans",
  async () => {
    try {
      const response = await fetch(apiUrls.PRICE_PLANS, {
        method: "GET",
        headers: myHeaders(),
      });
      const result = response.json();
      if (result) {
        return result;
      }
      return { error: { message: error?.message } };
    } catch (error) {
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

/**
 * Get File Store List
 */
export const getFileStores = createAsyncThunk(
  "files/getFileStores",
  async () => {
    try {
      const response = await fetch(apiUrls.FILE_STORES, {
        method: "GET",
        headers: myHeaders(),
      });
      const result = await response.json();
      if (result?.length) {
        console.log("loaded filestores success:");
        return result;
      }
      console.error("api filestores:", "File records do not exist.");
      return { error: { message: "File records do not exist." } };
    } catch (error) {
      console.error("api filestores:", error);
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

/**
 * Create new file store
 */
export const createFileStores = createAsyncThunk(
  "files/createFileStores",
  async (params) => {
    try {
      const requestParams = JSON.stringify({
        ...params,
      });
      let url = apiUrls.FILE_STORE_ADMINS;
      if (params?.userType && params?.userType === userType.ENTERPRISE_USER) {
        url = apiUrls.FILE_STORES;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: myHeaders(),
        body: requestParams,
      });
      const result = response.json();
      if (result) {
        console.log("loaded filestores success:");
        return result;
      }
      console.error("api filestores:", error);
      return { error: { message: error?.message } };
    } catch (error) {
      console.error("api filestores:", error);
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

/**
 * Update file store name
 */
export const updateFileStores = createAsyncThunk(
  "files/updateFileStores",
  async (params) => {
    try {
      let url = apiUrls.FILE_STORES;
      let getParams ={
        fileStoreName: params?.fileStoreName
      };
      if (params?.isDeleteFile) {
        url = apiUrls.FILE_STORE_ADMINS;
        getParams = {
          deleteFileStore: params.deleteFileStore
        }
      }
      url = `${url}&query=/${params?.id}/`
      const requestParams = JSON.stringify(getParams);
      const response = await fetch(url, {
        method: "PATCH",
        headers: myHeaders(),
        body: requestParams,
      });
      const result = await response.json();
      if (result?.error) {
        console.error("api update filestores:", result?.error);
        return { error: { message: result?.error } };
      }
      console.log("loaded update filestores sucess:");
      return result;
    } catch (error) {
      console.error("api update filestores:", error);
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

/**
 * Delete file store to moving in recycle bin
 */
export const deleteFileStores = createAsyncThunk(
  "files/deleteFileStores",
  async (id) => {
    try {
      const url = `${apiUrls.FILE_STORES}&query=/${id}/`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: myHeaders(),
      });
      const result = await response.json();
      if (result?.code === 200) {
        console.log("loaded deleted filestores success:");
        return result;
      }
      console.error("api deleted filestores:", "File records do not exist.");
      return { error: { message: "Deleted File records do not exist." } };
    } catch (error) {
      console.error("api deleted filestores:", error);
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

/**
 * Get Subscriptions list
 */
export const getSubscriptions = createAsyncThunk(
  "subscription/getSubscriptions",
  async () => {
    try {
      const response = await fetch(apiUrls.SUBSCRIPTION_PLANS, {
        method: "GET",
        headers: myHeaders(),
      });
      const result = response.json();
      if (result) {
        return result;
      }
      return { error: { message: error?.message } };
    } catch (error) {
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

/**
 * Get file store permissions
 */
export const getFileStorePermissions = createAsyncThunk(
  "fileStorePermissions/getFileStorePermissions",
  async () => {
    try {
      const response = await fetch(apiUrls.FILE_STORE_PERMISSIONS, {
        method: "GET",
        headers: myHeaders(),
      });
      const result = await response.json();
      if (result?.length) {
        return result;
      }
      console.error("api filestores:", "File permissions do not exist.");
      return { error: { message: "File permissions do not exist." } };
    } catch (error) {
      console.error("api filePermissions:", error);
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

 
/**
 * Upload content in file store
 */
export const uploadContent = createAsyncThunk(
  "files/contentupload",
  async (params) => {
    try {
      const requestParams = JSON.stringify(params);
      const response = await fetch(apiUrls.CONTENT_UPLOAD, {
        method: "POST",
        headers: myHeaders(),
        body: requestParams,
      });
      const result = await response.json();
      if (result) {
        if (result.status === 415) {
          return { error: { message: result.error } };
        } else {
          return result;
        }
      }
      console.error(error);
      return { error: { message: error?.message } };
    } catch (error) {
      console.error("api filestores:", error);
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

/**
 * Get File Store recover by admin
 */
export const getFileStoreRecovery = createAsyncThunk(
  "filestorerecovery/getFileStoreRecovery",
  async () => {
    const url = `${apiUrls.FILE_STORES_RECOVERY}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: myHeaders(),
      });
      const result = await response.json();
      if (result) {
        console.log("loaded filestores success:");
        return result;
      }
      console.error("api filestores:", error);
      return { error: { message: error?.message } };
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

/**
 * Get File store recover by user
 */
export const updateFileStoreRecovery = createAsyncThunk(
  "filestorerecovery/updateFileStoreRecovery",
  async (params) => {
    const url = `${apiUrls.FILE_STORES_RECOVERY}&query=/${params?.id}/`;
    const requestParams = JSON.stringify({
      recoverFileStore: params.recoverFileStore
    });
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: myHeaders(),
        body: requestParams,
      });
      const result = await response.json();
      if (result?.code === 200) {
        console.log("loaded recover filestores success:");
        return result;
      }
      console.error("api recover filestores:", "File records do not exist.");
      return { error: { message: result?.detail ? result?.detail : result?.error ? result?.error : "File store has not been recovered, try again." } };
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

/**
 * Get User profile
 */
export const userProfile = createAsyncThunk("auth/userprofiles", async () => {
  try {
    const response = await fetch(apiUrls.USER_PROFILE, {
      method: "GET",
      headers: myHeaders(),
    });
    const result = response.json();
    if (result) {
      return result;
    }
    console.error(error);
    return { error: { message: error?.message } };
  } catch (error) {
    console.error(error);
    return { error: { message: error?.message } };
  }
});

/**
 * Subscribe plans for that users
 */
export const createSubscription = createAsyncThunk(
  "subscription/createSubscription",
  async (params) => {
    try {
      const requestParams = JSON.stringify(params);
      const response = await fetch(apiUrls.CREATE_SUBSCRIPTION_PLANS, {
        method: "POST",
        headers: myHeaders(),
        body: requestParams,
      });
      const result = await response.json();
      if (result) {
        return result;
      }
      return { error: { message: error?.message } };
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);
