import { buildFormData } from "./form-data";

/**
 * Constructs a query string from the given data.
 * This method works with nested objects/arrays.
 * @param {Array|Object} data The object.
 * @return {string} The query string.
 */
export function buildQueryString(data) {
  const formData = {};
  buildFormData(formData, data, true);
  const parts = [];
  for (const prop in formData) parts.push(prop + "=" + formData[prop]);
  return parts.join("&");
}
