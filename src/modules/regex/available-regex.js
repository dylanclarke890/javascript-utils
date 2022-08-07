import mapCodeRegex from "./mapcode-regex";
const availableRegex = {};

class RegexInfo {
  /**
   * @param {Object} data
   * @param {RegExp} data.displayName The display name when returning info to the user. Required.
   * @param {RegExp} data.source The RegExp literal. Required.
   * @param {description} [data.description] Optional description string.
   * @param {Array<string>} [data.examples] Optional examples array.
   * @param {boolean} [data.allowChange] Optional flag for if RegExp flags can be added.
   * Set to false for RegExp that already include flags. Defaults to true.
   */
  constructor(
    data = { displayName, source, description, examples, allowChange }
  ) {
    if (!data || !data.source || !data.displayName)
      throw new Error("Expected a source and displayName value");
    this.source = data.source;
    this.description = data.description;
    this.examples = data.examples;
    this.allowChange =
      data.allowChange !== undefined && data.allowChange !== null
        ? data.allowChange
        : true;
  }
}

/********************************************************************************************
 *                                      A W S
 */

availableRegex.aws_access_key = new RegexInfo({
  allowChange: true,
  description:
    "Looks for 20-character, uppercase, alphanumeric strings that don't have any uppercase, alphanumeric characters immediately before or after.",
  displayName: "AWS Access Key",
  examples: ["AKIAIOSFODNN7EXAMPLE"],
  source: /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/,
});

availableRegex.aws_default_private_hostname = new RegexInfo({
  allowChange: true,
  description: "Format is usually 'ip-xxx-xxx-xxx-xxx'.",
  displayName: "AWS Default Private Hostname",
  examples: ["ip-10-96-2-123"],
  source: /ip(-[0-9]{1,3}){4}/,
});

availableRegex.aws_host_ip = new RegexInfo({
  allowChange: true,
  description: "",
  displayName: "AWS Host IP",
  examples: [],
  source: /\\bip-\\d+-\\d+-\\d+-\\d+\\b/,
});

availableRegex.aws_secret_key = new RegexInfo({
  allowChange: true,
  description:
    "Looks for 40-character, base-64 strings that don't have any base 64 characters immediately before or after.",
  displayName: "AWS Secret Key",
  examples: ["wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"],
  source: /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/,
});

/********************************************************************************************
 *                                 F I L E  S Y S T E M
 */

availableRegex.directory = new RegexInfo({
  allowChange: true,
  description: "",
  displayName: "Directory",
  examples: [""],
  source: /[\w+\/]+/,
});

availableRegex.file_path = new RegexInfo({
  allowChange: true,
  description: "",
  displayName: "File Path",
  examples: [""],
  source: /(.+)\/([^\/]+)/,
});

/********************************************************************************************
 *                                 I N T E R N E T
 */

availableRegex.http_url = new RegexInfo({
  allowChange: true,
  description: "",
  displayName: "HTTP Url",
  examples: ["www.example.com"],
  source:
    /(?:(?:https?:)\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?/,
});

availableRegex.ipv4 = new RegexInfo({
  allowChange: true,
  description: "",
  examples: ["257.120.223.13"],
  displayName: "IPv4",
  source:
    /((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])/,
});

availableRegex.ipv6 = new RegexInfo({
  allowChange: true,
  description: "",
  displayName: "IPv6",
  examples: ["fffe:3465:efab:23fe:2235:6565:aaab:0001"],
  source: /((([0-9a-fA-F]){1,4})\\:){7}([0-9a-fA-F]){1,4}/,
});

availableRegex.ldap_dn = new RegexInfo({
  allowChange: true,
  description:
    "A DN is a sequence of relative distinguished names (RDN) connected by commas.",
  displayName: "LDAP Distinguished Names",
  examples: [
    "DC=gr-u,DC=it",
    "CN=View-Only Organization Management,OU=Microsoft Exchange Security Groups,DC=gr-u,DC=it",
  ],
  source: /((CN=([^,]*)),)?((((?:CN|OU)=[^,]+,?)+),)?((DC=[^,]+,?)+)/,
});

availableRegex.mac_address = new RegexInfo({
  allowChange: true,
  description:
    "Mac address is a unique identifier assigned to network interface controllers like WiFi routers, Ethernet controllers, etc. It has a format of six groups of 2 hexadecimal digits separated by dash or colon.",
  displayName: "IEEE 802 MAC Address",
  examples: ["00:00:5e:00:53:af"],
  source: /(?:[0-9A-Fa-f]{2}[:-]){5}(?:[0-9A-Fa-f]{2})/,
});

availableRegex.subnet_mask = new RegexInfo({
  allowChange: true,
  description: "",
  displayName: "Subnet Mask",
  examples: ["255.255.255.255", "224.0.0.0"],
  source:
    /(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))/,
});

