// utils/api.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Agent } from 'https';
import { successMessage, errorMessage } from '@/utils/apiMessages';
import { encryptToken, encryptKey, parseJwt } from '@/utils/constants';

const API_BASE_URL = 'http://84.227.19.180'; // Replace with your API base URL

const apiUrl = {
   LOGIN_URL: `${ API_BASE_URL }/login/`,
   REGISTER_URL: `${ API_BASE_URL }/userregister/`
}


const getAutherizationCredentials = async () => {
      // const username = 'jrui.oliveiralves@gmail.com'
      // const password = 'wso2lab2024'
      const clientId = 'BoW7lx6l1INlMkj1kdv3cCBV0awa'
      const secretId = 'tjrXCKbIvO_LXthl0S7_1lDrHfAa'
      const grantType = 'password'
      const scope = 'openid'
      const authTokenUrl = 'https://is.integration.feather-lab.com:9444/oauth2/token'
      const basicAuthCredential = btoa(clientId +':'+secretId)

      return {clientId, secretId, grantType, scope, authTokenUrl, basicAuthCredential}
}

export const login = createAsyncThunk('/auth/login', async (requestParams) => {
    try {
      const {username, password} = requestParams
      if (!username) {
        console.error("Login API:", errorMessage.usernameRequired)
        return { error: { message: errorMessage.usernameRequired }}
      }
      if (!password) {
        console.error("Login API:", errorMessage.passwordRequired)
        return { error: { message: errorMessage.passwordRequired }}
      }
      const {grantType, scope, authTokenUrl, basicAuthCredential} = await getAutherizationCredentials()
      
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
        redirect: "follow"
      };
      
      return await fetch(authTokenUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => { 
          if (result?.access_token) {
            console.log("Login API:", result, result?.access_token, parseJwt(result?.access_token))
            const jwtTokenDecode = parseJwt(result?.access_token)
            const ecryptedAccessToken = encryptToken(result.access_token, encryptKey.LOGIN_SECRET)
            sessionStorage.setItem('afo', ecryptedAccessToken);
            return { ...jwtTokenDecode, tokenExpireTime: result?.expires_in }
          }
          console.error("Login API:", result)
          return { error: { message: result?.error_description }}
        })
        .catch((error) => {
          console.error("Login API:", error)
          return { error: { message: error.error_description }}
        });
    } catch (error) {
      console.error("Login API:", error)
      // throw error.response.data;
    }
});


  export const register = createAsyncThunk('auth/register', async (requestParams) => {
    try {
        return await axios.post(apiUrl.REGISTER_URL, requestParams).then((response) => {
            return response.data; 
        }).catch((error) => {
            const message = error?.response?.data?.username?.[0] ? error?.response?.data?.username?.[0] : 'Something went to wrong'
            return { error: { message }}
        })
    } catch (error) {
        const message = error?.response?.data?.username?.[0] ? error?.response?.data?.username?.[0] : 'Something went to wrong'
        throw { error: { message }}
    }
  });
  
//   export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
//       return response.data;
//     } catch (error) {
//       throw error.response.data;
//     }
//   });
// Add other API service functions as needed
