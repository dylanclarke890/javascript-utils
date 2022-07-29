/** A collection of various regexes.*/

const AWS = {
  //from http://blogs.aws.amazon.com/security/blog/tag/key+rotation
  access_key: "(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])",
  host_ip: "\\bip-\\d+-\\d+-\\d+-\\d+\\b",
  secret_key: "(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])",
};
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
