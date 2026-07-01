/**
 * FIFA World Cup Member Archive - Core Application Logic
 */

// Application State Tracking
let currentView = 'members';
let activeConfedFilter = 'ALL';
let currentTimelineSubView = 'alpha'; // 'alpha', 'confed', or 'group'
let activeSelectedYear = null;
let performanceChart = null;

// Comprehensive FIFA Member Dataset organized by Confederation
const wcData = {
  countries: {
    // --- UEFA (Europe) ---
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
    "GDR": { 
      name: "East Germany", 
      flag: "de", 
      confed: "UEFA", 
      history: { 1974: 3 },
      notes: { 1974: "Historical political entity (1949–1990)" }
    },
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
    "GIB": { name: "Gibraltar", flag: "gi", confed: "UEFA", history: {} },
    "GRE": { name: "Greece", flag: "gr", confed: "UEFA", history: { 1994: 1, 2010: 1, 2014: 2 } },
    "HUN": { name: "Hungary", flag: "hu", confed: "UEFA", history: { 1934: 3, 1938: 5, 1954: 5, 1958: 1, 1962: 3, 1966: 3, 1978: 1, 1982: 1, 1986: 1 } },
    "ISL": { name: "Iceland", flag: "is", confed: "UEFA", history: { 2018: 1 } },
    "ISR": { name: "Israel", flag: "il", confed: "UEFA", history: { 1970: 1 } },
    "ITA": { name: "Italy", flag: "it", confed: "UEFA", history: { 1934: 6, 1938: 6, 1950: 1, 1954: 1, 1962: 1, 1966: 1, 1970: 5, 1974: 1, 1978: 4, 1982: 6, 1986: 2, 1990: 4, 1994: 5, 1998: 3, 2002: 2, 2006: 6, 2010: 1, 2014: 1 } },
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
    "NIR": { name: "Northern Ireland", flag: "gb-nir", confed: "UEFA", history: { 1958: 3, 1982: 3, 1986: 1 } },
    "NOR": { name: "Norway", flag: "no", confed: "UEFA", history: { 1938: 1, 1994: 1, 1998: 2, 2026: 1 } },
    "POL": { name: "Poland", flag: "pl", confed: "UEFA", history: { 1938: 1, 1974: 4, 1978: 3, 1982: 4, 1986: 2, 2002: 1, 2006: 1, 2018: 1, 2022: 2 } },
    "POR": { name: "Portugal", flag: "pt", confed: "UEFA", history: { 1966: 4, 1986: 1, 2002: 1, 2006: 4, 2010: 2, 2014: 1, 2018: 2, 2022: 3, 2026: 1 } },
    "IRL": { name: "Republic of Ireland", flag: "ie", confed: "UEFA", history: { 1990: 3, 1994: 2, 2002: 2 } },
    "ROU": { name: "Romania", flag: "ro", confed: "UEFA", history: { 1930: 1, 1934: 1, 1938: 1, 1970: 1, 1990: 2, 1994: 3, 1998: 2 } },
    "RUS": { 
      name: "Russia", 
      flag: "ru", 
      confed: "UEFA", 
      history: { 1958: 3, 1962: 3, 1966: 4, 1970: 3, 1982: 3, 1986: 2, 1990: 1, 1994: 1, 2002: 1, 2014: 1, 2018: 3 },
      notes: { 1958: "Competed as Soviet Union", 1962: "Competed as Soviet Union", 1966: "Competed as Soviet Union", 1970: "Competed as Soviet Union", 1982: "Competed as Soviet Union", 1986: "Competed as Soviet Union", 1990: "Competed as Soviet Union" }
    },
    "SMR": { name: "San Marino", flag: "sm", confed: "UEFA", history: {} },
    "SCO": { name: "Scotland", flag: "gb-sct", confed: "UEFA", history: { 1954: 1, 1958: 1, 1974: 1, 1978: 1, 1982: 1, 1986: 1, 1990: 1, 1998: 1, 2026: 1 } },
    "SRB": { 
      name: "Serbia", 
      flag: "rs", 
      confed: "UEFA", 
      history: { 1930: 4, 1950: 1, 1954: 3, 1958: 3, 1962: 4, 1974: 3, 1982: 1, 1990: 3, 1998: 2, 2006: 1, 2010: 1, 2018: 1, 2022: 1 },
      notes: { 1930: "Competed as Yugoslavia", 1950: "Competed as Yugoslavia", 1954: "Competed as Yugoslavia", 1958: "Competed as Yugoslavia", 1962: "Competed as Yugoslavia", 1974: "Competed as Yugoslavia", 1982: "Competed as Yugoslavia", 1990: "Competed as Yugoslavia", 1998: "Competed as FR Yugoslavia", 2006: "Competed as Serbia and Montenegro" }
    },
    "SVK": { name: "Slovakia", flag: "sk", confed: "UEFA", history: { 2010: 2 } },
    "SVN": { name: "Slovenia", flag: "si", confed: "UEFA", history: { 2002: 1, 2010: 1 } },
    "ESP": { name: "Spain", flag: "es", confed: "UEFA", history: { 1934: 3, 1950: 4, 1962: 1, 1966: 1, 1978: 1, 1982: 3, 1986: 3, 1990: 2, 1994: 3, 1998: 1, 2002: 3, 2006: 2, 2010: 6, 2014: 1, 2018: 2, 2022: 2, 2026: 1 } },
    "SWE": { name: "Sweden", flag: "se", confed: "UEFA", history: { 1934: 3, 1938: 4, 1950: 4, 1958: 5, 1970: 1, 1974: 3, 1978: 1, 1990: 1, 1994: 4, 2002: 2, 2006: 2, 2018: 3, 2026: 1 } },
    "SUI": { name: "Switzerland", flag: "ch", confed: "UEFA", history: { 1934: 3, 1938: 3, 1950: 1, 1954: 3, 1962: 1, 1966: 1, 1994: 2, 2006: 2, 2010: 1, 2014: 2, 2018: 2, 2022: 2, 2026: 1 } },
    "TUR": { name: "Turkey", flag: "tr", confed: "UEFA", history: { 1954: 1, 2002: 4, 2026: 1 } },
    "UKR": { name: "Ukraine", flag: "ua", confed: "UEFA", history: { 2006: 3 } },
    "WAL": { name: "Wales", flag: "gb-wls", confed: "UEFA", history: { 1958: 3, 2022: 1 } },

    // --- CONMEBOL (South America) ---
    "ARG": { name: "Argentina", flag: "ar", confed: "CONMEBOL", history: { 1930: 5, 1934: 1, 1958: 1, 1962: 1, 1966: 3, 1974: 3, 1978: 6, 1982: 3, 1986: 6, 1990: 5, 1994: 2, 1998: 3, 2002: 1, 2006: 3, 2010: 3, 2014: 5, 2018: 2, 2022: 6, 2026: 1 } },
    "BOL": { name: "Bolivia", flag: "bo", confed: "CONMEBOL", history: { 1930: 1, 1950: 1, 1994: 1 } },
    "BRA": { name: "Brazil", flag: "br", confed: "CONMEBOL", history: { 1930: 1, 1934: 1, 1938: 4, 1950: 5, 1954: 3, 1958: 6, 1962: 6, 1966: 1, 1970: 6, 1974: 4, 1978: 4, 1982: 3, 1986: 3, 1990: 2, 1994: 6, 1998: 5, 2002: 6, 2006: 3, 2010: 3, 2014: 4, 2018: 3, 2022: 3, 2026: 1 } },
    "CHI": { name: "Chile", flag: "cl", confed: "CONMEBOL", history: { 1930: 1, 1950: 1, 1962: 4, 1966: 1, 1974: 1, 1982: 1, 1998: 2, 2010: 2, 2014: 2 } },
    "COL": { name: "Colombia", flag: "co", confed: "CONMEBOL", history: { 1962: 1, 1990: 2, 1994: 1, 1998: 1, 2014: 3, 2018: 2, 2026: 1 } },
    "ECU": { name: "Ecuador", flag: "ec", confed: "CONMEBOL", history: { 2002: 1, 2006: 2, 2014: 1, 2022: 1, 2026: 1 } },
    "PAR": { name: "Paraguay", flag: "py", confed: "CONMEBOL", history: { 1930: 1, 1950: 1, 1958: 1, 1986: 2, 1998: 2, 2002: 2, 2006: 1, 2010: 3, 2026: 1 } },
    "PER": { name: "Peru", flag: "pe", confed: "CONMEBOL", history: { 1930: 1, 1970: 3, 1978: 3, 1982: 1, 2018: 1 } },
    "URU": { name: "Uruguay", flag: "uy", confed: "CONMEBOL", history: { 1930: 6, 1950: 6, 1954: 4, 1962: 1, 1966: 3, 1970: 4, 1974: 1, 1986: 2, 1990: 2, 2002: 1, 2010: 4, 2014: 2, 2018: 3, 2022: 1, 2026: 1 } },
    "VEN": { name: "Venezuela", flag: "ve", confed: "CONMEBOL", history: {} },

    // --- CONCACAF (North, Central America & Caribbean) ---
    "AIA": { name: "Anguilla", flag: "ai", confed: "CONCACAF", history: {} },
    "ATG": { name: "Antigua and Barbuda", flag: "ag", confed: "CONCACAF", history: {} },
    "ARU": { name: "Aruba", flag: "aw", confed: "CONCACAF", history: {} },
    "BAH": { name: "Bahamas", flag: "bs", confed: "CONCACAF", history: {} },
    "BRB": { name: "Barbados", flag: "bb", confed: "CONCACAF", history: {} },
    "BLZ": { name: "Belize", flag: "bz", confed: "CONCACAF", history: {} },
    "BER": { name: "Bermuda", flag: "bm", confed: "CONCACAF", history: {} },
    "VGB": { name: "British Virgin Islands", flag: "vg", confed: "CONCACAF", history: {} },
    "CAN": { name: "Canada", flag: "ca", confed: "CONCACAF", history: { 1986: 1, 2022: 1, 2026: 1 } },
    "CYM": { name: "Cayman Islands", flag: "ky", confed: "CONCACAF", history: {} },
    "CRC": { name: "Costa Rica", flag: "cr", confed: "CONCACAF", history: { 1990: 2, 2002: 1, 2006: 1, 2014: 3, 2018: 1, 2022: 1 } },
    "CUB": { name: "Cuba", flag: "cu", confed: "CONCACAF", history: { 1938: 3 } },
    "CUW": { name: "Curaçao", flag: "cw", confed: "CONCACAF", history: { 2026: 1 } },
    "DMA": { name: "Dominica", flag: "dm", confed: "CONCACAF", history: {} },
    "DOM": { name: "Dominican Republic", flag: "do", confed: "CONCACAF", history: {} },
    "SLV": { name: "El Salvador", flag: "sv", confed: "CONCACAF", history: { 1970: 1, 1982: 1 } },
    "GRN": { name: "Grenada", flag: "gd", confed: "CONCACAF", history: {} },
    "GUA": { name: "Guatemala", flag: "gt", confed: "CONCACAF", history: {} },
    "GUY": { name: "Guyana", flag: "gy", confed: "CONCACAF", history: {} },
    "HAI": { name: "Haiti", flag: "ht", confed: "CONCACAF", history: { 1974: 1, 2026: 1 } },
    "HON": { name: "Honduras", flag: "hn", confed: "CONCACAF", history: { 1982: 1, 2010: 1, 2014: 1 } },
    "JAM": { name: "Jamaica", flag: "jm", confed: "CONCACAF", history: { 1998: 1 } },
    "MEX": { name: "Mexico", flag: "mx", confed: "CONCACAF", history: { 1930: 1, 1950: 1, 1954: 1, 1958: 1, 1962: 1, 1966: 1, 1970: 3, 1978: 1, 1986: 3, 1994: 2, 1998: 2, 2002: 2, 2006: 2, 2010: 2, 2014: 2, 2018: 2, 2022: 1, 2026: 1 } },
    "MSR": { name: "Montserrat", flag: "ms", confed: "CONCACAF", history: {} },
    "PAN": { name: "Panama", flag: "pa", confed: "CONCACAF", history: { 2018: 1, 2026: 1 } },
    "PUR": { name: "Puerto Rico", flag: "pr", confed: "CONCACAF", history: {} },
    "SKN": { name: "Saint Kitts and Nevis", flag: "kn", confed: "CONCACAF", history: {} },
    "LCA": { name: "Saint Lucia", flag: "lc", confed: "CONCACAF", history: {} },
    "VIN": { name: "Saint Vincent and the Grenadines", flag: "vc", confed: "CONCACAF", history: {} },
    "SXM": { name: "Sint Maarten", flag: "sx", confed: "CONCACAF", history: {} },
    "SUR": { name: "Suriname", flag: "sr", confed: "CONCACAF", history: {} },
    "TRI": { name: "Trinidad and Tobago", flag: "tt", confed: "CONCACAF", history: { 2006: 1 } },
    "USA": { name: "United States", flag: "us", confed: "CONCACAF", history: { 1930: 4, 1934: 1, 1950: 1, 1990: 1, 1994: 2, 1998: 1, 2002: 3, 2006: 1, 2010: 2, 2014: 2, 2022: 2, 2026: 1 } },

    // --- CAF (Africa) ---
    "ALG": { name: "Algeria", flag: "dz", confed: "CAF", history: { 1982: 1, 1986: 1, 2010: 1, 2014: 2, 2026: 1 } },
    "ANG": { name: "Angola", flag: "ao", confed: "CAF", history: { 2006: 1 } },
    "CMR": { name: "Cameroon", flag: "cm", confed: "CAF", history: { 1982: 1, 1990: 3, 1994: 1, 1998: 1, 2002: 1, 2010: 1, 2014: 1, 2022: 1 } },
    "CPV": { name: "Cape Verde", flag: "cv", confed: "CAF", history: { 2026: 1 } },
    "COD": { 
      name: "DR Congo", 
      flag: "cd", 
      confed: "CAF", 
      history: { 1974: 1, 2026: 1 },
      notes: { 1974: "Competed as Zaire" }
    },
    "EGY": { name: "Egypt", flag: "eg", confed: "CAF", history: { 1934: 1, 1990: 1, 2018: 1, 2026: 1 } },
    "GHA": { name: "Ghana", flag: "gh", confed: "CAF", history: { 2006: 2, 2010: 3, 2014: 1, 2022: 1, 2026: 1 } },
    "CIV": { name: "Ivory Coast", flag: "ci", confed: "CAF", history: { 2006: 1, 2010: 1, 2014: 1, 2026: 1 } },
    "MAR": { name: "Morocco", flag: "ma", confed: "CAF", history: { 1970: 1, 1986: 2, 1994: 1, 1998: 1, 2018: 1, 2022: 4, 2026: 1 } },
    "NGA": { name: "Nigeria", flag: "ng", confed: "CAF", history: { 1994: 2, 1998: 2, 2002: 1, 2010: 1, 2014: 2, 2018: 1 } },
    "SEN": { name: "Senegal", flag: "sn", confed: "CAF", history: { 2002: 3, 2018: 1, 2022: 2, 2026: 1 } },
    "RSA": { name: "South Africa", flag: "za", confed: "CAF", history: { 1998: 1, 2002: 1, 2010: 1, 2026: 1 } },
    "TOG": { name: "Togo", flag: "tg", confed: "CAF", history: { 2006: 1 } },
    "TUN": { name: "Tunisia", flag: "tn", confed: "CAF", history: { 1978: 1, 1998: 1, 2002: 1, 2006: 1, 2018: 1, 2022: 1, 2026: 1 } },

    // --- AFC (Asia) ---
    "AUS": { name: "Australia", flag: "au", confed: "AFC", history: { 1974: 1, 2006: 2, 2010: 1, 2014: 1, 2018: 1, 2022: 2, 2026: 1 } },
    "CHN": { name: "China", flag: "cn", confed: "AFC", history: { 2002: 1 } },
    "IDN": { 
      name: "Indonesia", 
      flag: "id", 
      confed: "AFC", 
      history: { 1938: 1 },
      notes: { 1938: "Competed as Dutch East Indies" }
    },
    "IRN": { name: "Iran", flag: "ir", confed: "AFC", history: { 1978: 1, 1998: 1, 2006: 1, 2014: 1, 2018: 1, 2022: 1, 2026: 1 } },
    "IRQ": { name: "Iraq", flag: "iq", confed: "AFC", history: { 1986: 1, 2026: 1 } },
    "JPN": { name: "Japan", flag: "jp", confed: "AFC", history: { 1998: 1, 2002: 2, 2006: 1, 2010: 2, 2014: 1, 2018: 2, 2022: 2, 2026: 1 } },
    "JOR": { name: "Jordan", flag: "jo", confed: "AFC", history: { 2026: 1 } },
    "KUW": { name: "Kuwait", flag: "kw", confed: "AFC", history: { 1982: 1 } },
    "PRK": { name: "North Korea", flag: "kp", confed: "AFC", history: { 1966: 3, 2010: 1 } },
    "QAT": { name: "Qatar", flag: "qa", confed: "AFC", history: { 2022: 1, 2026: 1 } },
    "KOR": { name: "South Korea", flag: "kr", confed: "AFC", history: { 1954: 1, 1986: 1, 1990: 1, 1994: 1, 1998: 1, 2002: 4, 2006: 1, 2010: 2, 2014: 1, 2018: 1, 2022: 2, 2026: 1 } },
    "KSA": { name: "Saudi Arabia", flag: "sa", confed: "AFC", history: { 1994: 2, 1998: 1, 2002: 1, 2006: 1, 2018: 1, 2022: 1, 2026: 1 } },
    "UAE": { name: "United Arab Emirates", flag: "ae", confed: "AFC", history: { 1990: 1 } },
    "UZB": { name: "Uzbekistan", flag: "uz", confed: "AFC", history: { 2026: 1 } },

    // --- OFC (Oceania) ---
    "NZL": { name: "New Zealand", flag: "nz", confed: "OFC", history: { 1982: 1, 2010: 1, 2026: 1 } }
  }
};

