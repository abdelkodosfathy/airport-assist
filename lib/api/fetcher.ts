import { API_BASE_URL } from "./config";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      throw {
        status: response.status,
        statusText: response.statusText,
        data,
        message:
          data?.message ||
          `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return data;
  } catch (error: any) {
    if (error?.status) throw error;

    throw {
      status: 0,
      statusText: "Network Error",
      message: error?.message || "Failed to connect to the server",
      originalError: error,
    };
  }
}
