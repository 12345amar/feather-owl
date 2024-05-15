import { NextResponse } from "next/server";
import { errorMessage } from "@/utils/apiMessages";
import Cors from "nextjs-cors";
/**
 * Function has wso2 identity api credential to generate user bearer token
 * @returns Auth Credentials
 */
const getAuthorizationCredentials = async () => {
  const clientId = process.env.WSO2_CLIENT_ID;
  const secretId = process.env.WSO2_SECRET_ID;
  const grantType = process.env.WSO2_GRANT_TYPE;
  const scope = process.env.WSO2_SCOPE;
  const authTokenUrl = process.env.WSO2_AUTH_TOKEN_URL;
  // write the below in the nodejs server
  // const basicAuthCredential = btoa(clientId + ":" + secretId);
  const basicAuthCredential = Buffer.from(`${clientId}:${secretId}`).toString(
    "base64"
  );

  return {
    clientId,
    secretId,
    grantType,
    scope,
    authTokenUrl,
    basicAuthCredential,
  };
};

/**
 * User login api using wso2 identity
 * @param {*} request
 * @returns user access_token
 */

// Update the below fn to handle CORS issue
// export async function POST(request) {
//   try {
//     const requestParams = await request.json();
//     console.log("=====requestParams", requestParams);
//     const { username, password } = requestParams;
//     if (!username) {
//       console.error("Auth Loaded: ", errorMessage.usernameRequired);
//       return NextResponse.json({
//         error: { message: errorMessage.usernameRequired },
//       });
//     }
//     if (!password) {
//       console.error("Auth Loaded: ", errorMessage.passwordRequired);
//       return NextResponse.json({
//         error: { message: errorMessage.passwordRequired },
//       });
//     }
//     const { grantType, scope, authTokenUrl, basicAuthCredential } =
//       await getAuthorizationCredentials();
//     console.log("====run here");
//     const headers = {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization: `Basic ${basicAuthCredential}`,
//     };
//     const body = new URLSearchParams();
//     body.append("grant_type", grantType);
//     body.append("username", username);
//     body.append("password", password);
//     body.append("scope", scope);
//     console.log("==========================>", headers, body);
//     const response = await fetch(authTokenUrl, {
//       method: "POST",
//       headers,
//       body,
//     });
//     const result = response.json();
//     console.error("Auth Loaded Success:", result);
//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("Auth Loaded Error:", error);
//     return NextResponse.json(error);
//   }
// }

// Assuming cors is imported: import cors from 'cors';
export async function POST(request, response) {
  await Cors(request, response, {
    methods: ["GET", "HEAD", "POST"],
    origin: "*", // or specify your origin
    optionsSuccessStatus: 200,
  });
  try {
    const requestParams = await request.json();
    console.log("=====requestParams", requestParams);
    const { username, password } = requestParams;
    if (!username) {
      console.error("Auth Loaded: ", errorMessage.usernameRequired);
      return NextResponse.status(400).json({
        error: { message: errorMessage.usernameRequired },
      });
    }
    if (!password) {
      console.error("Auth Loaded: ", errorMessage.passwordRequired);
      return NextResponse.status(400).json({
        error: { message: errorMessage.passwordRequired },
      });
    }
    const { grantType, scope, authTokenUrl, basicAuthCredential } =
      await getAuthorizationCredentials();
    console.log("====run here");
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuthCredential}`,
    };
    const body = new URLSearchParams();
    body.append("grant_type", grantType);
    body.append("username", username);
    body.append("password", password);
    body.append("scope", scope);
    console.log("==========================>", headers, body);
    const response = await fetch(authTokenUrl, {
      method: "POST",
      headers,
      body,
    });
    const result = await response.json();
    console.error("Auth Loaded Success:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Auth Loaded Error:", error);
    return NextResponse.status(500).json(error);
  }
  // your handler logic here
}
