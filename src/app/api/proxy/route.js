/**
 * Here we have all http request for rest api django server
 */
import { headers } from "next/headers";

/**
 * GET http request
 * @param {*} request 
 * @returns 
 */
export async function GET(request) {
  try {
    const operation = request.nextUrl.searchParams.get("operation");
    const headersList = headers();
    const authToken = headersList.get("Authorization");
    const getHeader = { Authorization: authToken };
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${operation}/`;
    const res = await fetch(url, { method: "GET", headers: getHeader });
    if (res && res.status === 200) {
      const result = await res.json();
      return Response.json(result);
    }
    return Response.json({ error: res.statusText, status: res.status });
  } catch (error) {
    console.log("Server API: ", "/", error);
    return Response.json(error);
  }
}

/**
 * POST http request
 * @param {*} request 
 * @returns 
 */
export async function POST(request) {
  try {
    const operation = request.nextUrl.searchParams.get("operation");
    const headersList = headers();
    const authToken = headersList.get("Authorization");

    const getParams = await request.json();
    let formBody = [];
    for (const property in getParams) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(getParams[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${operation}/`;
    const getHeader = {
      Authorization: authToken,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    const res = await fetch(url, {
      method: "POST",
      headers: getHeader,
      body: formBody,
    });
    console.error("Server API: ", "/", operation, res.statusText);
    if (res && (res.status === 200 || res.status === 201)) {
      const result = await res.json();
      return Response.json(result);
    }
    return Response.json({ error: res.statusText, status: res.status });
  } catch (error) {
    console.error("Server API: ", "/", error?.message);
    return Response.json({ error: error?.message, status: error?.statusCode });
  }
}

/**
 * DELETE http request
 * @param {*} request 
 * @returns 
 */
export async function DELETE(request) {
  try {
    const queryParams = request.nextUrl.searchParams.get("query");

    const operation = request.nextUrl.searchParams.get("operation");
    const headersList = headers();
    const authToken = headersList.get("Authorization");
    const getHeader = { Authorization: authToken };
    let url = `${process.env.NEXT_PUBLIC_API_URL}/${operation}/`;
    if (queryParams) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/${operation}${queryParams}`;
    }
    const res = await fetch(url, { method: "DELETE", headers: getHeader });
    if (res && res.status === 200) {
      const result = await res.json();
      return Response.json(result);
    }

    return Response.json({ error: res.statusText, status: res.status });
  } catch (error) {
    console.log("Server API: ", "/", error);
    return Response.json({ error });
  }
}

/**
 * PATCH http request
 * @param {*} request 
 * @returns 
 */
export async function PATCH(request) {
  try {
    const queryParams = request.nextUrl.searchParams.get("query");
    const operation = request.nextUrl.searchParams.get("operation");
    let url = `${process.env.NEXT_PUBLIC_API_URL}/${operation}/`;
    if (queryParams) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/${operation}${queryParams}`;
    }
    const getParams = await request.json();
    const headersList = headers();
    const authToken = headersList.get("Authorization");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", authToken);
    const urlencoded = new URLSearchParams();
    let formBody = [];
    for (var property in getParams) {
      urlencoded.append(property, getParams[property]);
    }
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    const res = await fetch(url, requestOptions)
    console.error("Server API: ", "/", operation, res.statusText);
    if (res && res.status === 200) {
      const result = await res.json();
      return Response.json(result);
    }
    return Response.json({ error: res.statusText, status: res.status });
  } catch (error) {
    console.log("Server API Error: ", "/", error);
    return Response.json({ error });
  }
}

/**
 * Get params from request params
 * @param {*} urlQuery 
 * @returns 
 */
const getParams = (urlQuery) => {
  const getQueryParams = urlQuery?.split?.("&");
  let queryParams = "";
  getQueryParams.forEach((Value, key) => {
    if (key !== 0) {
      queryParams = key === 1 ? `${Value}/` : `${queryParams}&${Value}/`;
    }
  });
  return queryParams;
};
