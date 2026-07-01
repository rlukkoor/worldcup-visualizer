/**
 * FIFA World Cup Member Archive - Core Application Logic
 */

let currentView = 'members';
let activeConfedFilter = 'ALL';
let currentTimelineSubView = 'alpha';
let activeSelectedYear = null;
let performanceChart = null;

// Complete tracking of 211 FIFA members with historical tournament data
const wcData = {
  countries: {
    // UEFA (55 Members)
    "ALB": { name: "Albania", flag: "al", confed: "UEFA", history: {} },
    "AND": { name: "Andorra", flag: "ad", confed: "UEFA", history: {} },
    "ARM": { name: "Armenia", flag: "am", confed: "UEFA", history: {} },
    "AUT": { name: "Austria", flag: "at", confed: "UEFA", history: { 1934: 4, 1954: 4, 1958: 1, 1978: 3, 1982: 3, 1990: 1, 1998: 1, 2026: 1 } },
    "AZE": { name: "Azerbaijan", flag: "az", confed: "UEFA", history: {} },
    "BLR": { name: "Belarus", flag: "by", confed: "UEFA", history: {} },
    "BEL": { name: "Belgium", flag: "be", confed: "UEFA", history: { 1930: 1, 1934: 1, 1938: 1, 1954: 1, 1970: 1, 1982: 2, 1986: 4, 1990: 2, 1994: 2, 1998: 1, 2002: 2, 2014: 3, 2018: 4, 2022: 1, 2026: 1 } },
    "BIH": { name: "Bosnia and Herzegovina", flag: "ba", confed: "UEFA", history: { 2014: 1, 2026: 1 } },
    "BUL": { name: "Bulgaria", flag: "bg", confed: "UEFA", history: { 1962: 1, 1966: 1, 1970: 1, 1974: 1, 1986: 2, 1994: 4, 1998: 1 } },
    "CRO": { name: "Croatia", flag: "hr", confed: "UEFA", history: { 1998: 4, 2002: 1, 2006: 1, 2014: 1, 2018: 5, 2022: 4, 2026: 1 } },
    "CYP": { name: "Cyprus", flag: "cy", confed: "UEFA", history: {} },
    "CZE": { 
      name: "Czechia", 
      flag: "cz", 
      confed: "UEFA", 
      history: { 1934: 5, 1938: 3, 1954: 1, 1958: 1, 1962: 5, 1970: 1, 1982: 1, 1990: 3, 2006: 1, 2026: 1 },
      notes: { 1934: "Competed as Czechoslovakia", 1938: "Competed as Czechoslovakia", 1954: "Competed as Czechoslovakia", 1958: "Competed as Czechoslovakia", 1962: "Competed as Czechoslovakia", 1970: "Competed as Czechoslovakia", 1982: "Competed as Czechoslovakia", 1990: "Competed as Czechoslovakia" }
    },
    "DEN": { name: "Denmark", flag: "dk", confed: "UEFA", history: { 1986: 2, 1998: 3, 2002: 2, 2010: 1, 2018: 2, 2022: 1 } },
    "ENG": { name: "England", flag: "gb-eng", confed: "UEFA", history: { 1950: 1, 1954: 3, 1958: 1, 1962: 3, 1966: 6, 1970: 3, 1982: 3, 1986: 3, 1990: 4, 1998: 2, 2002: 3, 2006: 3, 2010: 2, 2014: 1, 2018: 4, 2022: 3, 2026: 1 } },
    "EST": { name: "Estonia", flag: "ee", confed: "UEFA", history: {} },
    "FRO": { name: "Faroe Islands", flag: "fo", confed: "UEFA", history: {} },
    "FIN": { name: "Finland", flag: "fi", confed: "UEFA", history: {} },
    "FRA": { name: "France", flag: "fr", confed: "UEFA", history: { 1930: 1, 1934: 1, 1938: 3, 1954: 1, 1958: 4, 1966: 1, 1978: 1, 1982: 4, 1986: 4, 1998: 6, 2002: 1, 2006: 5, 2010: 1, 2014: 3, 2018: 6, 2022: 5, 2026: 1 } },
    "GEO": { name: "Georgia", flag: "ge", confed: "UEFA", history: {} },
    "GER": { 
      name: "Germany", 
      flag: "de", 
      confed: "UEFA", 
      history: { 1934: 4, 1938: 1, 1954: 6, 1958: 4, 1962: 3, 1966: 5, 1970: 4, 1974: 6, 1978: 3, 1982: 5, 1986: 5, 1990: 6, 1994: 3, 1998: 3, 2002: 5, 2006: 4, 2010: 4, 2014: 6, 2018: 1, 2022: 1, 2026: 1 },
      notes: { 1954: "Competed as West Germany", 1958: "Competed as West Germany", 1962: "Competed as West Germany", 1966: "Competed as West Germany", 1970: "Competed as West Germany", 1974: "Competed as West Germany", 1978: "Competed as West Germany", 1982: "Competed as West Germany", 1986: "Competed as West Germany", 1990: "Competed as West Germany" }
    },
    "GDR": { name: "East Germany", flag: "de", confed: "UEFA", history: { 1974: 3 }, notes: { 1974: "Historical political entity (1949–1990)" } },
    "GIB": { name: "Gibraltar", flag: "gi", confed: "UEFA", history: {} },
    "GRE": { name: "Greece", flag: "gr", confed: "UEFA", history: { 1994: 1, 2010: 1, 2014: 2 } },
    "HUN": { name: "Hungary", flag: "hu", confed: "UEFA", history: { 1934: 3, 1938: 5, 1954: 5, 1958: 1, 1962: 3, 1966: 3, 1978: 1, 1982: 1, 1986: 1 } },
    "ISL": { name: "Iceland", flag: "is", confed: "UEFA", history: { 2018: 1 } },
    "ISR": { name: "Israel", flag: "il", confed: "UEFA", history: { 1970: 1 }, notes: { 1970: "Qualified via AFC allocation" } },
    "ITA": { name: "Italy", flag: "it", confed: "UEFA", history: { 1934: 6, 1938: 6, 1950: 1, 1954: 1, 1962: 1, 1966: 1, 1970: 5, 1974: 1, 1978: 4, 1982: 6, 1986: 2, 1990: 4, 1994: 5, 1998: 3, 2002: 2, 2006: 6, 2010: 1, 2014: 1 } }, // Fixed historical data exclusion
    "KAZ": { name: "Kazakhstan", flag: "kz", confed: "UEFA", history: {} },
    "KOS": { name: "Kosovo", flag: "xk", confed: "UEFA", history: {} },
    "LVA": { name: "Latvia", flag: "lv", confed: "UEFA", history: {} },
    "LIE": { name: "Liechtenstein", flag: "li", confed: "UEFA", history: {} },
    "LTU": { name: "Lithuania", flag: "lt", confed: "UEFA", history: {} },
    "LUX": { name: "Luxembourg", flag: "lu", confed: "UEFA", history: {} },
    "MLT": { name: "Malta", flag: "mt", confed: "UEFA", history: {} },
    "MDA": { name: "Moldova", flag: "md", confed: "UEFA", history: {} },
    "MNE": { name: "Montenegro", flag: "me", confed: "UEFA", history: {} },
    "NED": { name: "Netherlands", flag: "nl", confed: "UEFA", history: { 1934: 1, 1938: 1, 1974: 5, 1978: 5, 1990: 2, 1994: 3, 1998: 4, 2006: 2, 2010: 5, 2014: 4, 2022: 3, 2026: 1 } },
    "MKD": { name: "North Macedonia", flag: "mk", confed: "UEFA", history: {} },
    "NIR": { name: "Northern Ireland", flag: "gb-nir", confed: "UEFA", history: { 1958: 3, 1982: 2, 1986: 1 } },
    "NOR": { name: "Norway", flag: "no", confed: "UEFA", history: { 1938: 1, 1994: 1, 1998: 2 } },
    "POL": { name: "Poland", flag: "pl", confed: "UEFA", history: { 1938: 1, 1974: 4, 1978: 3, 1982: 4, 1986: 2, 2002: 1, 2006: 1, 2018: 1, 2022: 2 } },
    "POR": { name: "Portugal", flag: "pt", confed: "UEFA", history: { 1966: 4, 1986: 1, 2002: 1, 2006: 4, 2010: 2, 2014: 1, 2018: 2, 2022: 3, 2026: 1 } },
    "IRL": { name: "Republic of Ireland", flag: "ie", confed: "UEFA", history: { 1990: 3, 1994: 2, 2002: 2 } },
    "ROU": { name: "Romania", flag: "ro", confed: "UEFA", history: { 1930: 1, 1934: 1, 1938: 1, 1970: 1, 1990: 2, 1994: 3, 1998: 2 } },
    "RUS": { 
      name: "Russia", 
      flag: "ru", 
      confed: "UEFA", 
      history: { 1958: 3, 1962: 3, 1966: 4, 1970: 3, 1982: 2, 1986: 2, 1990: 1, 1994: 1, 2002: 1, 2014: 1, 2018: 3 },
      notes: { 1958: "Competed as Soviet Union", 1962: "Competed as Soviet Union", 1966: "Competed as Soviet Union", 1970: "Competed as Soviet Union", 1982: "Competed as Soviet Union", 1986: "Competed as Soviet Union", 1990: "Competed as Soviet Union" }
    },
    "SMR": { name: "San Marino", flag: "sm", confed: "UEFA", history: {} },
    "SCO": { name: "Scotland", flag: "gb-sct", confed: "UEFA", history: { 1954: 1, 1958: 1, 1974: 1, 1978: 1, 1982: 1, 1986: 1, 1990: 1, 1998: 1, 2026: 1 } },
    "SRB": { 
      name: "Serbia", 
      flag: "rs", 
      confed: "UEFA", 
      history: { 1930: 4, 1950: 1, 1954: 3, 1958: 3, 1962: 4, 1974: 2, 1982: 1, 1990: 3, 1998: 2, 2006: 1, 2010: 1, 2018: 1, 2022: 1, 2026: 1 },
      notes: { 1930: "Competed as Yugoslavia", 1950: "Competed as Yugoslavia", 1954: "Competed as Yugoslavia", 1958: "Competed as Yugoslavia", 1962: "Competed as Yugoslavia", 1974: "Competed as Yugoslavia", 1982: "Competed as Yugoslavia", 1990: "Competed as Yugoslavia", 1998: "Competed as Yugoslavia", 2006: "Competed as Serbia & Montenegro" }
    },
    "SVK": { name: "Slovakia", flag: "sk", confed: "UEFA", history: { 2010: 2 } },
    "SVN": { name: "Slovenia", flag: "si", confed: "UEFA", history: { 2002: 1, 2010: 1 } },
    "ESP": { name: "Spain", flag: "es", confed: "UEFA", history: { 1934: 3, 1950: 4, 1962: 1, 1966: 1, 1978: 1, 1982: 3, 1986: 3, 1990: 2, 1994: 3, 1998: 1, 2002: 3, 2006: 2, 2010: 6, 2014: 1, 2018: 2, 2022: 2, 2026: 1 } },
    "SWE": { name: "Sweden", flag: "se", confed: "UEFA", history: { 1934: 3, 1938: 4, 1950: 4, 1958: 5, 1970: 1, 1974: 3, 1978: 1, 1990: 1, 1994: 4, 2002: 2, 2006: 2, 2018: 3, 2026: 1 } },
    "SUI": { name: "Switzerland", flag: "ch", confed: "UEFA", history: { 1934: 3, 1938: 3, 1950: 1, 1954: 3, 1962: 1, 1966: 1, 1994: 2, 2006: 2, 2010: 1, 2014: 2, 2018: 2, 2022: 2, 2026: 1 } },
    "TUR": { name: "Turkey", flag: "tr", confed: "UEFA", history: { 1954: 1, 2002: 4 } },
    "UKR": { name: "Ukraine", flag: "ua", confed: "UEFA", history: { 2006: 3 } },
    "WAL": { name: "Wales", flag: "gb-wls", confed: "UEFA", history: { 1958: 3, 2022: 1 } },

    // CONMEBOL (10 Members)
    "ARG": { name: "Argentina", flag: "ar", confed: "CONMEBOL", history: { 1930: 5, 1934: 1, 1958: 1, 1962: 1, 1966: 3, 1974: 3, 1978: 6, 1982: 3, 1986: 6, 1990: 5, 1994: 2, 1998: 3, 2002: 1, 2006: 3, 2010: 3, 2014: 5, 2018: 2, 2022: 6, 2026: 1 } },
    "BOL": { name: "Bolivia", flag: "bo", confed: "CONMEBOL", history: { 1930: 1, 1950: 1, 1994: 1 } },
    "BRA": { name: "Brazil", flag: "br", confed: "CONMEBOL", history: { 1930: 1, 1934: 1, 1938: 4, 1950: 5, 1954: 3, 1958: 6, 1962: 6, 1966: 1, 1970: 6, 1974: 4, 1978: 4, 1982: 3, 1986: 3, 1990: 2, 1994: 6, 1998: 5, 2002: 6, 2006: 3, 2010: 3, 2014: 4, 2018: 3, 2022: 3, 2026: 1 } },
    "CHI": { name: "Chile", flag: "cl", confed: "CONMEBOL", history: { 1930: 1, 1950: 1, 1962: 4, 1966: 1, 1974: 1, 1982: 1, 1998: 2, 2010: 2, 2014: 2 } },
    "COL": { name: "Colombia", flag: "co", confed: "CONMEBOL", history: { 1962: 1, 1990: 2, 1994: 1, 1998: 1, 2014: 3, 2018: 2, 2026: 1 } },
    "ECU": { name: "Ecuador", flag: "ec", confed: "CONMEBOL", history: { 2002: 1, 2006: 2, 2014: 1, 2022: 1, 2026: 1 } },
    "PAR": { name: "Paraguay", flag: "py", confed: "CONMEBOL", history: { 1930: 1, 1950: 1, 1958: 1, 1986: 2, 1998: 2, 2002: 2, 2006: 1, 2010: 3 } },
    "PER": { name: "Peru", flag: "pe", confed: "CONMEBOL", history: { 1930: 1, 1970: 3, 1978: 3, 1982: 1, 2018: 1 } },
    "URU": { name: "Uruguay", flag: "uy", confed: "CONMEBOL", history: { 1930: 6, 1950: 6, 1954: 4, 1962: 1, 1966: 3, 1970: 4, 1974: 1, 1986: 2, 1990: 2, 2002: 1, 2010: 4, 2014: 2, 2018: 3, 2022: 1, 2026: 1 } },
    "VEN": { name: "Venezuela", flag: "ve", confed: "CONMEBOL", history: { 2026: 1 } },

    // CONCACAF (35 Members)
    "AIA": { name: "Anguilla", flag: "ai", confed: "CONCACAF", history: {} },
    "ATG": { name: "Antigua and Barbuda", flag: "ag", confed: "CONCACAF", history: {} },
    "ARU": { name: "Aruba", flag: "aw", confed: "CONCACAF", history: {} },
    "BAH": { name: "Bahamas", flag: "bs", confed: "CONCACAF", history: {} },
    "BRB": { name: "Barbados", flag: "bb", confed: "CONCACAF", history: {} },
    "BLZ": { name: "Belize", flag: "bz", confed: "CONCACAF", history: {} },
    "BER": { name: "Bermuda", flag: "bm", confed: "CONCACAF", history: {} },
    "VGB": { name: "British Virgin Islands", flag: "vg", confed: "CONCACAF", history: {} },
    "CAN": { name: "Canada", flag: "ca", confed: "CONCACAF", history: { 1986: 1, 2022: 1, 2026: 1 } },
    "KYM": { name: "Cayman Islands", flag: "ky", confed: "CONCACAF", history: {} },
    "CRC": { name: "Costa Rica", flag: "cr", confed: "CONCACAF", history: { 1990: 2, 2002: 1, 2006: 1, 2014: 3, 2018: 1, 2022: 1, 2026: 1 } },
    "CUB": { name: "Cuba", flag: "cu", confed: "CONCACAF", history: { 1938: 3 } },
    "CUW": { name: "Curaçao", flag: "cw", confed: "CONCACAF", history: {} },
    "DMA": { name: "Dominica", flag: "dm", confed: "CONCACAF", history: {} },
    "DOM": { name: "Dominican Republic", flag: "do", confed: "CONCACAF", history: {} },
    "SLV": { name: "El Salvador", flag: "sv", confed: "CONCACAF", history: { 1970: 1, 1982: 1 } },
    "GRN": { name: "Grenada", flag: "gd", confed: "CONCACAF", history: {} },
    "GUA": { name: "Guatemala", flag: "gt", confed: "CONCACAF", history: {} },
    "GUY": { name: "Guyana", flag: "gy", confed: "CONCACAF", history: {} },
    "HAI": { name: "Haiti", flag: "ht", confed: "CONCACAF", history: { 1974: 1 } },
    "HON": { name: "Honduras", flag: "hn", confed: "CONCACAF", history: { 1982: 1, 2010: 1, 2014: 1 } },
    "JAM": { name: "Jamaica", flag: "jm", confed: "CONCACAF", history: { 1998: 1 } },
    "MEX": { name: "Mexico", flag: "mx", confed: "CONCACAF", history: { 1930: 1, 1950: 1, 1954: 1, 1958: 1, 1962: 1, 1966: 1, 1970: 3, 1978: 1, 1986: 3, 1994: 2, 1998: 2, 2002: 2, 2006: 2, 2010: 2, 2014: 2, 2018: 2, 2022: 1, 2026: 1 } },
    "MSR": { name: "Montserrat", flag: "ms", confed: "CONCACAF", history: {} },
    "NCA": { name: "Nicaragua", flag: "ni", confed: "CONCACAF", history: {} },
    "PAN": { name: "Panama", flag: "pa", confed: "CONCACAF", history: { 2018: 1, 2026: 1 } },
    "PUR": { name: "Puerto Rico", flag: "pr", confed: "CONCACAF", history: {} },
    "SKN": { name: "Saint Kitts and Nevis", flag: "kn", confed: "CONCACAF", history: {} },
    "LCA": { name: "Saint Lucia", flag: "lc", confed: "CONCACAF", history: {} },
    "VIN": { name: "Saint Vincent and the Grenadines", flag: "vc", confed: "CONCACAF", history: {} },
    "SXM": { name: "Sint Maarten", flag: "sx", confed: "CONCACAF", history: {} },
    "SUR": { name: "Suriname", flag: "sr", confed: "CONCACAF", history: {} },
    "TRI": { name: "Trinidad and Tobago", flag: "tt", confed: "CONCACAF", history: { 2006: 1 } },
    "TCA": { name: "Turks and Caican Islands", flag: "tc", confed: "CONCACAF", history: {} },
    "USA": { name: "United States", flag: "us", confed: "CONCACAF", history: { 1930: 4, 1934: 1, 1950: 1, 1990: 1, 1994: 2, 1998: 1, 2002: 3, 2006: 1, 2010: 2, 2014: 2, 2022: 2, 2026: 1 } },
    "VIR": { name: "US Virgin Islands", flag: "vi", confed: "CONCACAF", history: {} },

    // CAF (54 Members)
    "ALG": { name: "Algeria", flag: "dz", confed: "CAF", history: { 1982: 1, 1986: 1, 2010: 1, 2014: 2, 2026: 1 } },
    "ANG": { name: "Angola", flag: "ao", confed: "CAF", history: { 2006: 1 } },
    "BEN": { name: "Benin", flag: "bj", confed: "CAF", history: {} },
    "BOT": { name: "Botswana", flag: "bw", confed: "CAF", history: {} },
    "BFA": { name: "Burkina Faso", flag: "bf", confed: "CAF", history: {} },
    "BDI": { name: "Burundi", flag: "bi", confed: "CAF", history: {} },
    "CPV": { name: "Cape Verde", flag: "cv", confed: "CAF", history: { 2026: 1 } },
    "CMR": { name: "Cameroon", flag: "cm", confed: "CAF", history: { 1982: 1, 1990: 3, 1994: 1, 1998: 1, 2002: 1, 2010: 1, 2014: 1, 2022: 1, 2026: 1 } },
    "CAF": { name: "Central African Republic", flag: "cf", confed: "CAF", history: {} },
    "CHA": { name: "Chad", flag: "td", confed: "CAF", history: {} },
    "COM": { name: "Comoros", flag: "km", confed: "CAF", history: {} },
    "CGO": { name: "Congo", flag: "cg", confed: "CAF", history: {} },
    "CIV": { name: "Ivory Coast", flag: "ci", confed: "CAF", history: { 2006: 1, 2010: 1, 2014: 1, 2026: 1 } },
    "DJI": { name: "Djibouti", flag: "dj", confed: "CAF", history: {} },
    "COD": { name: "DR Congo", flag: "cd", confed: "CAF", history: { 1974: 1, 2026: 1 }, notes: { 1974: "Competed as Zaire" } },
    "EGY": { name: "Egypt", flag: "eg", confed: "CAF", history: { 1934: 1, 1990: 1, 2018: 1, 2026: 1 } },
    "EQG": { name: "Equatorial Guinea", flag: "gq", confed: "CAF", history: {} },
    "ERI": { name: "Eritrea", flag: "er", confed: "CAF", history: {} },
    "SWZ": { name: "Eswatini", flag: "sz", confed: "CAF", history: {} },
    "ETH": { name: "Ethiopia", flag: "et", confed: "CAF", history: {} },
    "GAB": { name: "Gabon", flag: "ga", confed: "CAF", history: {} },
    "GAM": { name: "Gambia", flag: "gm", confed: "CAF", history: {} },
    "GHA": { name: "Ghana", flag: "gh", confed: "CAF", history: { 2006: 2, 2010: 3, 2014: 1, 2022: 1, 2026: 1 } },
    "GIE": { name: "Guinea", flag: "gn", confed: "CAF", history: {} },
    "GNB": { name: "Guinea-Bissau", flag: "gw", confed: "CAF", history: {} },
    "KEN": { name: "Kenya", flag: "ke", confed: "CAF", history: {} },
    "LES": { name: "Lesotho", flag: "ls", confed: "CAF", history: {} },
    "LBR": { name: "Liberia", flag: "lr", confed: "CAF", history: {} },
    "LBY": { name: "Libya", flag: "ly", confed: "CAF", history: {} },
    "MAD": { name: "Madagascar", flag: "mg", confed: "CAF", history: {} },
    "MWI": { name: "Malawi", flag: "mw", confed: "CAF", history: {} },
    "MLI": { name: "Mali", flag: "ml", confed: "CAF", history: {} },
    "MTN": { name: "Mauritania", flag: "mr", confed: "CAF", history: {} },
    "MRI": { name: "Mauritius", flag: "mu", confed: "CAF", history: {} },
    "MAR": { name: "Morocco", flag: "ma", confed: "CAF", history: { 1970: 1, 1986: 2, 1994: 1, 1998: 1, 2018: 1, 2022: 4, 2026: 1 } },
    "MOZ": { name: "Mozambique", flag: "mz", confed: "CAF", history: {} },
    "NAM": { name: "Namibia", flag: "na", confed: "CAF", history: {} },
    "NIG": { name: "Niger", flag: "ne", confed: "CAF", history: {} },
    "NGA": { name: "Nigeria", flag: "ng", confed: "CAF", history: { 1994: 2, 1998: 2, 2002: 1, 2010: 1, 2014: 2, 2018: 1, 2026: 1 } },
    "RWA": { name: "Rwanda", flag: "rw", confed: "CAF", history: {} },
    "STP": { name: "São Tomé and Príncipe", flag: "st", confed: "CAF", history: {} },
    "SEN": { name: "Senegal", flag: "sn", confed: "CAF", history: { 2002: 3, 2018: 1, 2022: 2, 2026: 1 } },
    "SEY": { name: "Seychelles", flag: "sc", confed: "CAF", history: {} },
    "SLE": { name: "Sierra Leone", flag: "sl", confed: "CAF", history: {} },
    "SOM": { name: "Somalia", flag: "so", confed: "CAF", history: {} },
    "RSA": { name: "South Africa", flag: "za", confed: "CAF", history: { 1998: 1, 2002: 1, 2010: 1, 2026: 1 } },
    "SSU": { name: "South Sudan", flag: "ss", confed: "CAF", history: {} },
    "SUD": { name: "Sudan", flag: "sd", confed: "CAF", history: {} },
    "TAN": { name: "Tanzania", flag: "tz", confed: "CAF", history: {} },
    "TOG": { name: "Togo", flag: "tg", confed: "CAF", history: { 2006: 1 } },
    "TUN": { name: "Tunisia", flag: "tn", confed: "CAF", history: { 1978: 1, 1998: 1, 2002: 1, 2006: 1, 2018: 1, 2022: 1, 2026: 1 } },
    "UGA": { name: "Uganda", flag: "ug", confed: "CAF", history: {} },
    "ZAM": { name: "Zambia", flag: "zm", confed: "CAF", history: {} },
    "ZIM": { name: "Zimbabwe", flag: "zw", confed: "CAF", history: {} },

    // AFC (47 Members)
    "AFG": { name: "Afghanistan", flag: "af", confed: "AFC", history: {} },
    "AUS": { name: "Australia", flag: "au", confed: "AFC", history: { 1974: 1, 2006: 2, 2010: 1, 2014: 1, 2018: 1, 2022: 2, 2026: 1 }, notes: { 1974: "Qualified via OFC allocation", 2006: "Qualified via OFC allocation" } },
    "BRN": { name: "Bahrain", flag: "bh", confed: "AFC", history: {} },
    "BAN": { name: "Bangladesh", flag: "bd", confed: "AFC", history: {} },
    "BHU": { name: "Bhutan", flag: "bt", confed: "AFC", history: {} },
    "BRU": { name: "Brunei", flag: "bn", confed: "AFC", history: {} },
    "CAM": { name: "Cambodia", flag: "kh", confed: "AFC", history: {} },
    "CHN": { name: "China", flag: "cn", confed: "AFC", history: { 2002: 1 } },
    "GUM": { name: "Guam", flag: "gu", confed: "AFC", history: {} },
    "HKG": { name: "Hong Kong", flag: "hk", confed: "AFC", history: {} },
    "IND": { name: "India", flag: "in", confed: "AFC", history: {} },
    "IDN": { name: "Indonesia", flag: "id", confed: "AFC", history: { 1938: 1 }, notes: { 1938: "Competed as Dutch East Indies" } },
    "IRN": { name: "Iran", flag: "ir", confed: "AFC", history: { 1978: 1, 1998: 1, 2006: 1, 2014: 1, 2018: 1, 2022: 1, 2026: 1 } },
    "IRQ": { name: "Iraq", flag: "iq", confed: "AFC", history: { 1986: 1, 2026: 1 } },
    "JPN": { name: "Japan", flag: "jp", confed: "AFC", history: { 1998: 1, 2002: 2, 2006: 1, 2010: 2, 2014: 1, 2018: 2, 2022: 2, 2026: 1 } },
    "JOR": { name: "Jordan", flag: "jo", confed: "AFC", history: { 2026: 1 } },
    "PRK": { name: "North Korea", flag: "kp", confed: "AFC", history: { 1966: 3, 2010: 1 } },
    "KOR": { name: "South Korea", flag: "kr", confed: "AFC", history: { 1954: 1, 1986: 1, 1990: 1, 1994: 1, 1998: 1, 2002: 4, 2006: 1, 2010: 2, 2014: 1, 2018: 1, 2022: 2, 2026: 1 } },
    "KUW": { name: "Kuwait", flag: "kw", confed: "AFC", history: { 1982: 1 } },
    "KGZ": { name: "Kyrgyzstan", flag: "kg", confed: "AFC", history: {} },
    "LAO": { name: "Laos", flag: "la", confed: "AFC", history: {} },
    "LEB": { name: "Lebanon", flag: "lb", confed: "AFC", history: {} },
    "MAC": { name: "Macau", flag: "mo", confed: "AFC", history: {} },
    "MAS": { name: "Malaysia", flag: "my", confed: "AFC", history: {} },
    "MDV": { name: "Maldives", flag: "mv", confed: "AFC", history: {} },
    "MNG": { name: "Mongolia", flag: "mn", confed: "AFC", history: {} },
    "MYA": { name: "Myanmar", flag: "mm", confed: "AFC", history: {} },
    "NEP": { name: "Nepal", flag: "np", confed: "AFC", history: {} },
    "OMA": { name: "Oman", flag: "om", confed: "AFC", history: {} },
    "PAK": { name: "Pakistan", flag: "pk", confed: "AFC", history: {} },
    "PLE": { name: "Palestine", flag: "ps", confed: "AFC", history: {} },
    "PHI": { name: "Philippines", flag: "ph", confed: "AFC", history: {} },
    "QAT": { name: "Qatar", flag: "qa", confed: "AFC", history: { 2022: 1 } },
    "KSA": { name: "Saudi Arabia", flag: "sa", confed: "AFC", history: { 1994: 2, 1998: 1, 2002: 1, 2006: 1, 2018: 1, 2022: 1, 2026: 1 } }, // Maintained fixed inclusion
    "SGP": { name: "Singapore", flag: "sg", confed: "AFC", history: {} },
    "SRI": { name: "Sri Lanka", flag: "lk", confed: "AFC", history: {} },
    "SYR": { name: "Syria", flag: "sy", confed: "AFC", history: {} },
    "TWN": { name: "Taiwan", flag: "tw", confed: "AFC", history: {} },
    "TJK": { name: "Tajikistan", flag: "tj", confed: "AFC", history: {} },
    "THA": { name: "Thailand", flag: "th", confed: "AFC", history: {} },
    "TLS": { name: "Timor-Leste", flag: "tl", confed: "AFC", history: {} },
    "TKM": { name: "Turkmenistan", flag: "tm", confed: "AFC", history: {} },
    "UAE": { name: "United Arab Emirates", flag: "ae", confed: "AFC", history: { 1990: 1 } },
    "UZB": { name: "Uzbekistan", flag: "uz", confed: "AFC", history: { 2026: 1 } },
    "VIE": { name: "Vietnam", flag: "vn", confed: "AFC", history: {} },
    "YEM": { name: "Yemen", flag: "ye", confed: "AFC", history: {} },

    // OFC (11 Members)
    "ASA": { name: "American Samoa", flag: "as", confed: "OFC", history: {} },
    "COK": { name: "Cook Islands", flag: "ck", confed: "OFC", history: {} },
    "FIJ": { name: "Fiji", flag: "fj", confed: "OFC", history: {} },
    "NCL": { name: "New Caledonia", flag: "nc", confed: "OFC", history: {} },
    "NZL": { name: "New Zealand", flag: "nz", confed: "OFC", history: { 1982: 1, 2010: 1, 2026: 1 } },
    "PNG": { name: "Papua New Guinea", flag: "pg", confed: "OFC", history: {} },
    "SAM": { name: "Samoa", flag: "ws", confed: "OFC", history: {} },
    "SOL": { name: "Solomon Islands", flag: "sb", confed: "OFC", history: {} },
    "TAH": { name: "Tahiti", flag: "pf", confed: "OFC", history: {} },
    "TGA": { name: "Tonga", flag: "to", confed: "OFC", history: {} },
    "VAN": { name: "Vanuatu", flag: "vu", confed: "OFC", history: {} }
  }
};