availableRegex.url = new RegexInfo({
  allowChange: true,
  description: "Will match most common url formats.",
  displayName: "Generic Url",
  examples: ["www.example.com"],
  source:
    /(?:http|https|ftp|mailto|file|data|irc):\/\/[A-Za-z0-9\-]{0,63}(\.[A-Za-z0-9\-]{0,63})+(:\d{1,4})?\/*(\/*[A-Za-z0-9\-._]+\/*)*(\?.*)?(#.*)?/,
});

/********************************************************************************************
 *                                    M I S C
 */

availableRegex.hsl_color = new RegexInfo({
  allowChange: true,
  description: "",
  displayName: "HSL Color",
  examples: ["hsl(227, 100%, 100%)"],
  source: /hsl\((\d{1,3}), (\d{1,3})%, (\d{1,3})%\)/,
});

availableRegex.js_block_comment = new RegexInfo({
  allowChange: false,
  description: "Matches against JS block comments (i.e /**/).",
  displayName: "JavaScript Block Comment",
  examples: ["/* something */", "/** @returns some stuff. */"],
  source: /\/\*(.*?)\*\//gms,
});

availableRegex.js_line_comment = new RegexInfo({
  allowChange: false,
  description: "Matches against JS line comments (i.e //).",
  displayName: "JavaScript Line Comment",
  examples: ["// something", "// this is a comment"],
  source: /(?:^|\s)\/\/(.+?)$/gms,
});

availableRegex.scoped_npm_package = new RegexInfo({
  allowChange: true,
  description: "",
  displayName: "Scoped NPM Package Name",
  examples: [],
  source: /@[a-z\\d][\\w-.]+\/[a-z\\d][\\w-.]*/,
});

availableRegex.uuid = new RegexInfo({
  allowChange: true,
  description: "",
  displayName: "UUID",
  examples: ["123e4567-e89b-12d3-a456-426655440000"],
  source:
    /([A-Z]|[a-z]|[0-9]){8}(-([A-Z]|[a-z]|[0-9]){4}){3}-([A-Z]|[a-z]|[0-9]){12}/,
});

/********************************************************************************************
 *                               V A L I D A T I O N
 */

availableRegex.address = new RegexInfo({
  allowChange: true,
  description: "Matches against physical addresses",
  displayName: "Address",
  examples: [],
  source: /[A-Za-z0-9\.\s,\-:\n]+/,
});

availableRegex.alphanumberic = new RegexInfo({
  allowChange: true,
  description: "Check a string only contains numbers or letters",
  displayName: "Alphanumeric",
  examples: [],
  source: /[A-Za-z0-9]/,
});

availableRegex.credit_card_amex = new RegExp({
  allowChange: true,
  description: "Does not account for whitespace.",
  displayName: "American Express Credit Card",
  examples: ["376418333333333"],
  source: /(3[47][0-9]{13})/,
});

availableRegex.credit_card_general = new RegExp({
  allowChange: true,
  description:
    "Will validate all major credit cards: American Express (Amex), Discover, Mastercard, and Visa.",
  displayName: "General Credit Card",
  examples: [],
  source:
    /(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})/,
});

availableRegex.credit_card_mastercard = new RegExp({
  allowChange: true,
  description: "",
  displayName: "MasterCard Credit Card",
  examples: [],
  source: /(5[1-5][0-9]{14})/,
});

availableRegex.credit_card_visa = new RegExp({
  allowChange: true,
  description: "",
  displayName: "Visa Credit Card",
  examples: [],
  source: /(4[0-9]{12}(?:[0-9]{3})?)/,
});

availableRegex.date_dmy = new RegexInfo({
  allowChange: true,
  description:
    "Optional separators are spaces, hyphens, forward slashes, and periods. The year is limited between 1900 and 2099.",
  displayName: "DD/MM/YYYY Date",
  examples: ["31/12/2000"],
  source:
    /(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}/,
});

availableRegex.date_iso = new RegexInfo({
  allowChange: true,
  description: "",
  displayName: "ISO8601 date string",
  examples: ["2020-03-12T13:34:56.123Z"],
  source:
    /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?/,
});

availableRegex.date_mdy = new RegexInfo({
  allowChange: true,
  description:
    "Commonly used in the US, CAD and Phillipines. Optional separators are spaces, hyphens, forward slashes, and periods. The year is limited between 1900 and 2099.",
  displayName: "MM/DD/YYYY Date",
  examples: ["12/31/2000"],
  source:
    /(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}/,
});

availableRegex.email = new RegexInfo({
  allowChange: true,
  description: "Will match most common formats.",
  displayName: "Email Address",
  examples: ["testemail@test.com"],
  source: /[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/,
});

availableRegex.phone_na = new RegexInfo({
  allowChange: true,
  description:
    "Will validate a 10-digit North American telephone number. Separators are not required, but can include spaces, hyphens, or periods. Parentheses around the area code are also optional.",
  displayName: "North American Phone Number",
  examples: [],
  source: /(([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+/,
});

availableRegex.phone_nanp = new RegexInfo({
  allowChange: true,
  description: "Ensures a phone number is in the NANP format (XXX-NXX-XXXX).",
  displayName: "NANP Phone Number",
  examples: ["123-456-7890"],
  source: /(?:\(?\d{3})?\)?[- ]?[2-9]\d{2}[- ]?\d{4}/,
});

availableRegex.postcode_cad = new RegexInfo({
  allowChange: true,
  description: "",
  displayName: "Canadian PostCode",
  examples: [""],
  source: /[ABCEGHJKLMNPRSTVXY][0-9][A-Z] [0-9][A-Z][0-9]/,
});

availableRegex.postcode_uk = new RegexInfo({
  allowChange: true,
  description: "",
  displayName: "UK PostCode",
  examples: ["M30 7DP"],
  source: /([A-Z]{1,2}[0-9][A-Z0-9]? [0-9][ABD-HJLNP-UW-Z]{2})/,
});

availableRegex.map_code = new RegexInfo({
  allowChange: true,
  description: "Looks for any valid map code.",
  displayName: "Map Code",
  examples: ["TOM", "Saint Martin, Collectivity of", "Wyoming"],
  source: mapCodeRegex,
});

availableRegex.social_security = new RegexInfo({
  allowChange: true,
  description: "",
  displayName: "US Social Security Numbers",
  examples: ["2020-03-12T13:34:56.123Z"],
  source: /([0-9]{3}[-]*[0-9]{2}[-]*[0-9]{4})*/,
});

availableRegex.strong_password = new RegexInfo({
  allowChange: true,
  description:
    "Look for an upper and lower case character, a number and a special character.",
  displayName: "Strong Password",
  examples: ["AStrongPassword123!"],
  source: /(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*]){8,64}/,
});

availableRegex.us_state = new RegexInfo({
  allowChange: true,
  description: "Validates abbreviated state names.",
  displayName: "US State",
  examples: [""],
  source:
    /(?:A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])/,
});

availableRegex.us_state = new RegexInfo({
  allowChange: true,
  description:
    "Validates US ZIP Codes, with an optional 4 number ZIP code extension.",
  displayName: "US State",
  examples: [""],
  source: /([0-9]{5}(?:-[0-9]{4})?)/,
});

Object.freeze(availableRegex);
export default availableRegex;
