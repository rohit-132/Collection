import api from "./axios";

/**
 * LOGIN API
 * backend expects email & password
 */
export const loginApi = (data) => {
  return api.post("/auth/login", data);
};