const allYears = [
  1930, 1934, 1938, 1942, 1946, 1950, 1954, 1958, 1962, 1966, 
  1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 
  2010, 2014, 2018, 2022, 2026
];

const stageNames = {
  0: 'Did Not Participate', 1: 'Group Stage', 2: 'Round of 16', 
  3: 'Quarter-finals', 4: 'Semi-finals', 5: 'Runners-up', 6: 'Champions'
};

document.addEventListener('DOMContentLoaded', () => {
  buildTimelineYearButtons();
  switchView('members', document.querySelector('.nav-btn'));
  filterConfed('ALL', document.querySelector('.filter-btn'));
});

function switchView(viewName, clickedButton) {
  currentView = viewName;
  handleActiveHighlight('.nav-btn', clickedButton);

  if (viewName === 'members') {
    document.getElementById('members-view').classList.remove('hidden');
    document.getElementById('years-view').classList.add('hidden');
  } else {
    document.getElementById('years-view').classList.remove('hidden');
    document.getElementById('members-view').classList.add('hidden');
    if (!activeSelectedYear) {
      const btn74 = Array.from(document.querySelectorAll('.year-btn')).find(b => b.innerText === '1974');
      if (btn74) btn74.click();
    }
  }
}

function filterConfed(confedCode, clickedButton) {
  activeConfedFilter = confedCode;
  handleActiveHighlight('.filter-btn', clickedButton);

  const grid = document.getElementById('flag-grid');
  if (!grid) return;
  grid.innerHTML = '';

  let targetKeys = Object.keys(wcData.countries);
  if (confedCode !== 'ALL') {
    targetKeys = targetKeys.filter(k => wcData.countries[k].confed === confedCode);
  }

  targetKeys.sort((a,b) => wcData.countries[a].name.localeCompare(wcData.countries[b].name));

  targetKeys.forEach(key => {
    grid.appendChild(createCardElement(key));
  });
}

