/**
 * Returns the basename of a path.
 * @param {string} path A path.
 * @return {string} The basename of the given path.
 */
export function basename(path) {
  return path.split(/[\\/]/).pop();
}

/**
 * Get the extension of a path (i.e untitled.png => png).
 * @param {string} path the path to strip the extension from.
 * @returns {string} the path extension or an empty string.
 */
export function getPathExtension(path) {
  const str = path + "";
  const dotP = str.lastIndexOf(".") + 1;
  return !dotP ? "" : dotP !== str.length ? str.substring(dotP) : "";
}

/**
 * Returns info about a path.
 * @param {string} path The path.
 * @param {Object} [options] Optional options object. Defaults to all. If passed with override 
 * all other properties.
 * @param {boolean} [options.all] all flag. Defaults to true.
 * @param {boolean} [options.dirname] dirname flag. Defaults to true.
 * @param {boolean} [options.basename] basename flag. Defaults to true.
 * @param {boolean} [options.extension] extension flag. Defaults to true.
 * @param {boolean} [options.filename] filename flag. Defaults to true.
 */
export function pathInfo(path, options = {
  all: true,
  dirname: true,
  basename: true,
  extension: true,
  filename: true,
}) {
  if (!path) return {};
  const override = !options || options.all;
  // Gather path info
  const tmpArr = {};
  if (override || options.dirname) {
    const dirName = path.replace(/\\/g, "/").replace(/\/[^/]*\/?$/, ""); // dirname
    tmpArr.dirname = dirName === path ? "." : dirName;
  }
  let haveBasename = false;
  if (override || options.basename) {
    if (haveBasename === false) haveBasename = basename(path);
    tmpArr.basename = haveBasename;
  }
  let haveExtension = false;
  if (override || options.extension) {
    if (haveBasename === false) haveBasename = basename(path);
    if (haveExtension === false) haveExtension = getPathExtension(haveBasename);
    if (haveExtension !== false) tmpArr.extension = haveExtension;
  }
  let haveFilename = false;
  if (override || options.filename) {
    if (haveBasename === false) haveBasename = basename(path);
    if (haveExtension === false) haveExtension = getPathExtension(haveBasename);
    if (haveFilename === false)
      haveFilename = haveBasename.slice(
        0,
        haveBasename.length -
          (haveExtension
            ? haveExtension.length + 1
            : haveExtension === false
            ? 0
            : 1)
      );
    tmpArr.filename = haveFilename;
  }
  return tmpArr;
}

/**
 * Returns the extension of a filename.
 * @param {string} filename The filename.
 * @return {string} The extension of the given filename.
 */
export function filenameExtension(filename) {
  const info = pathInfo(filename, { extension: true });
  if (!info) return "";
  return info.extension;
}

/**
 * Returns the dirname of a path.
 * @param {string} path A path.
 * @return {string} The dirname of the given path.
 */
export function dirname(path) {
  const info = pathInfo(path, { dirname: true });
  if (!info) return "";
  return info.dirname;
}
