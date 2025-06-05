export interface LanguageUrls {
  es?: string;
  en?: string;
  nl?: string;
  fr?: string;
  de?: string;
}

export interface HreflangMapping {
  [pageKey: string]: LanguageUrls;
}

export const BASE_URL = "https://bioenneagram.com";

export const hreflangMappings: HreflangMapping = {
  home: {
    es: `${BASE_URL}/`,
    en: `${BASE_URL}/en/`,
    nl: `${BASE_URL}/nl/`,
    fr: `${BASE_URL}/fr/`,
    de: `${BASE_URL}/de/`,
  },
  contact: {
    es: `${BASE_URL}/contacto/`,
    en: `${BASE_URL}/en/contact/`,
    nl: `${BASE_URL}/nl/contact/`,
    fr: `${BASE_URL}/fr/contact/`,
    de: `${BASE_URL}/de/kontakt/`,
  },
  services: {
    es: `${BASE_URL}/servicios/`,
    en: `${BASE_URL}/en/services/`,
    nl: `${BASE_URL}/nl/diensten/`,
    fr: `${BASE_URL}/fr/services/`,
    de: `${BASE_URL}/de/dienstleistungen/`,
  },
  pricing: {
    es: `${BASE_URL}/pricing/`, // Assuming 'pricing.astro' is the ES version as per file list.
    en: `${BASE_URL}/en/pricing/`,
    nl: `${BASE_URL}/nl/prijzen/`,
    fr: `${BASE_URL}/fr/tarifs/`,
    de: `${BASE_URL}/de/preise/`,
  },
  about: {
    es: `${BASE_URL}/nosotros/`,
    en: `${BASE_URL}/en/about/`,
    nl: `${BASE_URL}/nl/over-ons/`,
    fr: `${BASE_URL}/fr/a-propos/`,
    de: `${BASE_URL}/de/ueber-uns/`,
  },
  privacy: {
    es: `${BASE_URL}/privacidad/`,
    en: `${BASE_URL}/en/privacy/`,
    nl: `${BASE_URL}/nl/privacybeleid/`,
    fr: `${BASE_URL}/fr/confidentialite/`,
    de: `${BASE_URL}/de/datenschutz/`,
  },
  terms: {
    es: `${BASE_URL}/terminos/`,
    en: `${BASE_URL}/en/terms/`,
    nl: `${BASE_URL}/nl/voorwaarden/`,
    fr: `${BASE_URL}/fr/conditions-generales/`,
    de: `${BASE_URL}/de/geschaeftsbedingungen/`,
  },
  building: {
    es: `${BASE_URL}/contruyendo/`, // Corrected from 'construyendo' to 'contruyendo' as per file list
    en: `${BASE_URL}/en/building/`,
    nl: `${BASE_URL}/nl/bouw/`,
    fr: `${BASE_URL}/fr/construction/`,
    de: `${BASE_URL}/de/gebaeude/`,
  },
  "course-enneagram-game": {
    es: `${BASE_URL}/landing/curso-eneagrama-game/`,
    en: `${BASE_URL}/en/landing/course-enneagram-game/`,
    nl: `${BASE_URL}/nl/bestemmingspagina/enneagram-cursus-spel/`,
    fr: `${BASE_URL}/fr/page-daccueil/cours-jeu-enneagramme/`,
    de: `${BASE_URL}/de/startseite/enneagramm-kurs-spiel/`,
  },
  "404": {
    es: `${BASE_URL}/404/`,
    en: `${BASE_URL}/en/404/`,
    nl: `${BASE_URL}/nl/404/`,
    fr: `${BASE_URL}/fr/404/`,
    de: `${BASE_URL}/de/404/`,
  },
};

// Helper function to get URLs for a specific page key
export function getAlternateLinks(pageKey: string): LanguageUrls | undefined {
  return hreflangMappings[pageKey];
}

// Helper function to determine the current page's key based on its path
// This is a simplified example; a more robust solution would be needed for a complex site.
export function getPageKeyForPath(astroUrlPathname: string): string | undefined {
  // Remove leading/trailing slashes and language prefixes
  let path = astroUrlPathname.replace(/^\/|\/$/g, '');
  const langPrefixes = ['en', 'nl', 'fr', 'de'];
  for (const prefix of langPrefixes) {
    if (path.startsWith(`${prefix}/`)) {
      path = path.substring(prefix.length + 1);
      break;
    }
  }
  if (path === '') path = 'home'; // Root path

  // Direct mapping for simple cases (can be expanded)
  const pathMap: { [path: string]: string } = {
    home: "home",
    contact: "contact",
    contacto: "contact",
    kontakt: "contact",
    services: "services",
    servicios: "services",
    dienstleistungen: "services",
    pricing: "pricing",
    preise: "pricing",
    tarifs: "pricing",
    prijzen: "pricing",
    about: "about",
    nosotros: "about",
    "ueber-uns": "about",
    "a-propos": "about",
    "over-ons": "about",
    privacy: "privacy",
    privacidad: "privacy",
    datenschutz: "privacy",
    confidentialite: "privacy",
    privacybeleid: "privacy",
    terms: "terms",
    terminos: "terms",
    geschaeftsbedingungen: "terms",
    "conditions-generales": "terms",
    voorwaarden: "terms",
    building: "building",
    contruyendo: "building",
    gebaeude: "building",
    construction: "building",
    bouw: "building",
    "landing/curso-eneagrama-game": "course-enneagram-game",
    "en/landing/course-enneagram-game": "course-enneagram-game",
    "nl/bestemmingspagina/enneagram-cursus-spel": "course-enneagram-game",
    "fr/page-daccueil/cours-jeu-enneagramme": "course-enneagram-game",
    "de/startseite/enneagramm-kurs-spiel": "course-enneagram-game",
    "404": "404"
  };

  // Try to find a direct match or a match for known page slugs
  if (pathMap[path]) {
    return pathMap[path];
  }

  // More complex matching for nested pages like course-enneagram-game
  if (path.includes("curso-eneagrama-game") || path.includes("course-enneagram-game") || path.includes("enneagramm-kurs-spiel") || path.includes("cours-jeu-enneagramme") || path.includes("enneagram-cursus-spel")) {
    return "course-enneagram-game";
  }

  // Fallback for unmatched paths - this might need more sophisticated logic
  console.warn(`No page key found for path: ${astroUrlPathname}`);
  return undefined;
}