// All historical calendar years for generating timeline controls
const allYears = [
  1930, 1934, 1938, 1942, 1946, 1950, 1954, 1958, 1962, 1966, 
  1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 
  2010, 2014, 2018, 2022, 2026
];

// Stage index mapping labels
const stageNames = {
  0: 'Did Not Participate',
  1: 'Group Stage',
  2: 'Round of 16 / Second Group Stage',
  3: 'Quarter-finals',
  4: 'Semi-finals / Third/Fourth Place',
  5: 'Runners-up',
  6: 'Champions'
};

/**
 * 1. Setup & initialization routines
 */
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  buildTimelineYearButtons();
  
  const initialNavBtn = document.querySelector('header nav button.active') || document.querySelector('.nav-btn');
  const initialFilterBtn = document.querySelector('.filter-bar button.active') || document.querySelector('.filter-btn');
  
  switchView('members', initialNavBtn);
  filterConfed('ALL', initialFilterBtn);
}

/**
 * 2. View Switcher Framework
 */
function switchView(viewName, clickedButton) {
  currentView = viewName;
  const membersSection = document.getElementById('members-view');
  const yearsSection = document.getElementById('years-view');

  if (viewName === 'members') {
    if (membersSection) membersSection.classList.remove('hidden');
    if (yearsSection) yearsSection.classList.add('hidden');
  } else {
    if (yearsSection) yearsSection.classList.remove('hidden');
    if (membersSection) membersSection.classList.add('hidden');
    
    // Auto-select 1974 if first time arriving on timeline view
    if (!activeSelectedYear) {
      const firstActiveBtn = Array.from(document.querySelectorAll('#years-buttons .year-btn')).find(b => !b.classList.contains('cancelled'));
      if (firstActiveBtn) firstActiveBtn.click();
    }
  }

  let targetNavBtn = clickedButton;
  if (!targetNavBtn) {
    targetNavBtn = Array.from(document.querySelectorAll('header nav button, .nav-btn')).find(
      btn => btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${viewName}'`)
    );
  }
  handleActiveHighlight('header nav button, .nav-btn', targetNavBtn);
}

