
const DIRECT_URI_REGISTER = "http://84.227.19.180/userregister/";
export const operations = {
  LOGIN: `login`,
  USER_REGISTER:  `userregister`,
  PRICE_PLANS: `priceplans`,
  SUBSCRIPTION_PLANS: `subscriptionplans`,
  FILE_STORE_PERMISSIONS: `filestorepermissions`,
  SUBSCRIPTIONS: `subscriptions`,
  FILE_STORES: `filestores`,
  FILE_STORE_ADMINS: `filestoreadmins`,
  CONTENT_UPLOAD: `contentupload`,
  FILE_STORE_RECOVERY: `filestorerecovery`,
  USER_PROFILES: `userprofiles`,
  SUBSCRIBE: `subscribe`,
}
export const apiUrls = {
  LOGIN_URL: `${process.env.NEXT_PUBLIC_PROXY_URL}?operation=login`,
  REGISTER_URL: DIRECT_URI_REGISTER,
  PRICE_PLANS: `${process.env.NEXT_PUBLIC_PROXY_URL}?operation=priceplans`,
  SUBSCRIPTION_PLANS: `${process.env.NEXT_PUBLIC_PROXY_URL}?operation=subscriptionplans`,
  FILE_STORE_PERMISSIONS: `${process.env.NEXT_PUBLIC_PROXY_URL}?operation=filestorepermissions`,
  SUBSCRIPTIONS: `${process.env.NEXT_PUBLIC_PROXY_URL}?operation=subscriptions`,
  FILE_STORES: `${process.env.NEXT_PUBLIC_PROXY_URL}?operation=filestores`,
  FILE_STORE_ADMINS: `${process.env.NEXT_PUBLIC_PROXY_URL}?operation=filestoreadmins`,
  CONTENT_UPLOAD: `${process.env.NEXT_PUBLIC_PROXY_URL}?operation=contentupload`,
  FILE_STORES_RECOVERY: `${process.env.NEXT_PUBLIC_PROXY_URL}?operation=filestorerecovery`,
  USER_PROFILE: `${process.env.NEXT_PUBLIC_PROXY_URL}?operation=userprofiles`,
  CREATE_SUBSCRIPTION_PLANS: `${process.env.NEXT_PUBLIC_PROXY_URL}?operation=subscribe`,
};
