import api from "./axios";

export const getSchemeDefinition = async (schemeId) => {
  const res = await api.get(`/scheme-definitions/${schemeId}`);
  return res.data.data;
};

export const saveSchemeDefinition = async (payload) => {
  const res = await api.post("/scheme-definitions", payload);
  return res.data.data;
};
