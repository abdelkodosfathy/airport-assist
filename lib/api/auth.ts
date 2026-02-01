    import {
  apiGet,
  apiPost,
  apiPut,
  apiPatch,
  apiDelete,
} from "./http";
import { apiPostFormData } from "./formData";

export class AuthenticatedAPI {
  constructor(private token: string) {}

  private authHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  get(endpoint: string, params = {}, options = {}) {
    return apiGet(endpoint, params, {
      ...options,
      headers: { ...this.authHeaders(), ...(options as any).headers },
    });
  }

  post(endpoint: string, data = {}, options = {}) {
    return apiPost(endpoint, data, {
      ...options,
      headers: { ...this.authHeaders(), ...(options as any).headers },
    });
  }

  put(endpoint: string, data = {}, options = {}) {
    return apiPut(endpoint, data, {
      ...options,
      headers: { ...this.authHeaders(), ...(options as any).headers },
    });
  }

  patch(endpoint: string, data = {}, options = {}) {
    return apiPatch(endpoint, data, {
      ...options,
      headers: { ...this.authHeaders(), ...(options as any).headers },
    });
  }

  delete(endpoint: string, options = {}) {
    return apiDelete(endpoint, {
      ...options,
      headers: { ...this.authHeaders(), ...(options as any).headers },
    });
  }

  postFormData(endpoint: string, formData: FormData, options = {}) {
    return apiPostFormData(endpoint, formData, {
      ...options,
      headers: { ...this.authHeaders(), ...(options as any).headers },
    });
  }
}
