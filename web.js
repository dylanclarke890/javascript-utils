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
function buildFormData(formData, data, encodeParams, parentKey) {
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

/**
 * Converts an object (array or JS POJO object) to a form data instance.
 * @param {Array|Object} data The data (array or POJO object).
 * @return {FormData} A form data instance.
 */
export function objToformData(data) {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}

/**
 * Returns a new XMLHttpRequest or ActiveXObject object.
 * @return {XMLHttpRequest|ActiveXObject}
 */
export function newXHR() {
  return (
    (window.ActiveXObject && new window.ActiveXObject("Microsoft.XMLHTTP")) ||
    new XMLHttpRequest()
  );
}

/**
 * Checks whether the network is reachable or not.
 * @param {string} URI The uri to use for the request. Note: A GET query string
 * with a random parameter is always appended to the URI.
 * @return {Promise<boolean>} A promise which resolves to true if the network is reachable.
 * Note: the returned promise always resolves to true when this code runs on localhost.
 */
export function checkNetwork(URI = null) {
  // Handle IE and more capable browsers.
  const xhrObj = newXHR();
  return new Promise((resolve) => {
    // Issue request and handle response.
    try {
      xhrObj.onreadystatechange = () => {
        if (xhrObj.readyState == 4) {
          resolve(
            xhrObj.status >= 200 &&
              (xhrObj.status < 300 || xhrObj.status === 304)
          );
        }
      };

      // Open new request as a HEAD to the root hostname with a random param to bust the cache.
      xhrObj.open(
        "HEAD",
        (URI ||
          "//" +
            window.location.hostname +
            (window.location.port != 80 ? ":" + window.location.port : "")) +
          "?rand=" +
          Math.floor((1 + Math.random()) * 0x10000), // 0x10000 = 2^16
        true
      );

      xhrObj.send();
    } catch (error) {
      resolve(false);
    }
  });
}

/**
 * Note: If the network is available, the promise will resolve almost immediately.
 * @param {number} retryInterval An interval in milliseconds to wait before the next network check.
 * @return {Promise} A promise which resolves when the network is available.
 */
export function waitForNetwork(retryInterval = 3000) {
  return new Promise((resolve) => {
    checkNetwork().then((reachable) => {
      if (reachable) {
        resolve();
      } else {
        const interval = setInterval(() => {
          checkNetwork().then((reachable) => {
            if (reachable) {
              clearInterval(interval);
              resolve();
            }
          });
        }, retryInterval);
      }
    });
  });
}

/**
 * Sets a cookie value.
 * @see https://www.w3schools.com/js/js_cookies.asp
 * @param {string} name The cookie name.
 * @param {string} value The cookie value.
 * @param {number|undefined} exdays Number of days after which the cookie expires,
 * or "undefined" to make the cookie expire at the end of the session.
 * @return {undefined}
 */
export function setCookie(name, value, exdays) {
  let expires = "";
  if (exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    expires = "expires=" + d.toUTCString() + ";";
  }
  document.cookie = name + "=" + value + ";" + expires + "path=/";
}

/**
 * Gets a cookie value.
 * @see https://www.w3schools.com/js/js_cookies.asp
 * @param {string} name The cookie name.
 * @return {string|undefined} The cookie value or "undefined", if not set.
 */
export function getCookie(name) {
  const cName = name + "=";
  const cookieArr = document.cookie.split(";");
  let cookie;
  for (let i = 0; i < cookieArr.length; i++) {
    let cookie = cookieArr[i];
    while (cookie.charAt(0) == " ") cookie = cookie.substring(1);
    if (cookie.indexOf(cName) == 0)
      cookie = cookie.substring(cName.length, cookie.length);
  }
  return cookie;
}

/**
 * Unsets a cookie.
 * @param {string} cookieName The cookie name.
 * @return {undefined}
 */
export function unsetCookie(cookieName) {
  setCookie(cookieName, "", -365);
}
