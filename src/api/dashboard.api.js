import api from "./axios";

export const getDashboardStats = async () => {
  const [schemes, departments] = await Promise.all([
    api.get("/schemes"),
    api.get("/masters/departments"),
  ]);

  return {
    totalSchemes: schemes.data.data.length,
    departments: departments.data.data.length,
    totalSubmissions: 0, // we’ll add later
  };
};
