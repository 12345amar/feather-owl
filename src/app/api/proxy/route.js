import { headers } from "next/headers";

export async function GET(request) {
  try {
    const operation = request.nextUrl.searchParams.get("operation");
    const headersList = headers();
    const authToken = headersList.get("Authorization");
    const getHeader = { Authorization: authToken };
    const url = `${process.env.API_URL}/${operation}/`;
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

export async function POST(request) {
  try {
    const operation = request.nextUrl.searchParams.get("operation");
    const headersList = headers();
    const authToken = headersList.get("Authorization");

    const getParams = await request.json();
    let formBody = [];
    for (var property in getParams) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(getParams[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const url = `${process.env.API_URL}/${operation}/`;
    const getHeader = {
      Authorization: authToken,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    const res = await fetch(url, {
      method: "POST",
      headers: getHeader,
      body: formBody,
    });
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

export async function DELETE(request) {
  try {
    const queryParams = request.nextUrl.searchParams.get("query");

    const operation = request.nextUrl.searchParams.get("operation");
    const headersList = headers();
    const authToken = headersList.get("Authorization");
    const getHeader = { Authorization: authToken };
    let url = `${process.env.API_URL}/${operation}/`;
    if (queryParams) {
      url = `${process.env.API_URL}/${operation}${queryParams}`;
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
