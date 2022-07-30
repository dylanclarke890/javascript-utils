/** Validates a password, using the settings passed in to run RegEx tests.
 * @param {string} password The password to validate.
 * @param {object} settings
 *  skipDetailedCheck: tests the password without running individual checks.
 *  min: specify to check for a min length.
 *  max: specify to check for a max length.
 *  contains.upper: flag to check for an uppercase character.
 *  contains.lower: flag to check for an lowercase character.
 *  contains.number: flag to check for a digit.
 *  contains.special: flag to check for a special character.
 * @returns {[boolean, object]} An array of fixed length (2) containing the results of each test
 * and if they all passed. [0] - flag for if all regexp tests passed. [1] - an object containing
 * flags for each check specified in settings. */
export function validatePassword(
  password,
  settings = {
    skipDetailedCheck: false,
    contains: {
      upper: true,
      lower: true,
      number: true,
      special: true,
    },
    min: 8,
    max: 64,
  }
) {
  const validation = {};
  if (password === undefined || password === "") {
    return [false, validation];
  }
  const { min, max, contains } = settings;
  const { upper, lower, number, special } = contains;
  const length = password.length;

  const lowerRegEx = lower && "(?=.*[a-z])",
    upperRegEx = upper && "(?=.*[A-Z])",
    numberRegEx = number && "(?=.*[\\d])",
    specialRegEx = special && "(?=.*[!@#$%^&*])",
    lenRegEx = min && `.{${min},${max > 0 ? max : ""}}`;

  if (skipDetailedCheck) {
    // conditionally build the full regex string.
    const regStr = "/";
    if (lowerRegEx) regStr += lowerRegEx;
    if (upperRegEx) regStr += upperRegEx;
    if (numberRegEx) regStr += numberRegEx;
    if (specialRegEx) regStr += specialRegEx;
    if (lenRegEx) regStr += lenRegEx;
    regEx += "/";
    const regEx = new RegExp(regStr);
    return [password.test(regEx), validation];
  }

  // validation tests
  if (lower) validation.hasLower = password.test(new RegExp(lowerRegEx));
  if (upper) validation.hasUpper = password.test(new RegExp(upperRegEx));
  if (number) validation.hasNumber = password.test(new RegExp(numberRegEx));
  if (special) validation.hasSpecial = password.test(new RegExp(specialRegEx));
  if (min) validation.correctLength = length > min;
  if (max) validation.correctLength = length < max;

  // true if all entries in vResults is true.
  const success = Object.entries(validation).every(([_, val]) => val === true);
  return [success, validation];
}
