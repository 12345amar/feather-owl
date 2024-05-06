// utils/api.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Agent } from 'https';
import { successMessage, errorMessage } from '@/utils/apiMessages';
import { encryptToken, encryptKey, parseJwt, decryptToken } from '@/utils/constants';

const API_BASE_URL = 'http://84.227.19.180'; // Replace with your API base URL
// const API_BASE_URL = 'http://k8s.integration.feather-lab.com:32744'

const apiUrl = {
  LOGIN_URL: `${API_BASE_URL}/login/`,
  REGISTER_URL: `${API_BASE_URL}/userregister/`,
  PRICE_PLANS: `${API_BASE_URL}/priceplans/`,
  SUBSCRIPTIONS: `${API_BASE_URL}/subscriptionplans/`,
  
}





const myHeaders = () => {
  const myHeader = new Headers();
  // const accessToken = sessionStorage.getItem('afo');
  // const decryptTokens = decryptToken(accessToken, encryptKey.LOGIN_SECRET)
  // myHeader.append("Authorization", decryptTokens);

  myHeader.append("Authorization", "eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJqcnVpLm9saXZlaXJhbHZlc0BnbWFpbC5jb20iLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwicm9sZXMiOlsiQXBwbGljYXRpb25cL0ZlYXRoZXJTdXBlclVzZXIiLCJBcHBsaWNhdGlvblwvRmVhdGhlclN5c3RlbUFkbWluaXN0cmF0b3IiLCJBcHBsaWNhdGlvblwvZmVhdGhlcjEiLCJkZXZvcHMiLCJzdWJzY3JpYmVyIiwiYW5hbHl0aWNzIiwiY3JlYXRvciIsImludGVncmF0aW9uX2RldiIsIm9ic2VydmVyIiwicHVibGlzaGVyIiwic3lzdGVtIiwiZXZlcnlvbmUiXSwiaXNzIjoiaHR0cHM6XC9cL2lzLmludGVncmF0aW9uLmZlYXRoZXItbGFiLmNvbTo5NDQ0XC9vYXV0aDJcL3Rva2VuIiwiZ2l2ZW5fbmFtZSI6Impvc2UgcnVpIiwiY2xpZW50X2lkIjoiQm9XN2x4NmwxSU5sTWtqMWtkdjNjQ0JWMGF3YSIsImF1ZCI6IkJvVzdseDZsMUlObE1rajFrZHYzY0NCVjBhd2EiLCJuYmYiOjE3MTQ5Mjk1NjMsImF6cCI6IkJvVzdseDZsMUlObE1rajFrZHYzY0NCVjBhd2EiLCJzY29wZSI6Im9wZW5pZCIsImV4cCI6MTcxNDkzMzE2MywiaWF0IjoxNzE0OTI5NTYzLCJmYW1pbHlfbmFtZSI6Impvc2UgcnVpIiwianRpIjoiZDM0NTgxZTMtOTYxMS00MGZjLWI3M2EtZWEzNTljZjEwOTdhIiwiZW1haWwiOiJqcnVpLm9saXZlaXJhbHZlc0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImpydWkub2xpdmVpcmFsdmVzQGdtYWlsLmNvbSJ9.BVvh0shf_DS7tKbrdITzjYOQKdF1EhPaaLxbHy8id8C4s2seQALMbOnB0ilbfLLCRWXCaMmXKBm8E-8p9-ejriHeSp0tZpQvDiEiSXvbIo1hwqBnpDM9avx4koyQR2OUqUlLTrG7Yh9VI9CDFQ9sfnek2vUhZX06HfyCz_FFNvnO_waZF_Ow02hcnptMmwfQFdfZ7P31h4ESPgcLPwjCE1eqaViSvTZ-BGTqPeyvinTN_DdwMxg8749eA86_n0YSekYiw-j2cnDW8gzlWqPjgxu_kT9ubuIvUhR5pp3FMffzU_KYkUVTuo2wUyCg5a-04cxlbqakNypOWuEGBvokAA");
  return myHeader
}
const getAutherizationCredentials = async () => {
  // const username = 'jrui.oliveiralves@gmail.com'
  // const password = 'wso2lab2024'
  const clientId = 'BoW7lx6l1INlMkj1kdv3cCBV0awa'
  const secretId = 'tjrXCKbIvO_LXthl0S7_1lDrHfAa'
  const grantType = 'password'
  const scope = 'openid'
  const authTokenUrl = 'https://is.integration.feather-lab.com:9444/oauth2/token'
  const basicAuthCredential = btoa(clientId + ':' + secretId)

  return { clientId, secretId, grantType, scope, authTokenUrl, basicAuthCredential }
}

