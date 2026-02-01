import { API_BASE_URL } from "./config";

export async function apiPostFormData(
  endpoint: string,
  formData: FormData,
  options: RequestInit = {}
) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    body: formData,
    headers: {
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw {
      status: response.status,
      message: data?.message || "Upload failed",
      data,
    };
  }

  return data;
}