function createCardElement(key, year = null) {
  const country = wcData.countries[key];
  const card = document.createElement('div');
  card.className = 'flag-card';
  
  // click interaction linked straight to chart history view
  card.onclick = () => openCountryModal(key);

  let displayName = country.name;
  if (year && country.notes && country.notes[year]) {
    displayName = `${country.name} (${country.notes[year]})`;
  }

  card.innerHTML = `
    <span class="flag-icon fi fi-${country.flag}"></span>
    <div class="flag-country-name">${displayName}</div>
  `;
  return card;
}

function buildTimelineYearButtons() {
  const container = document.getElementById('years-buttons');
  if (!container) return;
  container.innerHTML = '';

  allYears.forEach(year => {
    const button = document.createElement('button');
    button.className = 'year-btn';
    button.innerText = year;

    if (year === 1942 || year === 1946) {
      button.classList.add('cancelled');
    } else {
      button.onclick = () => {
        activeSelectedYear = year;
        handleActiveHighlight('.year-btn', button);
        document.getElementById('year-details').classList.remove('hidden');
        document.getElementById('selected-year-title').innerText = `🏆 ${year} Tournament Participants`;
        renderYearParticipants(year);
      };
    }
    container.appendChild(button);
  });
}

function switchTimelineSubView(subView, clickedButton) {
  currentTimelineSubView = subView;
  handleActiveHighlight('.timeline-tabs button', clickedButton);
  if (activeSelectedYear) renderYearParticipants(activeSelectedYear);
}