const developerLogin = (paramsData) => {
  try {
    if (paramsData?.accessToken) {
      const jwtTokenDecode = parseJwt(paramsData?.accessToken)
      const ecryptedAccessToken = encryptToken(paramsData?.accessToken, encryptKey.LOGIN_SECRET)
      if (!paramsData?.isAuthCheck) {
        sessionStorage.setItem('afo', ecryptedAccessToken)
      }

      return { ...jwtTokenDecode, tokenExpireTime: 3600 }
    }
  } catch (error) {
    return { error: { message: "Access token is not correct." } }
  }
}
export const login = createAsyncThunk('/auth/login', async (requestParams) => {
  try {
    const { username, password, isDeveloper = false } = requestParams
    if (isDeveloper) {
      return await developerLogin(requestParams)
    }
    if (!username) {
      console.error("Login API:", errorMessage.usernameRequired)
      return { error: { message: errorMessage.usernameRequired } }
    }
    if (!password) {
      console.error("Login API:", errorMessage.passwordRequired)
      return { error: { message: errorMessage.passwordRequired } }
    }
    const { grantType, scope, authTokenUrl, basicAuthCredential } = await getAutherizationCredentials()

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
          console.log("Login API:", parseJwt(result?.access_token))
          const jwtTokenDecode = parseJwt(result?.access_token)
          const ecryptedAccessToken = encryptToken(result.access_token, encryptKey.LOGIN_SECRET)
          sessionStorage.setItem('afo', ecryptedAccessToken);
          return { ...jwtTokenDecode, tokenExpireTime: result?.expires_in }
        }
        console.error("Login API:", result)
        return { error: { message: result?.error_description } }
      })
      .catch((error) => {
        console.error("Login API:", error)
        return { error: { message: error.error_description } }
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
      return { error: { message } }
    })
  } catch (error) {
    const message = error?.response?.data?.username?.[0] ? error?.response?.data?.username?.[0] : 'Something went to wrong'
    throw { error: { message } }
  }
});

export const getPricePlans = createAsyncThunk('subscription/getPricePlans', async () => {
  try {
    const requestOptions = {
      method: "GET",
      headers: myHeaders(),
      redirect: "follow"
    };
    return await fetch(apiUrl.PRICE_PLANS, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("loaded pricePlans sucess:")
        return result
      })
      .catch((error) => {
        console.error("api priceplans:", error)
        return { error: { message: error?.message } }
      });
  } catch (error) {
    console.error("api pricePlans:", error)
    const message = error?.response?.data?.username?.[0] ? error?.response?.data?.username?.[0] : 'Something went to wrong'
    throw { error: { message } }
  }
})

export const getSubscriptions = createAsyncThunk('subscription/getSubscriptions', async () => {
  try {
    const requestOptions = {
      method: "GET",
      headers: myHeaders(),
      redirect: "follow"
    };
    return await fetch(apiUrl.SUBSCRIPTIONS, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("loaded subscriptions sucess:")
        return result
      })
      .catch((error) => {
        console.error("api subscriptions:", error)
        return { error: { message: error?.message } }
      });
  } catch (error) {
    console.error("api subscriptions:", error)
    const message = error?.response?.data?.username?.[0] ? error?.response?.data?.username?.[0] : 'Something went to wrong'
    throw { error: { message } }
  }
})

//   export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
//       return response.data;
//     } catch (error) {
//       throw error.response.data;
//     }
//   });
// Add other API service functions as needed
