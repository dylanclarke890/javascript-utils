/**
 * A fallback function to copy a text to clipboard.
 * @param {string} text The text to copy.
 * @param {Function} [onSuccess] An optional callback to execute on success.
 * @param {Function} [onFailure] An optional callback to execute on failure.
 */
export function fallbackCopyTextToClipboard(text, onSuccess, onFailure) {
  const bodyScrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    // deprecated, may not work depending on browser but hey this is a fallback anyway.
    const successful = document.execCommand("copy");
    if (successful) {
      onSuccess && onSuccess();
    } else {
      onFailure && onFailure();
    }
  } catch (err) {
    onFailure && onFailure(err);
  }

  (document.body.removeChild(textArea) &&
    document.documentElement.scrollTop &&
    (document.documentElement.scrollTop = bodyScrollTop)) ||
    (document.body.scrollTop = bodyScrollTop);
}

/**
 * Copies a text to clipboard.
 * @param {string} text The text to copy.
 * @param {Function} [onSuccess] An optional callback to execute on success.
 * @param {Function} [onFailure] An optional callback to execute on failure.
 * @return {undefined}
 */
export function copyTextToClipboard(text, onSuccess, onFailure) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text, onSuccess, onFailure);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      onSuccess && onSuccess();
    },
    function (err) {
      onFailure && onFailure(err);
    }
  );
}