/**
 * 3. Sorting & Rendering Logic - Members View
 */
function getSortedCountryKeys(keysArray) {
  return [...keysArray].sort((a, b) => {
    const nameA = (wcData.countries[a]?.name || '').toLowerCase();
    const nameB = (wcData.countries[b]?.name || '').toLowerCase();
    return nameA.localeCompare(nameB);
  });
}

function filterConfed(confedCode, clickedButton) {
  activeConfedFilter = confedCode;
  handleActiveHighlight('.filter-bar button, .filter-btn', clickedButton);

  const gridElement = document.getElementById('flag-grid');
  if (!gridElement) return;
  gridElement.innerHTML = '';

  let targetKeys = Object.keys(wcData.countries);
  if (confedCode !== 'ALL') {
    targetKeys = targetKeys.filter(key => wcData.countries[key]?.confed === confedCode);
  }

  const sortedKeys = getSortedCountryKeys(targetKeys);

  sortedKeys.forEach(key => {
    const country = wcData.countries[key];
    const card = document.createElement('div');
    card.className = 'flag-card';
    card.onclick = () => openCountryModal(key);

    card.innerHTML = `
      <span class="flag-icon fi fi-${country.flag}"></span>
      <div class="flag-country-name">${country.name}</div>
    `;
    gridElement.appendChild(card);
  });
}

