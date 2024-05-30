import CryptoJS from "crypto-js";
import moment from "moment";

/**
 * Any random secret key for encrypt and decrypt 
 */
export const encryptKey = {
  LOGIN_SECRET: "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIHbd50+YA77FGCuLIVFJkq",
};


/**
 * Function to encrypt token
 * @param {*} token 
 * @param {*} secretKey 
 * @returns 
 */
export const encryptToken = (token, secretKey) => {
  return CryptoJS.AES.encrypt(token, secretKey).toString();
};

/**
 * Function to decrypt token
 * @param {*} encryptedToken 
 * @param {*} secretKey 
 * @returns 
 */
export const decryptToken = (encryptedToken, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

/**
 * Parse JWT token
 * @param {*} token 
 * @returns 
 */
export const parseJwt = (token) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

/**
 * Currency symbol
 */
export const currencySymbol = {
  usd: "$",
  euro: "€",
  chf: "₣",
};

/**
 * Convert byte into KB, MB, GB, TB, PB
 * @param {*} value 
 * @returns 
 */
export const dataSizeType = (value) => {
  const dataValue = Number(value);
  if (dataValue > 1000000000000000) {
    return `${dataValue / 1000000000000000} PB`; // peta byte
  } else if (dataValue > 1000000000000) {
    return `${dataValue / 1000000000000} TB`; // tera byte
  } else if (dataValue > 1000000000) {
    return `${dataValue / 1000000000} GB`; // giga byte
  } else if (dataValue > 1000000) {
    return `${dataValue / 1000000} MB`; // mega byte
  } else if (dataValue > 1000) {
    return `${dataValue / 1000} KB`; // kilo byte
  } else {
    return `${dataValue} Bytes`;
  }
};

/**
 * User Type
 */
export const userType = {
  SUPER_ADMIN: "super_admin",
  PRIVATE_USER: "private_user",
  ENTERPRISE_USER: "enterprise_user",
};

/**
 * create uri with id
 * @param {*} operation 
 * @param {*} id 
 * @returns 
 */
export const createIdWithUrl = (operation, id) => {
  return `${process.env.NEXT_PUBLIC_API_URL}/${operation}/${id}/`
}

/**
 * make format of date and time according to country
 * @param {*} value 
 * @returns 
 */
export const dateAndTimeFormat = (value) => {
  return moment(value).format("dddd, MMMM Do YYYY, h:mm:ss a")
} 

/**
 * Title options
 */
export const titleOptions = [
  {
    value: "Mr.",
    text: "Mr.",
  },
  {
    value: "Ms.",
    text: "Ms.",
  },
  {
    value: "Mrs.",
    text: "Mrs.",
  },
  {
    value: "Miss",
    text: "Miss",
  },
  {
    value: "Dr.",
    text: "Dr.",
  },
  {
    value: "Prof.",
    text: "Prof.",
  },
];

/**
 * Base URL from env
 * @returns 
 */
export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL
}

/**
 * Subscribe APIs params link
 */
export const subscriptionLinks = {
  pricePlanLink: `${process.env.NEXT_PUBLIC_API_URL}/priceplans`,
  billingCountryLink:`${process.env.NEXT_PUBLIC_API_URL}/countries/1/`,
  billingLanguageLink:`${process.env.NEXT_PUBLIC_API_URL}/languages/1/`,
};
