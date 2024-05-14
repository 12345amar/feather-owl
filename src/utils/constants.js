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

const currencySymbol = {
  usd: '$',
  euro: '€',
  chf: '₣'
}

const dataSizeType = (value) => {
  const dataValue = Number(value)
  let result = ''
  if (dataValue > 1000000000000000) {
      return `${dataValue / 1000000000000000} PB`  // peta byte
  } else if(dataValue > 1000000000000) { 
    return `${dataValue / 1000000000000} TB`  // tera byte
  } else if(dataValue > 1000000000) { 
    return`${dataValue / 1000000000} GB` // giga byte
  } else if(dataValue > 1000000) { 
    return `${dataValue / 1000000} MB`  // mega byte
  } else if(dataValue > 1000) { 
    return `${dataValue / 1000} KB`  // kilo byte
  } else { 
    return `${dataValue} Bytes`
  } 
  
  return result
}


export  { encryptKey, encryptToken, decryptToken, parseJwt, currencySymbol, dataSizeType }