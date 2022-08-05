/**********************************************************************************************
 *                          C O M M O N
 */

export const email =
  "[^\\.\\s@:](?:[^\\s@:]*[^\\s@:\\.])?@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*";
export function emailRegex(exact) {
  return exact ? new RegExp(`^${regex}$`) : new RegExp(regex, "g");
}

const regex = "@[a-z\\d][\\w-.]+/[a-z\\d][\\w-.]*";
/**
 * Regular expression for matching scoped npm package names.
 * @param {boolean} exact only match exact strings.
 * @returns {RegExp} a RegExp for matching scoped package names.
 */
export function scopedRegex(exact) {
  return exact ? new RegExp(`^${regex}$`, "i") : new RegExp(regex, "gi");
}

// TODO: update below to JS RegExp

/**********************************************************************************************
 *                            A W S
 */
//from http://blogs.aws.amazon.com/security/blog/tag/key+rotation
export const AWS_access_key = "(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])";
export const AWS_host_ip = "\\bip-\\d+-\\d+-\\d+-\\d+\\b";
export const AWS_secret_key =
  "(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])";

/**********************************************************************************************
 *                      I P  A N D  W E B  S E R V I C E S
 */
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
export const ldap_dn = "\\b\\w+=[\\w\\s-]+(?:,\\w+=[\\w\\s-]+)*\\b";
export const threshold_range =
  "^(@)?(-?\\d+(?:\\.\\d+)?)(:)(-?\\d+(?:\\.\\d+)?)?$";
