// utils/api.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://84.227.19.180'; // Replace with your API base URL

const apiUrl = {
   LOGIN_URL: `${ API_BASE_URL }/login/`,
   REGISTER_URL: `${ API_BASE_URL }/userregister/`
}

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });
export const fetchCsrfToken = async () => {
    try {
      const response = await axios.get(apiUrl.LOGIN_URL);
      
    
    const html = response.data
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    //   // Get the value of the input element by its name
    const inputElement = doc.querySelector('input[name="csrfmiddlewaretoken"]');
   
      if (inputElement) {
        // Extract the value or other attributes as needed
        return inputElement.value
      } else {
        console.error('Input element not found');
        return null
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
export const login = createAsyncThunk('/auth/login', async (requestParams) => {
    try {
        console.log('====requestParams', requestParams)
        return await axios.post(apiUrl.LOGIN_URL, requestParams).then((response) => {
            console.log('====response', response)
            return response.data; 
        }).catch((error) => {
            const message = error?.response?.data?.username?.[0] ? error?.response?.data?.username?.[0] : 'Something went to wrong'
            return { error: { message }}
        })
    } catch (error) {
      throw error.response.data;
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
