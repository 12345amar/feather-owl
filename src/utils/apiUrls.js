const PROXY_URL = "http://localhost:3000/api/proxy";

export const apiUrls = {
  LOGIN_URL: `${PROXY_URL}?operation=login`,
  REGISTER_URL: `${PROXY_URL}?operation=userregister`,
  PRICE_PLANS: `${PROXY_URL}?operation=priceplans`,
  SUBSCRIPTION_PLANS: `${PROXY_URL}?operation=subscriptionplans`,
  FILE_STORE_PERMISSIONS: `${PROXY_URL}?operation=filestorepermissions`,
  SUBSCRIPTIONS: `${PROXY_URL}?operation=subscriptions`,
  FILE_STORES: `${PROXY_URL}?operation=filestores`,
  FILE_STORE_ADMINS: `${PROXY_URL}?operation=filestoreadmins`,
};
