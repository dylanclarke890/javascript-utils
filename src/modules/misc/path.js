/**
 * Returns the basename of a path.
 * @param {string} path A path.
 * @return {string} The basename of the given path.
 */
export function basename(path) {
  return path.split(/[\\/]/).pop();
}

export function getPathExtension(path) {
  const str = path + "";
  const dotP = str.lastIndexOf(".") + 1;
  return !dotP ? false : dotP !== str.length ? str.substring(dotP) : "";
}

/**
 * Returns info about a path.
 * @param {string} path The path.
 * @param {number} [options] Optional options flag.
 */
export function pathInfo(path, options) {
  if (!path) {
    return false;
  }

  // Initialize binary arguments. Both the string & integer (constant) input is
  // allowed
  const OPTS = {
    PATHINFO_DIRNAME: 1,
    PATHINFO_BASENAME: 2,
    PATHINFO_EXTENSION: 4,
    PATHINFO_FILENAME: 8,
    PATHINFO_ALL: 0,
  };

  if (!options) {
    options = OPTS.PATHINFO_ALL;
  }

  // PATHINFO_ALL sums up all previously defined PATHINFOs (could just pre-calculate)
  let optTemp = 0;
  for (let optionName in OPTS) {
    if (Object.prototype.hasOwnProperty.call(OPTS, optionName)) {
      OPTS.PATHINFO_ALL = OPTS.PATHINFO_ALL | OPTS[optionName];
    }
  }
  if (typeof options !== "number") {
    // Allow for a single string or an array of string flags
    options = [].concat(options);
    for (let i = 0; i < options.length; i++) {
      // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
      if (OPTS[options[i]]) {
        optTemp = optTemp | OPTS[options[i]];
      }
    }
    options = optTemp;
  }

  // Gather path info
  const tmpArr = {};
  if (options & OPTS.PATHINFO_DIRNAME) {
    const dirName = path.replace(/\\/g, "/").replace(/\/[^/]*\/?$/, ""); // dirname
    tmpArr.dirname = dirName === path ? "." : dirName;
  }

  let haveBasename = false;
  if (options & OPTS.PATHINFO_BASENAME) {
    if (haveBasename === false) haveBasename = basename(path);
    tmpArr.basename = haveBasename;
  }

  let haveExtension = false;
  if (options & OPTS.PATHINFO_EXTENSION) {
    if (haveBasename === false) haveBasename = basename(path);
    if (haveExtension === false) haveExtension = getPathExtension(haveBasename);
    if (haveExtension !== false) tmpArr.extension = haveExtension;
  }

  let haveFilename = false;
  if (options & OPTS.PATHINFO_FILENAME) {
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
 *
 * @param {string} filename The filename.
 * @return {string} The extension of the given filename.
 */
export function filenameExtension(filename) {
  const pathinfo = pathInfo(filename, "PATHINFO_EXTENSION");
  if (!pathinfo) return "";
  return pathinfo.extension;
}

/**
 * Returns the dirname of a path.
 * @param {string} path A path.
 * @return {string} The dirname of the given path.
 */
export function dirname(path) {
  return path.replace(/\\/g, "/").replace(/\/[^/]*\/?$/, "");
}
