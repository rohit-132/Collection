import { useEffect, useState } from "react";
import { getSchemes } from "../api/scheme.api";
import {
  getSchemeDefinition,
  saveSchemeDefinition,
} from "../api/schemeDefinition.api";

const FIELD_TYPES = ["TEXT", "NUMBER", "DATE", "AMOUNT"];

export default function SchemeDefinition() {
  const [schemes, setSchemes] = useState([]);
  const [schemeId, setSchemeId] = useState("");
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ LOAD ALL SCHEMES (SAFE)
  useEffect(() => {
    const loadSchemes = async () => {
      try {
        const data = await getSchemes();
        setSchemes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load schemes", err);
        setSchemes([]);
      } finally {
        setLoading(false);
      }
    };

    loadSchemes();
  }, []);

  // ✅ LOAD EXISTING SCHEME DEFINITION WHEN SCHEME CHANGES
  useEffect(() => {
    if (!schemeId) {
      setFields([]);
      return;
    }

    const loadDefinition = async () => {
      try {
        const data = await getSchemeDefinition(schemeId);

        // backend usually returns { fields: [...] }
        setFields(Array.isArray(data?.fields) ? data.fields : []);
      } catch (err) {
        console.error("Failed to load scheme definition", err);
        setFields([]);
      }
    };

    loadDefinition();
  }, [schemeId]);

  // ✅ ADD FIELD
  const addField = () => {
    setFields((prev) => [
      ...prev,
      { key: "", label: "", type: "TEXT", required: false },
    ]);
  };

  // ✅ UPDATE FIELD
  const updateField = (index, field, value) => {
    const updated = [...fields];
    updated[index][field] = value;
    setFields(updated);
  };

  // ✅ SAVE DEFINITION
  const save = async () => {
    if (!schemeId) {
      alert("Please select a scheme");
      return;
    }

    if (fields.length === 0) {
      alert("Please add at least one field");
      return;
    }

    try {
      await saveSchemeDefinition({ schemeId, fields });
      alert("✅ Scheme definition saved successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save scheme definition");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Scheme Definition (Dynamic Form)
      </h1>

      {/* Scheme Selector */}
      <select
        className="border p-2 rounded mb-4"
        value={schemeId}
        onChange={(e) => setSchemeId(e.target.value)}
        disabled={loading}
      >
        <option value="">
          {loading ? "Loading schemes..." : "Select Scheme"}
        </option>

        {schemes.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* Fields */}
      {fields.map((f, i) => (
        <div key={i} className="grid grid-cols-4 gap-3 mb-3">
          <input
            placeholder="Key (ex: applicant_name)"
            className="border p-2 rounded"
            value={f.key}
            onChange={(e) => updateField(i, "key", e.target.value)}
          />

          <input
            placeholder="Label (ex: Applicant Name)"
            className="border p-2 rounded"
            value={f.label}
            onChange={(e) => updateField(i, "label", e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={f.type}
            onChange={(e) => updateField(i, "type", e.target.value)}
          >
            {FIELD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={f.required}
              onChange={(e) =>
                updateField(i, "required", e.target.checked)
              }
            />
            Required
          </label>
        </div>
      ))}

      {/* Actions */}
      <div className="space-x-3 mt-4">
        <button
          onClick={addField}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Add Field
        </button>

        <button
          onClick={save}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Definition
        </button>
      </div>
    </div>
  );
}
