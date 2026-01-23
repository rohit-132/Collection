import api from "./axios";

/* ===============================
   GET ALL SCHEMES
================================ */
export const getSchemes = async () => {
  const res = await api.get("/schemes"); // ✅ CORRECT PATH

  console.log("RAW SCHEME RESPONSE:", res.data);

  // ✅ ONLY RETURN ARRAY
  return res.data.data;
};

/* ===============================
   CREATE SCHEME
================================ */
export const createScheme = async (payload) => {
  const res = await api.post("/schemes", payload);
  return res.data.data;
};
