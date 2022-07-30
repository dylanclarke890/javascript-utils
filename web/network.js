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