/**
 * 4. Sorting & Rendering Logic - Timeline View
 */
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
      button.title = `The ${year} tournament was cancelled due to World War II.`;
    } else {
      button.onclick = () => showYearDetails(year, button);
    }

    container.appendChild(button);
  });
}

function switchTimelineSubView(subView, clickedButton) {
  currentTimelineSubView = subView;
  handleActiveHighlight('.timeline-tabs button', clickedButton);

  if (activeSelectedYear) {
    renderYearParticipants(activeSelectedYear);
  }
}

function showYearDetails(year, clickedButton) {
  activeSelectedYear = year;
  handleActiveHighlight('#years-buttons .year-btn', clickedButton);

  const detailsSection = document.getElementById('year-details');
  const titleElement = document.getElementById('selected-year-title');
  
  if (!detailsSection || !titleElement) return;
  
  titleElement.innerText = `🏆 ${year} Tournament Participants`;
  detailsSection.classList.remove('hidden');

  renderYearParticipants(year);
}

function renderYearParticipants(year) {
  const container = document.getElementById('year-participants');
  if (!container) return;
  container.innerHTML = '';

  const participantKeys = Object.keys(wcData.countries).filter(key => {
    return wcData.countries[key].history && wcData.countries[key].history[year] !== undefined;
  });

  if (participantKeys.length === 0) {
    container.innerHTML = '<p class="text-muted">No participant data recorded for this tournament year.</p>';
    return;
  }

  if (currentTimelineSubView === 'alpha') {
    container.className = 'flag-grid';
    const sortedKeys = getSortedCountryKeys(participantKeys);
    sortedKeys.forEach(key => {
      container.appendChild(createParticipantCard(key, year));
    });

  } else if (currentTimelineSubView === 'confed') {
    container.className = 'confed-timeline-container';
    const confedOrder = ['UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'];
    
    confedOrder.forEach(confed => {
      const confedKeys = participantKeys.filter(key => wcData.countries[key]?.confed === confed);
      if (confedKeys.length === 0) return;

      const sortedConfedKeys = getSortedCountryKeys(confedKeys);
      const groupBlock = document.createElement('div');
      groupBlock.className = 'confed-group-block';
      groupBlock.innerHTML = `<h3 class="confed-group-title" style="margin: 20px 0 10px 0; color: #fff;">${confed} <span class="text-muted">(${sortedConfedKeys.length})</span></h3>`;

      const subGrid = document.createElement('div');
      subGrid.className = 'flag-grid';
      sortedConfedKeys.forEach(key => {
        subGrid.appendChild(createParticipantCard(key, year));
      });

      groupBlock.appendChild(subGrid);
      container.appendChild(groupBlock);
    });

  } else if (currentTimelineSubView === 'group') {
    container.className = 'group-stage-container';

    if (year === 1934 || year === 1938) {
      container.innerHTML = `<p class="text-muted" style="padding: 30px; text-align: center;">The ${year} World Cup structure did not feature a group stage phase (Straight Knockout Format).</p>`;
      return;
    }

    const stageData = getHistoricalGroupsForYear(year);
    renderWikipediaTables(container, stageData, year);
  }
}

