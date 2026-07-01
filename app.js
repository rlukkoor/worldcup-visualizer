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

// Application Global State variables
let currentView = 'members';
let activeConfedFilter = 'ALL';
let currentChart = null;

// The complete array of calendar tournament stages since 1930
const allYears = [
  1930, 1934, 1938, 1942, 1946, 1950, 1954, 1958, 1962, 1966, 
  1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 
  2010, 2014, 2018, 2022, 2026
];

// Human-readable names describing finishing stages
const stageNames = {
  0: 'Did Not Participate',
  1: 'Group Stage',
  2: 'Round of 16 / Second Group Stage',
  3: 'Quarter-finals',
  4: 'Semi-finals / Third/Fourth Place',
  5: 'Runners-up',
  6: 'Champions'
};

document.addEventListener('DOMContentLoaded', () => {
  renderTimelineButtons();
  switchView('members');
  filterConfed('ALL');
});

// Generic helper function to clear out older active selections and freeze highlights
function handleActiveHighlight(selectorOrGroup, targetButton) {
  let itemGroup;
  if (typeof selectorOrGroup === 'string') {
    itemGroup = document.querySelectorAll(selectorOrGroup);
  } else {
    itemGroup = selectorOrGroup.children;
  }
  
  Array.from(itemGroup).forEach(btn => btn.classList.remove('active'));
  if (targetButton) {
    targetButton.classList.add('active');
  }
}

// 1. View Switcher with locked navigation highlighting
function switchView(viewName) {
  currentView = viewName;
  const membersSection = document.getElementById('members-view');
  const yearsSection = document.getElementById('years-view');

  if (viewName === 'members') {
    membersSection.classList.remove('hidden');
    yearsSection.classList.add('hidden');
  } else {
    yearsSection.classList.remove('hidden');
    membersSection.classList.add('hidden');
  }

  // Find and lock the styling for the clicked view toggle tab button
  const targetNavBtn = Array.from(document.querySelectorAll('.nav-tabs .nav-btn')).find(
    btn => btn.getAttribute('onclick').includes(`'${viewName}'`)
  );
  if (targetNavBtn) {
    handleActiveHighlight('.nav-tabs .nav-btn', targetNavBtn);
  }
}

// 2. Confederation Filter with locked navigation highlighting
function filterConfed(confedCode) {
  activeConfedFilter = confedCode;

  // Track down and freeze focus on the targeted filter button
  const targetFilterBtn = Array.from(document.querySelectorAll('.filter-container .filter-btn')).find(
    btn => btn.getAttribute('onclick').includes(`'${confedCode}'`)
  );
  if (targetFilterBtn) {
    handleActiveHighlight('.filter-container .filter-btn', targetFilterBtn);
  }

  const gridElement = document.getElementById('flag-grid');
  if (!gridElement) return;
  gridElement.innerHTML = '';

  Object.keys(wcData.countries).forEach(key => {
    const country = wcData.countries[key];
    if (confedCode !== 'ALL' && country.confed !== confedCode) return;

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

// Generates structural timeline elements
function renderTimelineButtons() {
  const container = document.getElementById('years-buttons');
  if (!container) return;
  container.innerHTML = '';

  allYears.forEach(year => {
    const button = document.createElement('button');
    button.className = 'year-btn';
    button.setAttribute('data-year', year);
    button.textContent = year;

    if (year === 1942 || year === 1946) {
      button.classList.add('cancelled');
      button.title = `The ${year} tournament was cancelled due to World War II.`;
    } else {
      button.onclick = () => showYearDetails(year, button);
    }
    container.appendChild(button);
  });
}

// 3. Year Detail Selector with active timeline button highlights
function showYearDetails(year, clickedButton) {
  const detailsSection = document.getElementById('year-details');
  const titleElement = document.getElementById('selected-year-title');
  const gridElement = document.getElementById('year-participants');

  // Freeze focus state color context around the specific year badge clicked
  if (clickedButton) {
    handleActiveHighlight('#years-buttons .year-btn', clickedButton);
  }

  gridElement.innerHTML = '';

  const participants = [];
  Object.keys(wcData.countries).forEach(key => {
    const country = wcData.countries[key];
    if (country.history && country.history[year] !== undefined) {
      participants.push({ key: key, data: country });
    }
  });

  // Displays text context using standard format: "2026 Tournament Participants (48)"
  titleElement.textContent = `🏆 ${year} Tournament Participants (${participants.length})`;

  if (participants.length === 0) {
    gridElement.innerHTML = '<p class="text-muted">No participant details matching this tournament timeline record.</p>';
  } else {
    participants.forEach(item => {
      const country = item.data;
      const key = item.key;
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
      gridElement.appendChild(card);
    });
  }

  detailsSection.classList.remove('hidden');
}

function openCountryModal(countryKey) {
  const modal = document.getElementById('chart-modal');
  const title = document.getElementById('modal-country-name');
  const canvasContainer = document.querySelector('.chart-container');
  const fallbackMsg = document.getElementById('fallback-msg') || createFallbackMsgElement();

  const country = wcData.countries[countryKey];
  title.textContent = `${country.name} Performance History`;
  modal.classList.remove('hidden');

  const structuralHistory = Object.keys(country.history);
  if (structuralHistory.length === 0) {
    canvasContainer.classList.add("hidden");
    fallbackMsg.classList.remove("hidden");
    fallbackMsg.innerText = `${country.name} has not participated in a World Cup final tournament.`;
    return;
  }

  canvasContainer.classList.remove("hidden");
  fallbackMsg.classList.add("hidden");

  const chartData = allYears.map(year => {
    if (year === 1942 || year === 1946) return null;
    return country.history[year] !== undefined ? country.history[year] : 0;
  });

  if (currentChart) currentChart.destroy();

  const ctx = document.getElementById('historyChart').getContext('2d');
  Chart.defaults.color = '#888888';
  Chart.defaults.borderColor = '#2c2c2c';

  currentChart = new Chart(ctx, {
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
