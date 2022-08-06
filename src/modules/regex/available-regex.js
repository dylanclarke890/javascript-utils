const availableRegex = Object.freeze({
  email:
    /[^\\.\\s@:](?:[^\\s@:]*[^\\s@:\\.])?@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*.(?:\w|.){2,}/,
  strong_password: /(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*]){8,64}/,
  scoped_npm_package: /@[a-z\\d][\\w-.]+\/[a-z\\d][\\w-.]*/,
  js_comment: /(?:(?:^|\s)\/\/(.+?))|(?:\/\*(.*?)\*\/)/,
  map_code: mapcodeRegex,
});

export default availableRegex;