function renderYearParticipants(year) {
  const container = document.getElementById('year-participants');
  if (!container) return;
  container.innerHTML = '';

  const keys = Object.keys(wcData.countries).filter(k => wcData.countries[k].history[year] !== undefined);

  if (currentTimelineSubView === 'alpha') {
    container.className = 'flag-grid';
    keys.sort((a,b) => wcData.countries[a].name.localeCompare(wcData.countries[b].name));
    keys.forEach(k => container.appendChild(createCardElement(k, year)));

  } else if (currentTimelineSubView === 'confed') {
    container.className = 'confed-container';
    ['UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'].forEach(c => {
      const confedKeys = keys.filter(k => wcData.countries[k].confed === c);
      if (confedKeys.length === 0) return;

      const title = document.createElement('h3');
      title.style.cssText = "color:#fff; margin: 20px 0 10px 0;";
      title.innerText = `${c} (${confedKeys.length})`;
      container.appendChild(title);

      const subGrid = document.createElement('div');
      subGrid.className = 'flag-grid';
      confedKeys.sort((a,b) => wcData.countries[a].name.localeCompare(wcData.countries[b].name));
      confedKeys.forEach(k => subGrid.appendChild(createCardElement(k, year)));
      container.appendChild(subGrid);
    });

  } else if (currentTimelineSubView === 'group') {
    container.className = 'group-stage-container';
    if (year === 1934 || year === 1938) {
      container.innerHTML = `<p class="text-muted" style="padding:20px;">No group stage matches held in ${year}.</p>`;
      return;
    }
    renderGroupTables(container, year);
  }
}