export const threshold_simple = "^(-?\\d+(?:\\.\\d+)?)$";
export const label = "\\s*[\\%\\(\\)\\/\\*\\w-][\\%\\(\\)\\/\\*\\w\\s-]*";
export const version = "\\d(\\.\\d+)*";
export const version_lax = version + "-?.*";
export const http_url =
  /^(?:(?:https?:)\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

/**********************************************************************************************
 *                      F I L T E R  M E T H O D S
 */

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

/**********************************************************************************************
 *                      M I S C  R E G E X
 */

export const hslColorRegex = /hsl\((\d{1,3}), (\d{1,3})%, (\d{1,3})%\)/g;

/**********************************************************************************************
 *                      E S C A P E  R E G E X P  S T R I N G S
 */

/**
 * Escapes special characters for a JS regex. More reliable version of `escapeRegExp(text)`.
 * @param {string} text The string to escape.
 * @return {string} The same string with special regex characters escaped.
 */
export default function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  // Escape characters with special meaning either inside or outside character sets.
  // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

/**
 * Escapes special characters for a JS regex.
 * @see https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript#answer-9310752
 * @param {string} text The string to escape.
 * @return {string} The same string with special regex characters escaped.
 */
export function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

/**********************************************************************************************
 *                          J S  C O M M E N T S  R E G E X
 */

export const lineCommentRegex = /(?:^|\s)\/\/(.+?)$/gms;
export const blockCommentRegex = /\/\*(.*?)\*\//gms;
export function commentRegex() {
  return new RegExp(
    `(?:${lineCommentRegex().source})|(?:${blockCommentRegex().source})`,
    "gms"
  );
}

// longest RegExp I've ever seen
export const mapcodeRegex =
  /(?:(11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|91|92|AAA|AB|ABW|AC|ACT|AD|AFG|AG|AGO|AGU|AH|AIA|AK|AL|ALA|ALB|ALT|AM|AMU|AN|AND|AP|AR|ARE|ARG|ARK|ARM|AS|ASC|ASM|AST|ATA|ATF|ATG|AU|AU-ACT|AU-CC|AU-CX|AU-HM|AU-JBT|AU-NF|AU-NSW|AU-NT|AU-QLD|AU-SA|AU-TAS|AU-VIC|AU-WA|AUS|AUT|AZ|AZE|Aaland Islands|Acre|Adygea Republic|Afghanistan, Islamic Republic of|Aguascalientes|Alabama|Alagoas|Alaska|Albania, Republic of|Alberta|Algeria, People's Democratic Republic of|Altai Krai|Altai Republic|Amapa|Amazonas|American Samoa|Amur Oblast|Andaman and Nicobar|Andhra Pradesh|Andorra, Principality of|Angola, Republic of|Anguilla|Anhui Province|Antarctica|Antigua and Barbuda|Argentina|Arizona|Arkansas|Arkhangelsk Oblast|Armenia, Republic of|Aruba|Arunachal Pradesh|Assam|Astrakhan Oblast|Australia, Commonwealth of|Australian Capital Territory|Austria, Republic of|Azerbaijan, Republic of|BA|BC|BCN|BCS|BDI|BE|BEL|BEN|BES|BFA|BGD|BGR|BHR|BHS|BIH|BJ|BLM|BLR|BLZ|BMU|BOL|BR|BR-AC|BR-AL|BR-AM|BR-AP|BR-BA|BR-CE|BR-DF|BR-ES|BR-GO|BR-MA|BR-MG|BR-MS|BR-MT|BR-PA|BR-PB|BR-PE|BR-PI|BR-PR|BR-RJ|BR-RN|BR-RO|BR-RR|BR-RS|BR-SC|BR-SE|BR-SP|BR-TO|BRA|BRB|BRN|BRY|BS|BTN|BU|BVT|BWA|Bahamas, Commonwealth of the|Bahia|Bahrain, Kingdom of|Baja California|Baja California Sur|Bangladesh, People's Republic of|Barbados|Bashkortostan Republic|Beijing Municipality|Belarus, Republic of|Belgium, Kingdom of|Belgorod Oblast|Belize|Benin, Republic of|Bermuda|Bhutan, Kingdom of|Bihar|Bolivia, Plurinational State of|Bonaire, St Eustasuis and Saba|Bosnia and Herzegovina|Botswana, Republic of|Bouvet Island|Brazil, Federative Republic of|British Columbia|British Indian Ocean Territory|British Virgin Islands|Brunei, Nation of|Bryansk Oblast|Bulgaria, Republic of|Burkina Faso|Burundi, Republic of|Buryatia Republic|CA|CA-AB|CA-BC|CA-MB|CA-NB|CA-NL|CA-NS|CA-NT|CA-NU|CA-ON|CA-PE|CA-QC|CA-SK|CA-YT|CAF|CAM|CAN|CC|CCK|CE|CG|CH|CHE|CHH|CHL|CHN|CHP|CHU|CIV|CL|CM|CMR|CN|CN-11|CN-12|CN-13|CN-14|CN-15|CN-21|CN-22|CN-23|CN-31|CN-32|CN-33|CN-34|CN-35|CN-36|CN-37|CN-41|CN-42|CN-43|CN-44|CN-45|CN-46|CN-50|CN-51|CN-52|CN-53|CN-54|CN-61|CN-62|CN-63|CN-64|CN-65|CN-71|CN-91|CN-92|CN-AH|CN-BJ|CN-CQ|CN-FJ|CN-GD|CN-GS|CN-GX|CN-GZ|CN-HA|CN-HB|CN-HE|CN-HI|CN-HK|CN-HL|CN-HN|CN-JL|CN-JS|CN-JX|CN-LN|CN-MC|CN-NM|CN-NX|CN-QH|CN-SC|CN-SD|CN-SH|CN-SN|CN-SX|CN-TJ|CN-TW|CN-XJ|CN-XZ|CN-YN|CN-ZJ|CO|COA|COD|COG|COK|COL|COM|CPT|CPV|CQ|CRI|CS|CT|CU|CUB|CUW|CX|CXR|CYM|CYP|CZE|California|Cambodia, Kingdom of|Cameroon, Republic of|Campeche|Canada|Cape Verde|Cayman islands|Ceara|Central African Republic|Chad, Republic of|Chandigarh|Chechen Republic|Chelyabinsk Oblast|Chhattisgarh|Chiapas|Chihuahua|Chile, Republic of|China, People's Republic of|Chongqing Municipality|Christmas Island|Chukotka Okrug|Chuvash Republic|Clipperton Island|Coahuila|Cocos Islands|Colima|Colombia, Republic of|Colorado|Comoros, Union of the|Congo-Brazzaville|Congo-Kinshasa|Connecticut|Cook Islands|Costa Rica, Republic of|Croatia, Republic of|Cuba, Republic of|Curacao|Cyprus, Republic of|Czech Republic|DA|DC|DD|DE|DEU|DF|DG|DGA|DIF|DJI|DL|DMA|DN|DNK|DOM|DUR|DZA|Dadra and Nagar Haveli|Dagestan Republic|Daman and Diu|Delaware|Delhi, National Capital Territory of|Denmark, Kingdom of|District of Columbia|Distrito Federal|Djibouti, Republic of|Dominica, Commonwealth of|Dominican Republic|Durango|ECU|EGY|ERI|ES|ESH|ESP|EST|ETH|Ecuador, Republic of|Egypt, Arab Republic of|El Salvador, Republic of|Equatorial Guinea, Republic of|Eritrea, State of|Espirito Santo|Estonia, Republic of|Ethiopia, Federal Democratic Republic of|FIN|FJ|FJI|FL|FLK|FRA|FRO|FSM|Falkland Islands|Faroe Islands|Federal District|Fiji, Republic of|Finland, Republic of|Florida|France|French Guiana|French Polynesia, Collectivity of|French Southern and Antarctic Lands|Fujian Province|GA|GAB|GBR|GD|GEO|GGY|GHA|GIB|GIN|GJ|GLP|GMB|GNB|GNQ|GO|GR|GRC|GRD|GRL|GRO|GS|GT|GTM|GU|GUA|GUF|GUM|GUY|GX|GZ|Gabon|Gambia, Republic of the|Gansu Province|Georgia|Germany, Federal Republic of|Ghana, Republic of|Gibraltar|Goa|Goias|Greece|Greenland|Grenada|Guadeloupe|Guam|Guanajuato|Guangdong Province|Guangxi Zhuang Autonomous Region|Guatemala, Republic of|Guernsey, Bailiwick of|Guerrero|Guinea, Republic of|Guinea-Bissau, Republic of|Guizhou Province|Gujarat|Guyana, Co-operative Republic of|HA|HB|HE|HG|HI|HID|HK|HKG|HL|HM|HMD|HN|HND|HP|HR|HRV|HTI|HUN|Hainan Province|Haiti, Republic of|Haryana|Hawaii|Heard Island and McDonald Islands|Hebei Province|Heilongjiang Province|Henan Province|Hidalgo|Himachal Pradesh|Honduras, Republic of|Hong Kong|Hubei Province|Hunan Province|Hungary, Republic of|IA|ID|IDN|IL|IMN|IN|IN-AN|IN-AP|IN-AR|IN-AS|IN-BR|IN-CG|IN-CH|IN-CT|IN-DD|IN-DL|IN-DN|IN-GA|IN-GJ|IN-HP|IN-HR|IN-JH|IN-JK|IN-KA|IN-KL|IN-LD|IN-MH|IN-ML|IN-MN|IN-MP|IN-MZ|IN-NL|IN-OD|IN-OR|IN-PB|IN-PY|IN-RJ|IN-SK|IN-TG|IN-TN|IN-TR|IN-UK|IN-UP|IN-UT|IN-WB|IND|IOT|IRK|IRL|IRN|IRQ|ISL|ISR|ITA|IVA|Iceland|Idaho|Illinois|India, Republic of|Indiana|Indonesia, Republic of|Ingushetia|International|Iowa|Iran, Islamic Republic of|Iraq, Republic of|Ireland, Republic of|Irkutsk Oblast|Isle of Mann|Israel, State of|Italy|Ivanovo Oblast|Ivory Coast|JA|JAL|JAM|JBT|JEY|JH|JK|JL|JOR|JPN|JS|JTN|JX|Jalisco|Jamaica|Jammu and Kashmir|Japan|Jersey, Bailiwick of|Jervis Bay Territory|Jewish Autonomous Oblast|Jharkhand|Jiangsu Province|Jiangxi Province|Jilin Province|Jordan, Hashemite Kingdom of|KA|KAM|KAZ|KB|KC|KDA|KEM|KEN|KGD|KGN|KGZ|KHA|KHM|KI|KIR|KK|KL|KLU|KM|KNA|KO|KOR|KOS|KR|KRS|KS|KWT|KY|KYA|Kabardino-Balkar Republic|Kaliningrad Oblast|Kalmykia Republic|Kaluga Oblast|Kamchatka Krai|Kansas|Karachay-Cherkess Republic|Karelia Republic|Karnataka|Kazakhstan, Republic of|Kemerovo Oblast|Kentucky, Commonwealth of|Kenya, Republic of|Kerala|Khabarovsk Krai|Khakassia Republic|Khanty-Mansi|Kiribati, Republic of|Kirov Oblast|Komi Republic|Kostroma Oblast|Krasnodar Krai|Krasnoyarsk Krai|Kurgan Oblast|Kursk Oblast|Kuwait, State of|Kyrgyzstan|LA|LAO|LBN|LBR|LBY|LCA|LD|LEN|LIE|LIP|LKA|LN|LSO|LTU|LUX|LVA|Lakshadweep|Laos|Latvia, Republic of|Lebanon|Leningrad Oblast|Lesotho, Kingdom of|Liaoning Province|Liberia, Republic of|Libya|Liechtenstein, Principality of|Lipetsk Oblast|Lithuania, Republic of|Louisiana|Luxembourg, Grand Duchy of|MA|MAC|MAF|MAG|MAR|MB|MC|MCO|MD|MDA|MDG|MDV|ME|MEX|MG|MH|MHL|MI|MIC|MID|MKD|ML|MLI|MLT|MMR|MN|MNE|MNG|MNP|MO|MOR|MOS|MOW|MOZ|MP|MRT|MS|MSR|MT|MTQ|MUR|MUS|MWI|MX|MX-AG|MX-AGU|MX-BC|MX-BCN|MX-BCS|MX-BS|MX-CAM|MX-CH|MX-CHH|MX-CHP|MX-CL|MX-CM|MX-CO|MX-COA|MX-COL|MX-CS|MX-DF|MX-DG|MX-DIF|MX-DUR|MX-GR|MX-GRO|MX-GT|MX-GUA|MX-HG|MX-HID|MX-JA|MX-JAL|MX-ME|MX-MEX|MX-MI|MX-MIC|MX-MO|MX-MOR|MX-MX|MX-NA|MX-NAY|MX-NL|MX-NLE|MX-OA|MX-OAX|MX-PB|MX-PUE|MX-QE|MX-QR|MX-QUE|MX-ROO|MX-SI|MX-SIN|MX-SL|MX-SLP|MX-SO|MX-SON|MX-TAB|MX-TAM|MX-TB|MX-TL|MX-TLA|MX-TM|MX-VE|MX-VER|MX-YU|MX-YUC|MX-ZA|MX-ZAC|MYS|MYT|MZ|Macau|Macedonia, Republic of|Madagascar, Republic of|Madhya Pradesh|Magadan Oblast|Maharashtra|Maine|Malawi, Republic of|Malaysia|Maldives, Republic of|Mali, Republic of|Malta, Republic of|Manipur|Manitoba|Maranhao|Mari El Republic|Marshall Islands, Republic of the|Martinique|Maryland|Massachusetts, Commonwealth of|Mato Grosso|Mato Grosso do Sul|Mauritania, Islamic Republic of|Mauritius, Republic of|Mayotte|Meghalaya|Mexico|Mexico State|Michigan|Michoacan|Micronesia|Minas Gerais|Minnesota|Mississippi|Missouri|Mizoram|Moldova, Republic of|Monaco, Principality of|Mongolia|Montana|Montenegro|Montserrat|Mordovia Republic|Morelos|Morocco, Kingdom of|Moscow|Moscow Oblast|Mozambique, Republic of|Murmansk Oblast|Myanmar, Republic of the Union of|NA|NAM|NAY|NB|NC|NCL|ND|NE|NEN|NER|NF|NFK|NGA|NGR|NH|NIC|NIU|NIZ|NJ|NL|NLD|NLE|NM|NOR|NPL|NRU|NS|NSW|NT|NU|NV|NVS|NX|NY|NZL|Nagaland|Namibia, Republic of|Nauru, Republic of|Nayarit|Nebraska|Nei Mongol Autonomous Region|Nenets Autonomous Okrug|Nepal, Federal Democratic Republic of|Netherlands, Kingdom of the|Nevada|New Brunswick|New Caledonia|New Hampshire|New Jersey|New Mexico|New South Wales|New York|New Zealand|Newfoundland and Labrador|Nicaragua, Republic of|Niger, Republic of|Nigeria, Federal Republic of|Ningxia Hui Autonomous Region|Niue|Nizhny Novgorod Oblast|Norfolk and Philip Island|North Carolina|North Dakota|North Korea|North Ossetia-Alania Republic|Northern Mariana Islands, Commonwealth of the|Northern Territory|Northwest Territories|Norway, Kingdom of|Nova Scotia|Novgorod Oblast|Novosibirsk Oblast|Nuevo Leon|Nunavut|OA|OAX|OD|OH|OK|OMN|OMS|ON|OR|ORE|ORL|Oaxaca|Odisha|Ohio|Oklahoma|Oman, Sultanate of|Omsk Oblast|Ontario|Oregon|Orenburg Oblast|Oryol Oblast|PA|PAK|PAN|PB|PCN|PE|PER|PHL|PI|PLW|PM|PNG|PNZ|PO|POL|PR|PRI|PRK|PRT|PRY|PSE|PSK|PUE|PY|PYF|Pakistan, Islamic Republic of|Palau, Republic of|Palestinian territories|Panama, Republic of|Papua New Guinea, Independent State of|Para|Paraguay, Republic of|Paraiba|Parana|Pennsylvania, Commonwealth of|Penza Oblast|Perm Krai|Pernambuco|Peru, Republic of|Philippines, Republic of the|Piaui|Pitcairn Islands|Poland, Republic of|Portugal|Primorsky Krai|Prince Edward Island|Pskov Oblast|Puducherry|Puebla|Puerto Rico, Commonwealth of|Punjab|QAT|QC|QE|QH|QLD|QR|QUE|Qatar, State of|Qinghai Province|Quebec|Queensland|Queretaro|Quintana Roo|REU|RI|RJ|RN|RO|ROO|ROS|ROU|RR|RS|RU|RU-AD|RU-AL|RU-ALT|RU-AMU|RU-ARK|RU-AST|RU-BA|RU-BE|RU-BEL|RU-BRY|RU-BU|RU-CE|RU-CH|RU-CHE|RU-CHU|RU-CU|RU-DA|RU-IN|RU-IRK|RU-IVA|RU-KAM|RU-KB|RU-KC|RU-KDA|RU-KEM|RU-KGD|RU-KGN|RU-KHA|RU-KHM|RU-KI|RU-KIR|RU-KK|RU-KL|RU-KLU|RU-KM|RU-KO|RU-KOS|RU-KR|RU-KRS|RU-KYA|RU-LEN|RU-LIP|RU-MAG|RU-ME|RU-MO|RU-MOS|RU-MOW|RU-MUR|RU-NEN|RU-NGR|RU-NIZ|RU-NVS|RU-OMS|RU-ORE|RU-ORL|RU-PER|RU-PM|RU-PNZ|RU-PO|RU-PRI|RU-PSK|RU-ROS|RU-RYA|RU-SA|RU-SAK|RU-SAM|RU-SAR|RU-SE|RU-SMO|RU-SPE|RU-STA|RU-SVE|RU-TA|RU-TAM|RU-TOM|RU-TT|RU-TUL|RU-TVE|RU-TY|RU-TYU|RU-UD|RU-ULY|RU-VGG|RU-VLA|RU-VLG|RU-VOR|RU-YAN|RU-YAR|RU-YEV|RU-ZAB|RUS|RWA|RYA|Rajasthan|Reunion|Rhode Island|Rio Grande do Norte|Rio Grande do Sul|Rio de Janeiro|Romania|Rondonia|Roraima|Rostov Oblast|Russia|Rwanda, Republic of|Ryazan Oblast|SA|SAK|SAM|SAR|SAU|SC|SD|SDN|SE|SEN|SGP|SGS|SH|SHN|SI|SIN|SJM|SK|SL|SLB|SLE|SLP|SLV|SMO|SMR|SN|SO|SOM|SON|SP|SPE|SPM|SRB|SSD|STA|STP|SUR|SVE|SVK|SVN|SWE|SWZ|SX|SXM|SYC|SYR|Saint Helena, Ascension and Tristan da Cunha|Saint Kitts and Nevis, Federation of|Saint Lucia|Saint Martin, Collectivity of|Saint Petersburg|Saint Pierre and Miquelon, Collectivity of|Saint Vincent and the Grenadines|Saint-Barthelemy, Collectivity of|Sakha Republic|Sakhalin Oblast|Samara Oblast|Samoa, Independent State of|San Luis Potosi|San Marino, Republic of|Santa Catarina|Sao Paulo|Sao Tome and Principe, Democratic Republic of|Saratov Oblast|Saskatchewan|Saudi Arabia, Kingdom of|Senegal, Republic of|Serbia, Republic of|Sergipe|Seychelles, Republic of|Shaanxi Province|Shandong Province|Shanghai Municipality|Shanxi Province|Sichuan Province|Sierra Leone, Republic of|Sikkim|Sinaloa|Singapore, Republic of|Sint Maarten|Slovakia|Slovenia, Republic of|Smolensk Oblast|Solomon Islands|Somalia, Federal Republic of|Sonora|South Africa, Republic of|South Australia|South Carolina|South Dakota|South Georgia and the South Sandwich Islands|South Korea|South Sudan, Republic of|Spain, Kingdom of|Sri Lanka, Democratic Socialist Republic of|Stavropol Krai|Sudan, Republic of the|Suriname, Republic of|Svalbard and Jan Mayen|Sverdlovsk Oblast|Swaziland, Kingdom of|Sweden, Kingdom of|Switzerland|Syria|TA|TAA|TAB|TAM|TAS|TB|TCA|TCD|TG|TGO|THA|TJ|TJK|TKL|TKM|TL|TLA|TLS|TM|TN|TO|TOM|TON|TR|TT|TTO|TUL|TUN|TUR|TUV|TVE|TW|TWN|TX|TY|TYU|TZA|Tabasco|Taiwan|Tajikistan, Republic of|Tamaulipas|Tambov Oblast|Tamil Nadu|Tanzania, United Republic of|Tasmania|Tatarstan Republic|Telangana|Tennessee|Texas|Thailand, Kingdom of|Tianjin Municipality|Timor-Leste, Democratic Republic of|Tlaxcala|Tocantins|Togo|Tokelau|Tomsk Oblast|Tonga, Kingdom of|Trinidad and Tobago, Republic of|Tripura|Tula Oblast|Tunisia, Republic of|Turkey, Republic of|Turkmenistan|Turks and Caicos Islands|Tuva Republic|Tuvalu|Tver Oblast|Tyumen Oblast|UD|UGA|UK|UKR|ULY|UM|UMI|UP|URY|US|US-AK|US-AL|US-AR|US-AS|US-AZ|US-CA|US-CO|US-CT|US-DC|US-DE|US-FL|US-GA|US-GU|US-HI|US-IA|US-ID|US-IL|US-IN|US-KS|US-KY|US-LA|US-MA|US-MD|US-ME|US-MI|US-MID|US-MN|US-MO|US-MP|US-MS|US-MT|US-NC|US-ND|US-NE|US-NH|US-NJ|US-NM|US-NV|US-NY|US-OH|US-OK|US-OR|US-PA|US-PR|US-RI|US-SC|US-SD|US-TN|US-TX|US-UM|US-UT|US-VA|US-VI|US-VT|US-WA|US-WI|US-WV|US-WY|USA|UT|UZB|Udmurt Republic|Uganda, Republic of|Ukraine|Ulyanovsk Oblast|United Arab Emirates|United Kingdom|United States Minor Outlying Islands|Uruguay, Eastern Republic of|Utah|Uttar Pradesh|Uttarakhand|Uzbekistan, Republic of|VA|VAT|VCT|VE|VEN|VER|VGB|VGG|VI|VIC|VIR|VLA|VLG|VNM|VOR|VT|VUT|Vanuatu, Republic of|Vatican|Venezuela, Bolivarian Republic of|Veracruz|Vermont|Victoria|Vietnam, Socialist Republic of|Virgin Islands of the United States|Virginia, Commonwealth of|Vladimir Oblast|Volgograd Oblast|Vologda Oblast|Voronezh Oblast|WA|WAK|WB|WI|WLF|WSM|WV|WY|Wallis and Futuna, Collectivity of the|Washington|West Bengal|West Virginia|Western Australia|Western Sahara|Wisconsin|Wyoming|XJ|XZ|Xinjiang Uyghur Autonomous Region|Xizang Autonomous Region|YAN|YAR|YEM|YEV|YN|YT|YU|YUC|Yamalo-Nenets|Yaroslavl Oblast|Yemen, Republic of|Yucatan|Yukon|Yunnan Province|ZA|ZAB|ZAC|ZAF|ZJ|ZMB|ZWE|Zabaykalsky Krai|Zacatecas|Zambia, Republic of|Zhejiang Province|Zimbabwe, Republic of) )?[ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz\d]{2,}\.[ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz\d]{2,}(-\d{1,8})?/g;
