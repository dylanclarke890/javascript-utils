export const ip_prefix =
  "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}";
// allows 0 or 255 as the final octet due to CIDR
export const ip =
  ip_prefix +
  "(?:25[0-5]|2[0-4][0-9]|[01]?[1-9][0-9]|[01]?0[1-9]|[12]00|[0-9])\\b";
// must permit numbers as valid host identifiers that are being used in the wild in FQDNs
export const hostname =
  "\\b[A-Za-z0-9](?:[A-Za-z0-9_\\-]{0,61}[a-zA-Z0-9])?\\b";
export const domain = "\\b[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\b";
export const directoryName = "[/\\w\\s\\\\.:,*()=%?+-]+";
export const filename = directoryName + "[^/]";
export const rwxt = "[r-][w-][x-][r-][w-][x-][r-][w-][xt-]";
export const subnet =
  "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[1-9][0-9]|[01]?0[1-9]|[12]00|[0-9])\\b";
export const mac =
  "\\b[0-9A-Fa-f]{1,2}[:-](?:[0-9A-Fa-f]{1,2}[:-]){4}[0-9A-Fa-f]{1,2}\\b";
export const process_name = "\\s*[\\w./<>-][\\w\\s./<>-]+";
export const url_path_suffix = "/(?:[\\w.,:/%&?#!=*|\\[\\]~+-]+)?"; // there is an RFC3987 regex but it's gigantic, this is easier to reason about and serves most needs
export const user = "\\b[A-Za-z0-9][A-Za-z0-9\\._-]*[A-Za-z0-9]\\b";
export const column = "\\b[\\w:]+\\b";
export const threshold_range =
  "^(@)?(-?\\d+(?:\\.\\d+)?)(:)(-?\\d+(?:\\.\\d+)?)?$";
export const threshold_simple = "^(-?\\d+(?:\\.\\d+)?)$";
export const label = "\\s*[\\%\\(\\)\\/\\*\\w-][\\%\\(\\)\\/\\*\\w\\s-]*";
export const version = "\\d(\\.\\d+)*";
export const version_lax = version + "-?.*";