function renderGroupTables(container, year) {
  // Built out for explicit 1974 historical mapping shown in screenshots
  const mock1974 = [
    {
      phaseTitle: "First Round Group Stage",
      groups: [
        { name: "Group 1", teams: [
          { name: "East Germany", flag: "de", pld: 3, w: 2, d: 1, l: 0, gf: 4, ga: 1, gd: 3, pts: 5 }, 
          { name: "West Germany", flag: "de", pld: 3, w: 2, d: 0, l: 1, gf: 4, ga: 1, gd: 3, pts: 4 },
          { name: "Chile", flag: "cl", pld: 3, w: 0, d: 2, l: 1, gf: 1, ga: 2, gd: -1, pts: 2 },
          { name: "Australia", flag: "au", pld: 3, w: 0, d: 1, l: 2, gf: 0, ga: 5, gd: -5, pts: 1 }
        ] },
        { name: "Group 2", teams: [
          { name: "Yugoslavia", flag: "rs", pld: 3, w: 1, d: 2, l: 0, gf: 10, ga: 1, gd: 9, pts: 4 }, 
          { name: "Brazil", flag: "br", pld: 3, w: 1, d: 2, l: 0, gf: 3, ga: 0, gd: 3, pts: 4 },
          { name: "Scotland", flag: "gb-sct", pld: 3, w: 1, d: 2, l: 0, gf: 3, ga: 1, gd: 2, pts: 4 },
          { name: "Zaire", flag: "cd", pld: 3, w: 0, d: 0, l: 3, gf: 0, ga: 14, gd: -14, pts: 0 }
        ] }
      ]
    }
  ];

  mock1974.forEach(phase => {
    const header = document.createElement('h3');
    header.style.cssText = "color:#0070f3; margin: 25px 0 10px 0;";
    header.innerText = phase.phaseTitle;
    container.appendChild(header);

    phase.groups.forEach(g => {
      const div = document.createElement('div');
      div.style.marginBottom = "20px";
      div.innerHTML = `<h4 style="color:#fff; margin-bottom:8px;">${g.name}</h4>
        <table class="wiki-standing-table">
          <thead>
            <tr><th>Pos</th><th style="text-align:left;">Team</th><th>Pld</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th></tr>
          </thead>
          <tbody>
            ${g.teams.map((t, i) => `
              <tr class="${i < 2 ? 'advance-row' : ''}">
                <td style="text-align:center; font-weight:bold;">${i+1}</td>
                <td><span class="flag-icon fi fi-${t.flag}" style="margin-right:8px;"></span>${t.name}</td>
                <td style="text-align:center;">${t.pld}</td><td style="text-align:center;">${t.w}</td>
                <td style="text-align:center;">${t.d}</td><td style="text-align:center;">${t.l}</td>
                <td style="text-align:center;">${t.gf}</td><td style="text-align:center;">${t.ga}</td>
                <td style="text-align:center;">${t.gd > 0 ? '+' : ''}${t.gd}</td><td style="text-align:center; font-weight:bold;">${t.pts}</td>
              </tr>`).join('')}
          </tbody>
        </table>`;
      container.appendChild(div);
    });
  });
}

