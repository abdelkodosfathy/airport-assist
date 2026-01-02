import { apiFetch } from "./fetcher";

export function apiGet(
  endpoint: string,
  params: Record<string, any> = {},
  options: RequestInit = {}
) {
  const query =
    Object.keys(params).length > 0
      ? "?" + new URLSearchParams(params).toString()
      : "";

  return apiFetch(`${endpoint}${query}`, {
    method: "GET",
    ...options,
  });
}

export function apiPost(
  endpoint: string,
  data: any = {},
  options: RequestInit = {}
) {
  return apiFetch(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    ...options,
  });
}

export function apiPut(endpoint: string, data = {}, options = {}) {
  return apiFetch(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
    ...options,
  });
}

export function apiPatch(endpoint: string, data = {}, options = {}) {
  return apiFetch(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
    ...options,
  });
}

export function apiDelete(endpoint: string, options = {}) {
  return apiFetch(endpoint, {
    method: "DELETE",
    ...options,
  });
}
