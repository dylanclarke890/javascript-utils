/** A collection of various regexes.*/

// TODO: update to JS RegExp
//from http://blogs.aws.amazon.com/security/blog/tag/key+rotation
const AWS_access_key = "(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])";
const AWS_host_ip = "\\bip-\\d+-\\d+-\\d+-\\d+\\b";
const AWS_secret_key =
  "(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])";
const ip_prefix = "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}";
// allows 0 or 255 as the final octet due to CIDR
const ip =
  ip_prefix +
  "(?:25[0-5]|2[0-4][0-9]|[01]?[1-9][0-9]|[01]?0[1-9]|[12]00|[0-9])\\b";
// must permit numbers as valid host identifiers that are being used in the wild in FQDNs
const hostname = "\\b[A-Za-z0-9](?:[A-Za-z0-9_\\-]{0,61}[a-zA-Z0-9])?\\b";
const domain = "\\b[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\b";
const dirname = "[/\\w\\s\\\\.:,*()=%?+-]+";
const filename = dirname + "[^/]";
const rwxt = "[r-][w-][x-][r-][w-][x-][r-][w-][xt-]";
const subnet =
  "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[1-9][0-9]|[01]?0[1-9]|[12]00|[0-9])\\b";
const mac =
  "\\b[0-9A-Fa-f]{1,2}[:-](?:[0-9A-Fa-f]{1,2}[:-]){4}[0-9A-Fa-f]{1,2}\\b";
const process_name = "\\s*[\\w./<>-][\\w\\s./<>-]+";
const url_path_suffix = "/(?:[\\w.,:/%&?#!=*|\\[\\]~+-]+)?"; // there is an RFC3987 regex but it's gigantic, this is easier to reason about and serves most needs
const user = "\\b[A-Za-z0-9][A-Za-z0-9\\._-]*[A-Za-z0-9]\\b";
const column = "\\b[\\w:]+\\b";
const ldap_dn = "\\b\\w+=[\\w\\s-]+(?:,\\w+=[\\w\\s-]+)*\\b";
const threshold_range = "^(@)?(-?\\d+(?:\\.\\d+)?)(:)(-?\\d+(?:\\.\\d+)?)?$";
const threshold_simple = "^(-?\\d+(?:\\.\\d+)?)$";
const label = "\\s*[\\%\\(\\)\\/\\*\\w-][\\%\\(\\)\\/\\*\\w\\s-]*";
const version = "\\d(\\.\\d+)*";
const version_lax = version + "-?.*";
const http_url =
  /^(?:(?:https?:)\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

export function filterInt(str) {
  let filtered = str.replace(/[^0-9]/g, "");
  filtered = filtered.replace(/^[0]+([1-9])/, "$1");
  filtered = filtered.replace(/^[0]+$/, "0");
  if (str && filtered.length && str[0] === "-") {
    filtered = `-${filtered}`;
  }
  return filtered;
}

export function filterFloat(str) {
  let filtered = str.replace(/[^0-9.]/g, "");
  const regex = /(\..*)\./g;
  const replace = "$1";
  do {
    filtered = filtered.replace(regex, replace);
  } while (filtered != filtered.replace(regex, replace));
  filtered === "." ? (filtered = "0.") : filtered;
  filtered = filtered.replace(/^[0]+([1-9])/, "$1");
  filtered = filtered.replace(/^[0]+($|\.)/, "0$1");
  if (str && filtered.length && str[0] === "-") {
    filtered = `-${filtered}`;
  }
  return filtered;
}