function openCountryModal(countryKey) {
  const country = wcData.countries[countryKey];
  if (!country) return;

  const modal = document.getElementById('chart-modal');
  document.getElementById('modal-country-name').innerText = `${country.name} Performance History`;
  modal.classList.remove('hidden');

  const historyYears = Object.keys(country.history);
  const canvas = document.getElementById('historyChart');

  if (historyYears.length === 0) {
    canvas.style.display = 'none';
    let fallback = document.getElementById('modal-fallback');
    if (!fallback) {
      fallback = document.createElement('p');
      fallback.id = 'modal-fallback';
      fallback.style.cssText = "color:#8e8e93; text-align:center; padding-top:40px;";
      canvas.parentNode.appendChild(fallback);
    }
    fallback.innerText = `${country.name} has not qualified for a final tournament grid stage.`;
    return;
  }

  if (document.getElementById('modal-fallback')) {
    document.getElementById('modal-fallback').remove();
  }
  canvas.style.display = 'block';

  const chartData = allYears.map(y => country.history[y] !== undefined ? country.history[y] : 0);

  if (performanceChart) performanceChart.destroy();
  const ctx = canvas.getContext('2d');
  
  performanceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: allYears,
      datasets: [{
        label: 'Stage Reached',
        data: chartData,
        borderColor: '#0070f3',
        backgroundColor: 'rgba(0,112,243,0.1)',
        pointBackgroundColor: '#0070f3',
        tension: 0,
        stepped: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0, max: 6,
          ticks: { callback: function(val) { return stageNames[val]; } }
        }
      }
    }
  });
}

function closeModal() {
  document.getElementById('chart-modal').classList.add('hidden');
}

function handleActiveHighlight(selector, element) {
  if (!element) return;
  document.querySelectorAll(selector).forEach(el => el.classList.remove('active'));
  element.classList.add('active');
}
