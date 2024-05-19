import { createAsyncThunk } from "@reduxjs/toolkit";
import { successMessage, errorMessage } from "@/utils/apiMessages";
import { apiUrls } from "@/utils/apiUrls";
import {
  encryptToken,
  encryptKey,
  parseJwt,
  decryptToken,
} from "@/utils/capiUrlsonstants";

//const API_BASE_URL = "http://84.227.19.180"; // Replace with your API base URL
const API_BASE_URL = "http://k8s.integration.feather-lab.com:32744";

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

const getAutherizationCredentials = async () => {
  // const username = 'jrui.oliveiralves@gmail.com'
  // const password = 'wso2lab2024'
  const clientId = "BoW7lx6l1INlMkj1kdv3cCBV0awa";
  const secretId = "tjrXCKbIvO_LXthl0S7_1lDrHfAa";
  const grantType = "password";
  const scope = "openid";
  const authTokenUrl =
    "https://is.integration.feather-lab.com:9444/oauth2/token";
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

const developerLogin = (paramsData) => {
  try {
    if (paramsData?.accessToken) {
      const jwtTokenDecode = parseJwt(paramsData?.accessToken);
      const ecryptedAccessToken = encryptToken(
        paramsData?.accessToken,
        encryptKey.LOGIN_SECRET
      );
      if (!paramsData?.isAuthCheck) {
        sessionStorage.setItem("afo", ecryptedAccessToken);
      }

      return { ...jwtTokenDecode, tokenExpireTime: 3600 };
    }
  } catch (error) {
    return { error: { message: "Access token is not correct." } };
  }
};
export const login = createAsyncThunk("/auth/login", async (requestParams) => {
  try {
    const { username, password, isDeveloper = false } = requestParams;
    if (isDeveloper) {
      return await developerLogin(requestParams);
    }
    if (!username) {
      console.error("Login API:", errorMessage.usernameRequired);
      return { error: { message: errorMessage.usernameRequired } };
    }
    if (!password) {
      console.error("Login API:", errorMessage.passwordRequired);
      return { error: { message: errorMessage.passwordRequired } };
    }
    const { grantType, scope, authTokenUrl, basicAuthCredential } =
      await getAutherizationCredentials();

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
    };

    return await fetch(authTokenUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.access_token) {
          console.log("Login API:", parseJwt(result?.access_token));
          const jwtTokenDecode = parseJwt(result?.access_token);
          const ecryptedAccessToken = encryptToken(
            result.access_token,
            encryptKey.LOGIN_SECRET
          );
          sessionStorage.setItem("afo", ecryptedAccessToken);
          return { ...jwtTokenDecode, tokenExpireTime: result?.expires_in };
        }
        console.error("Login API:", result);
        return { error: { message: result?.error_description } };
      })
      .catch((error) => {
        console.error("Login API:", error);
        return { error: { message: error.error_description } };
      });
  } catch (error) {
    console.error("Login API:", error);
    // throw error.response.data;
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (requestParams) => {
    try {
      return await axios
        .post(apiUrl.REGISTER_URL, requestParams)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          const message = error?.response?.data?.username?.[0]
            ? error?.response?.data?.username?.[0]
            : "Something went to wrong";
          return { error: { message } };
        });
    } catch (error) {
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

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
        console.log("loaded pricePlans sucess:");
        return result;
      }
      console.error("api priceplans:", error);
      return { error: { message: error?.message } };
    } catch (error) {
      console.error("api pricePlans:", error);
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

export const getFileStores = createAsyncThunk(
  "files/getFileStores",
  async () => {
    try {
      const response = await fetch(apiUrls.FILE_STORES, {
        method: "GET",
        headers: myHeaders(),
      });
      const result = await response.json();
      console.log("=======", result);
      if (result?.length) {
        console.log("loaded filestores sucess:");
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

export const createFileStores = createAsyncThunk(
  "files/createFileStores",
  async (params) => {
    try {
      const requestParams = JSON.stringify({
        method: "post",
        ...params,
      });
      const response = await fetch(apiUrls.FILE_STORES, {
        method: "POST",
        headers: myHeaders(),
        body: requestParams,
      });
      const result = response.json();
      console.log("=========result");
      if (result) {
        console.log("loaded filestores sucess:");
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

export const getSubscriptions = createAsyncThunk(
  "subscription/getSubscriptions",
  async () => {
    try {
      const response = await fetch(apiUrl.SUBSCRIPTION_PLANS, {
        method: "GET",
        headers: myHeaders(),
      });
      const result = response.json();
      if (result) {
        console.log("loaded subscriptions sucess:");
        return result;
      }
      console.error("api subscriptions:", error);
      return { error: { message: error?.message } };
    } catch (error) {
      console.error("api subscriptions:", error);
      const message = error?.response?.data?.username?.[0]
        ? error?.response?.data?.username?.[0]
        : "Something went to wrong";
      throw { error: { message } };
    }
  }
);

//   export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
//       return response.data;
//     } catch (error) {
//       throw error.response.data;
//     }
//   });
// Add other API service functions as needed

export const getFileStorePermissions = createAsyncThunk(
  "fileStorePermissions/getFileStorePermissions",
  async () => {
    try {
      const requestParams = JSON.stringify({
        operation: "/filestorepermissions/",
      });
      const response = await fetch(PROXY_URL, {
        method: "POST",
        headers: myHeaders(),
        body: requestParams,
      });
      console.log(response, "response");
      const result = await response.json();
      console.log("=======", result);
      if (result?.length) {
        console.log("loaded file store permisisons sucess:");
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
