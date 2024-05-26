export async function POST(request) {
  try {
    const operation = request.nextUrl.searchParams.get("operation");
    const headersList = headers();
    const authToken = headersList.get("Authorization");
    const getHeader = { Authorization: authToken };
    const url = `${process.env.API_URL}/${operation}/`;
    const res = await fetch(url, { method: "POST", headers: getHeader });
    if (res && res.status === 200) {
      const result = await res.json();
    }
  } catch (error) {
    console.log("Server API: ", "/", error);
    return Response.json(error);
  }
}
