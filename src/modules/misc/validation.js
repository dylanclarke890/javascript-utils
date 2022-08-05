const defaultPasswordSettings = {
  skipDetailedCheck: false,
  contains: {
    upper: true,
    lower: true,
    number: true,
    special: true,
  },
  min: 8,
  max: 64,
};

/** Validates a password, using the settings passed in to run RegEx tests.
 * @param {string} password The password to validate.
 * @param {object} [settings]
 * @param {boolean} [settings.skipDetailedCheck] - tests the password without running individual
 * checks.
 * @param {boolean} [settings.min] - specify to check for a min length.
 * @param {boolean} [settings.max] - specify to check for a max length.
 * @param {Object} [settings.contains]
 * @param {boolean} [settings.contains.upper] - flag to check for an uppercase character.
 * @param {boolean} [settings.contains.lower] - flag to check for an lowercase character.
 * @param {boolean} [settings.contains.number] - flag to check for a digit.
 * @param {boolean} [settings.contains.special] - flag to check for a special character.
 * @returns {[boolean, object]} An array of fixed length (2) containing the results of each test
 * and if they all passed. [0] - flag for if all regexp tests passed. [1] - an object containing
 * flags for each check specified in settings. */
export function validatePassword(password, settings = defaultPasswordSettings) {
  settings = { ...defaultPasswordSettings, ...settings };
  const validation = {};
  if (password === undefined || password === "") {
    return [false, validation];
  }
  const { contains, max, min, skipDetailedCheck } = settings;
  const { upper, lower, number, special } = contains;
  const length = password.length;

  const lowerRegEx = lower && "(?=.*[a-z])",
    upperRegEx = upper && "(?=.*[A-Z])",
    numberRegEx = number && "(?=.*[\\d])",
    specialRegEx = special && "(?=.*[!@#$%^&*])",
    lenRegEx = min && `{${min},${max > 0 ? max : ""}}`;
  if (skipDetailedCheck) {
    if (upper && lower && number && special) {
      const regEx = new RegExp(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*]){8,64}/
      );
      const res = regEx.test(password);
      return [res, validation, regEx];
    }
    // conditionally build the full regex string.
    let regStr = "";
    if (lowerRegEx) regStr += lowerRegEx;
    if (upperRegEx) regStr += upperRegEx;
    if (numberRegEx) regStr += numberRegEx;
    if (specialRegEx) regStr += specialRegEx;
    if (lenRegEx) regStr += lenRegEx;
    const regEx = new RegExp("^" + regStr);
    const res = regEx.test(regStr);
    return [res, validation, regEx];
  }

  // validation tests
  if (lower) validation.hasLower = new RegExp(lowerRegEx).test(password);
  if (upper) validation.hasUpper = new RegExp(upperRegEx).test(password);
  if (number) validation.hasNumber = new RegExp(numberRegEx).test(password);
  if (special) validation.hasSpecial = new RegExp(specialRegEx).test(password);
  if (min) validation.correctLength = length > min;
  if (max) validation.correctLength = length < max;

  // true if all entries in vResults is true.
  const success = Object.entries(validation).every(([_, val]) => val === true);
  return [success, validation];
}
