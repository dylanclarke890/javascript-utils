/**
 * Builds a form data instance or object recursively.
 * @see https://stackoverflow.com/questions/22783108/convert-js-object-to-form-data#answer-42483509
 * @param {FormData|Object} formData Form data instance or JS POJO object.
 * @param {Array|Object} data JS POJO object or array with the form data to use to build the
 * forms data.
 * @param {boolean} [encodeParams] Optionally instructs the function if the parameters
 * should be encoded (keys and values) using "encodeURIComponent".
 * @param {string} [parentKey] Parent key for nested parameters (used internally for recursion).
 * @return {undefined}
 */
export function buildFormData(formData, data, encodeParams, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        encodeParams,
        parentKey
          ? `${parentKey}[${key}]`
          : encodeParams
          ? encodeURIComponent(key)
          : key
      );
    });
  } else {
    // Leaf value.
    const value =
      data == null ? "" : encodeParams ? encodeURIComponent(data) : data;
    formData instanceof FormData
      ? formData.append(parentKey, value)
      : (formData[parentKey] = value);
  }
}

/**
 * Converts an object (array or JS POJO object) to a form data instance.
 * @param {Array|Object} data The data (array or POJO object).
 * @return {FormData} A form data instance.
 */
export function objToFormData(data) {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}