/**
 * Wikipedia-Style Structural Table Rendering Engine
 */
function renderWikipediaTables(container, stageData, year) {
  stageData.forEach(stage => {
    if (stage.phaseTitle) {
      const phaseHeader = document.createElement('h3');
      phaseHeader.style.cssText = "color: #0070f3; margin: 35px 0 15px 0; border-bottom: 2px solid #2c2c2c; padding-bottom: 6px; font-size: 1.25rem;";
      phaseHeader.innerText = stage.phaseTitle;
      container.appendChild(phaseHeader);
    }

    stage.groups.forEach(group => {
      const groupWrapper = document.createElement('div');
      groupWrapper.style.marginBottom = "30px";

      const title = document.createElement('h4');
      title.style.cssText = "color: #fff; margin-bottom: 10px; font-weight: 600; font-size: 1.1rem;";
      title.innerText = group.name;
      groupWrapper.appendChild(title);

      const table = document.createElement('table');
      table.className = "wiki-standing-table";
      
      table.innerHTML = `
        <thead>
          <tr>
            <th style="width: 45px; text-align: center;">Pos</th>
            <th style="text-align: left;">Team</th>
            <th style="width: 45px; text-align: center;">Pld</th>
            <th style="width: 40px; text-align: center;">W</th>
            <th style="width: 40px; text-align: center;">D</th>
            <th style="width: 40px; text-align: center;">L</th>
            <th style="width: 45px; text-align: center;">GF</th>
            <th style="width: 45px; text-align: center;">GA</th>
            <th style="width: 50px; text-align: center;">GD</th>
            <th style="width: 45px; text-align: center;">Pts</th>
          </tr>
        </thead>
        <tbody>
          ${group.teams.map((t, idx) => {
            const rowClass = idx < 2 ? 'advance-row' : '';
            const gdPrefix = t.gd > 0 ? '+' : '';
            return `
              <tr class="${rowClass}">
                <td style="text-align: center; font-weight: bold;">${idx + 1}</td>
                <td style="text-align: left; font-weight: 500;">
                  <span class="flag-icon fi fi-${t.flag}" style="margin-right: 10px; border-radius: 2px;"></span>${t.name}
                </td>
                <td style="text-align: center;">${t.pld}</td>
                <td style="text-align: center;">${t.w}</td>
                <td style="text-align: center;">${t.d}</td>
                <td style="text-align: center;">${t.l}</td>
                <td style="text-align: center;">${t.gf}</td>
                <td style="text-align: center;">${t.ga}</td>
                <td style="text-align: center;">${gdPrefix}${t.gd}</td>
                <td style="text-align: center; font-weight: bold;">${t.pts}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      `;
      groupWrapper.appendChild(table);
      container.appendChild(groupWrapper);
    });
  });
}

/**
 * Historical Data Router for Group Stage Standings
 */
function getHistoricalGroupsForYear(year) {
  if (year === 1974) {
    return [
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
      },
      {
        phaseTitle: "Second Round Group Stage",
        groups: [
          { name: "Group A", teams: [
            { name: "Netherlands", flag: "nl", pld: 3, w: 3, d: 0, l: 0, gf: 8, ga: 0, gd: 8, pts: 6 }, 
            { name: "Brazil", flag: "br", pld: 3, w: 2, d: 0, l: 1, gf: 3, ga: 3, gd: 0, pts: 4 },
            { name: "East Germany", flag: "de", pld: 3, w: 0, d: 1, l: 2, gf: 1, ga: 4, gd: -3, pts: 1 },
            { name: "Argentina", flag: "ar", pld: 3, w: 0, d: 1, l: 2, gf: 2, ga: 7, gd: -5, pts: 1 }
          ] }
        ]
      }
    ];
  }

  if (year === 1978) {
    return [
      {
        phaseTitle: "First Round Group Stage",
        groups: [
          { name: "Group 1", teams: [
            { name: "Italy", flag: "it", pld: 3, w: 3, d: 0, l: 0, gf: 6, ga: 2, gd: 4, pts: 6 },
            { name: "Argentina", flag: "ar", pld: 3, w: 2, d: 0, l: 1, gf: 4, ga: 3, gd: 1, pts: 4 },
            { name: "France", flag: "fr", pld: 3, w: 1, d: 0, l: 2, gf: 5, ga: 5, gd: 0, pts: 2 },
            { name: "Hungary", flag: "hu", pld: 3, w: 0, d: 0, l: 3, gf: 3, ga: 8, gd: -5, pts: 0 }
          ]}
        ]
      }
    ];
  }

  if (year === 1982) {
    return [
      {
        phaseTitle: "First Group Stage",
        groups: [
          { name: "Group 6", teams: [
            { name: "Brazil", flag: "br", pld: 3, w: 3, d: 0, l: 0, gf: 10, ga: 2, gd: 8, pts: 6 },
            { name: "Soviet Union", flag: "ru", pld: 3, w: 1, d: 1, l: 1, gf: 6, ga: 4, gd: 2, pts: 3 },
            { name: "Scotland", flag: "gb-sct", pld: 3, w: 1, d: 1, l: 1, gf: 8, ga: 8, gd: 0, pts: 3 },
            { name: "New Zealand", flag: "nz", pld: 3, w: 0, d: 0, l: 3, gf: 2, ga: 12, gd: -10, pts: 0 }
          ]}
        ]
      }
    ];
  }

  // General standard format layout (1950-1970, 1986-2026)
  return [
    {
      phaseTitle: "Group Stage Match Formats",
      groups: [
        { name: "Group A Template", teams: [
          { name: "Argentina", flag: "ar", pld: 3, w: 2, d: 1, l: 0, gf: 6, ga: 2, gd: 4, pts: 5 }, 
          { name: "Italy", flag: "it", pld: 3, w: 1, d: 2, l: 0, gf: 5, ga: 4, gd: 1, pts: 4 },
          { name: "Bulgaria", flag: "bg", pld: 3, w: 0, d: 2, l: 1, gf: 2, ga: 4, gd: -2, pts: 2 },
          { name: "South Korea", flag: "kr", pld: 3, w: 0, d: 1, l: 2, gf: 4, ga: 7, gd: -3, pts: 1 }
        ] }
      ]
    }
  ];
}

function createParticipantCard(key, year) {
  const country = wcData.countries[key];
  const card = document.createElement('div');
  card.className = 'flag-card';
  card.onclick = () => openCountryModal(key);
  
  let displayName = country.name;
  if (country.notes && country.notes[year] && key !== "GDR") {
    displayName = `${country.name} (${country.notes[year]})`;
  }

  card.innerHTML = `
    <span class="flag-icon fi fi-${country.flag}"></span>
    <div class="flag-country-name">${displayName}</div>
  `;
  return card;
}

/**
 * 5. Historical Analysis Modal Overlay & Charts
 */
function openCountryModal(countryKey) {
  const country = wcData.countries[countryKey];
  if (!country) return;

  const modal = document.getElementById('chart-modal');
  const title = document.getElementById('modal-country-name');
  const canvasContainer = document.querySelector('.chart-container');
  const fallbackMsg = document.getElementById('fallback-msg') || createFallbackMsgElement();

  if (!modal || !title) return;

  title.innerText = `${country.name} Performance History`;
  modal.classList.remove('hidden');

  const structuralHistory = Object.keys(country.history);
  if (structuralHistory.length === 0) {
    if (canvasContainer) canvasContainer.classList.add("hidden");
    fallbackMsg.classList.remove("hidden");
    fallbackMsg.innerText = `${country.name} has not participated in a World Cup final tournament.`;
    return;
  }

  if (canvasContainer) canvasContainer.classList.remove("hidden");
  fallbackMsg.classList.add("hidden");

  const chartData = allYears.map(year => {
    if (year === 1942 || year === 1946) return null;
    return country.history[year] !== undefined ? country.history[year] : 0;
  });

  if (performanceChart) {
    performanceChart.destroy();
  }

  const ctx = document.getElementById('historyChart').getContext('2d');
  Chart.defaults.color = '#888888';
  Chart.defaults.borderColor = '#2c2c2c';

  performanceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: allYears,
      datasets: [{
        label: 'Finishing Stage',
        data: chartData,
        borderColor: '#0070f3',
        backgroundColor: 'rgba(0, 112, 243, 0.05)',
        pointBackgroundColor: '#0070f3',
        pointBorderColor: '#161616',
        pointHoverBackgroundColor: '#fff',
        pointRadius: 4,
        stepped: true,
        spanGaps: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false } },
        y: {
          min: 0,
          max: 6,
          ticks: {
            stepSize: 1,
            callback: function(value) { return stageNames[value]; }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const year = context.label;
              let labelText = `Stage: ${stageNames[context.raw]}`;
              if (country.notes && country.notes[year] && context.raw > 0) {
                labelText += ` (${country.notes[year]})`;
              }
              return labelText;
            }
          }
        }
      }
    }
  });
}

function closeModal() {
  const modal = document.getElementById('chart-modal');
  if (modal) modal.classList.add('hidden');
}

function createFallbackMsgElement() {
  const p = document.createElement('p');
  p.id = 'fallback-msg';
  p.className = 'text-muted';
  p.style.textAlign = 'center';
  p.style.padding = '20px';
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) modalContent.appendChild(p);
  return p;
}

/**
 * 6. Global Utility Helpers
 */
function handleActiveHighlight(selectorGroup, activeElement) {
  if (!activeElement) return;
  const elements = document.querySelectorAll(selectorGroup);
  elements.forEach(el => el.classList.remove('active'));
  activeElement.classList.add('active');
}
