import React from "react";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";

/**
 * Drop-in replacement for native <select> with a built-in search box.
 *
 * Why this wrapper exists:
 *   - The form on UserProfileEdit.js uses a single `handleChange(e)` that
 *     reads `e.target.name` and `e.target.value`. PrimeReact's Dropdown
 *     emits `e.value` directly. We re-shape the event so the existing
 *     handler keeps working untouched.
 *   - Options come from `fetchMasterData()` as `[{id, name}]`. This
 *     component accepts that shape natively.
 *
 * Props:
 *   - name        (string) form-field name (used by parent handleChange)
 *   - value       (string|number) selected value (matches option.id or option.name per valueField)
 *   - options     ([{id,name}]) master data
 *   - onChange    (event) called as { target: { name, value } }
 *   - placeholder (string) text shown when empty
 *   - className   (string) wrapper class (defaults to form-control)
 *   - disabled    (boolean)
 *   - multi       (boolean) render PrimeReact MultiSelect instead.
 *                 Multi-mode value is a comma-separated string of ids
 *                 (matches the "1,3,5" format used elsewhere in the app).
 *   - valueField   "id" (default) or "name" — which option field is stored
 *                   in form state / submitted value (use "name" when the API
 *                   column holds city text, e.g. PaitthiNivasKhor).
 */
const SearchableSelect = ({
  name,
  value,
  options = [],
  onChange,
  placeholder = "Select...",
  className = "",
  disabled = false,
  multi = false,
  showClear = true,
  valueField = "id",
}) => {
  // Normalize the incoming option array. master-data items always have
  // { id, name } but we coerce just in case.
  const normalized = (options || []).map((o) => ({
    id: String(o.id ?? o.value ?? ""),
    name: String(o.name ?? o.label ?? ""),
  }));

  const optionValueKey = valueField === "name" ? "name" : "id";

  if (multi) {
    // Build the array form expected by MultiSelect from a comma-separated string.
    const arr =
      value === null || value === undefined || value === ""
        ? []
        : String(value)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

    return (
      <MultiSelect
        value={arr}
        options={normalized}
        optionLabel="name"
        optionValue="id"
        filter
        filterPlaceholder="Search..."
        placeholder={placeholder}
        disabled={disabled}
        showClear={showClear}
        className={`dw-search-select w-full ${className}`}
        display="chip"
        onChange={(e) => {
          // Re-emit as a synthetic event so parent handleChange works.
          onChange &&
            onChange({
              target: {
                name,
                value: Array.isArray(e.value) ? e.value.join(",") : "",
              },
            });
        }}
      />
    );
  }

  return (
    <Dropdown
      value={value === null || value === undefined ? "" : String(value)}
      options={normalized}
      optionLabel="name"
      optionValue={optionValueKey}
      placeholder={placeholder}
      disabled={disabled}
      showClear={showClear}
      className={`dw-search-select w-full ${className}`}
      onChange={(e) => {
        onChange &&
          onChange({
            target: { name, value: e.value ?? "" },
          });
      }}
    />
  );
};

export default SearchableSelect;
