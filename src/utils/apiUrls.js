const PROXY_URL = "http://localhost:3000/api/proxy";

const DIRECT_URI_REGISTER = "http://84.227.19.180/userregister/";

export const apiUrls = {
  LOGIN_URL: `${PROXY_URL}?operation=login`,
  REGISTER_URL: DIRECT_URI_REGISTER,
  PRICE_PLANS: `${PROXY_URL}?operation=priceplans`,
  SUBSCRIPTION_PLANS: `${PROXY_URL}?operation=subscriptionplans`,
  FILE_STORE_PERMISSIONS: `${PROXY_URL}?operation=filestorepermissions`,
  SUBSCRIPTIONS: `${PROXY_URL}?operation=subscriptions`,
  FILE_STORES: `${PROXY_URL}?operation=filestores`,
  FILE_STORE_ADMINS: `${PROXY_URL}?operation=filestoreadmins`,
  CONTENT_UPLOAD: `${PROXY_URL}?operation=contentupload`,
  FILE_STORES_RECOVERY: `${PROXY_URL}?operation=filestorerecovery`,
  USER_PROFILE: `${PROXY_URL}?operation=userprofiles`,
  CREATE_SUBSCRIPTION_PLANS: `${PROXY_URL}?operation=subscribe`,
};
