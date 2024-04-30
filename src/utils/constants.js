import CryptoJS from 'crypto-js';

const encryptKey = {
    'LOGIN_SECRET': 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIHbd50+YA77FGCuLIVFJkq' 
}

// Function to encrypt token
const encryptToken = (token, secretKey) => {
    return CryptoJS.AES.encrypt(token, secretKey).toString();
  };
  
// Function to decrypt token
const decryptToken = (encryptedToken, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

const parseJwt = (token) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}


export  { encryptKey, encryptToken, decryptToken, parseJwt }