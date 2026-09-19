export const baseUrl = import.meta.env.VITE_API_URL;

export const FireAPI = async (endPoint, method = "GET", body, token = null) => {
  const url = `${baseUrl}/${endPoint}`;

  let headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const options = {
    method: method.toUpperCase(),
    headers,
    credentials: "include",
  };

  if (body && method.toUpperCase() !== "GET") {
    options.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    const data = await response.json();

    if (response.ok) return data;
    else throw data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
