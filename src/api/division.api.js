import api from "./axios";

// GET ALL DIVISIONS
export const getDivisions = () => {
  return api.get("/masters/divisions");
};

// ADD DIVISION
export const createDivision = (data) => {
  return api.post("/masters/divisions", data);
};

export const deleteDivision = async (id) => {
  await api.delete(`/masters/divisions/${id}`);
};
