// must permit numbers as valid host identifiers that are being used in the wild in FQDNs
export const hostname =
  "\\b[A-Za-z0-9](?:[A-Za-z0-9_\\-]{0,61}[a-zA-Z0-9])?\\b";
export const rwxt = "[r-][w-][x-][r-][w-][x-][r-][w-][xt-]";
export const process_name = "\\s*[\\w./<>-][\\w\\s./<>-]+";
export const user = "\\b[A-Za-z0-9][A-Za-z0-9\\._-]*[A-Za-z0-9]\\b";
export const column = "\\b[\\w:]+\\b";
export const label = "\\s*[\\%\\(\\)\\/\\*\\w-][\\%\\(\\)\\/\\*\\w\\s-]*";
export const version = "\\d(\\.\\d+)*";
export const version_lax = version + "-?.*";
