// src/utils/hreflang-mapping.ts
import type { AlternateLinkInfo } from '~/types';
import { SITE } from '~/utils/config.ts';

// --- I18N CONFIGURATION CONSTANTS ---
// Estos valores DEBEN coincidir con tu astro.config.ts y cómo manejas los idiomas.
const SITE_URL = SITE.site.endsWith('/') ? SITE.site.slice(0, -1) : SITE.site;
const SUPPORTED_LANGS_CODES = ['en', 'es', 'nl', 'fr', 'de'];
const DEFAULT_LANG_CODE = 'es';
const PREFIX_DEFAULT_LOCALE = false;

const LANG_TO_HREFLANG_MAP: Record<string, string> = {
  en: 'en-US',
  es: 'es-ES',
  nl: 'nl-NL',
  fr: 'fr-FR',
  de: 'de-DE',
};

// --- PAGE MAPPINGS ---
// Define la estructura para mapear pageKeys a sus slugs.
interface PageUrlDefinition {
  /** El slug base de la página, usualmente para el idioma por defecto o un slug canónico. */
  baseSlug: string;
  /** Slugs específicos por idioma si difieren del baseSlug. NO incluir prefijo de idioma aquí. */
  langSlugs?: {
    [langCode: string]: string;
  };
}

const pageMappings: Record<string, PageUrlDefinition> = {
  home: { baseSlug: '' }, // Raíz
  contact: {
    baseSlug: 'contacto', // Slug para 'es' (default)
    langSlugs: {
      en: 'contact',
      de: 'kontakt',
      // nl y fr usarán 'contacto' como base si no se definen aquí
    },
  },
  services: {
    baseSlug: 'servicios', // Slug para 'es' (default)
    langSlugs: {
      en: 'services',
      nl: 'diensten',
      de: 'dienstleistungen',
    },
  },
  pricing: {
    baseSlug: 'pricing', // Asumimos que 'pricing' es el slug para 'es' (default)
    // Si en español es '/precios/', entonces baseSlug: 'precios'
    langSlugs: {
      en: 'pricing',
      nl: 'prijzen',
      fr: 'tarifs',
      de: 'preise',
    },
  },
  about: {
    baseSlug: 'nosotros', // Slug para 'es' (default)
    langSlugs: {
      en: 'about',
      nl: 'over-ons',
      fr: 'a-propos',
      de: 'ueber-uns',
    },
  },
  privacy: {
    baseSlug: 'privacidad', // Slug para 'es' (default)
    langSlugs: {
      en: 'privacy',
      nl: 'privacybeleid',
      fr: 'confidentialite',
      de: 'datenschutz',
    },
  },
  terms: {
    baseSlug: 'terminos', // Slug para 'es' (default)
    langSlugs: {
      en: 'terms',
      nl: 'voorwaarden',
      fr: 'conditions-generales',
      de: 'geschaeftsbedingungen',
    },
  },
  building: {
    baseSlug: 'contruyendo', // Slug para 'es' (default)
    langSlugs: {
      en: 'building',
      nl: 'bouw',
      fr: 'construction',
      de: 'gebaeude',
    },
  },
  'course-enneagram-game': {
    baseSlug: 'landing/curso-eneagrama-game', // Slug para 'es' (default)
    langSlugs: {
      en: 'landing/course-enneagram-game',   // Slug para 'en'
      nl: 'bestemmingspagina/enneagram-cursus-spel',  // Slug para 'nl' (SIN prefijo /nl/)
      fr: 'page-daccueil/cours-jeu-enneagramme', // Slug para 'fr' (SIN prefijo /fr/)
      de: 'startseite/enneagramm-kurs-spiel',  // Slug para 'de' (SIN prefijo /de/)
    },
  },
  '404': { baseSlug: '404' }, // El slug '404' suele ser el mismo
};

/**
 * Helper para limpiar y normalizar un segmento de slug.
 * @param slug Segmento de slug.
 * @returns Slug limpio (sin slashes al inicio/final).
 */
function normalizeSlugSegment(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '');
}

/**
 * Obtiene una clave de página canónica a partir de una ruta de URL de Astro.
 * @param astroUrlPathname El pathname de Astro.url (ej. '/es/nosotros/', '/about/').
 * @param currentLocale El locale actual de la página (ej. 'es', 'en').
 * @returns La clave de página canónica o null si no se encuentra.
 */
export function getPageKeyForPath(astroUrlPathname: string, currentLocale: string, defaultLang?: string): string | null {
  let pathWithoutLangPrefix = normalizeSlugSegment(astroUrlPathname);

  // 1. Quitar el prefijo de idioma si la página actual NO es el idioma por defecto
  // O si ES el idioma por defecto PERO este SÍ usa prefijo.
  if (currentLocale !== DEFAULT_LANG_CODE || (currentLocale === DEFAULT_LANG_CODE && PREFIX_DEFAULT_LOCALE)) {
    if (pathWithoutLangPrefix.startsWith(`${currentLocale}`)) {
      pathWithoutLangPrefix = normalizeSlugSegment(pathWithoutLangPrefix.substring(currentLocale.length));
    }
  }

  if (pathWithoutLangPrefix === '') return 'home';

  // 2. Buscar la pageKey
  for (const key in pageMappings) {
    const mapping = pageMappings[key];
    // Verificar si el path sin prefijo coincide con un langSlug para el idioma actual
    if (mapping.langSlugs && mapping.langSlugs[currentLocale] === pathWithoutLangPrefix) {
      return key;
    }
    // Verificar si el path sin prefijo coincide con el baseSlug
    // (esto aplicaría para el idioma por defecto sin prefijo, o si otros idiomas usan el baseSlug)
    if (mapping.baseSlug === pathWithoutLangPrefix) {
      return key;
    }
  }

  console.warn(`[hreflang] No page key found for path: "${astroUrlPathname}" (processed to: "${pathWithoutLangPrefix}" for locale: "${currentLocale}")`);
  return null;
}

/**
 * Genera los enlaces alternate para una clave de página dada.
 * @param pageKey La clave de página canónica.
 * @param currentLocaleToExclude Opcional: el locale actual de la página (para no incluirlo en los alternates si se desea).
 * @returns Un array de objetos AlternateLinkInfo.
 */
export function getAlternateLinksForPage(pageKey: string, currentLocaleToExclude?: string): AlternateLinkInfo[] {
  const mapping = pageMappings[pageKey];
  if (!mapping) {
    console.warn(`[hreflang] Invalid pageKey "${pageKey}" for generating alternate links.`);
    return [];
  }

  const alternateLinks: AlternateLinkInfo[] = [];

  SUPPORTED_LANGS_CODES.forEach(langCode => {
    // Descomenta la siguiente línea si NO quieres un enlace hreflang para la página actual
    // if (currentLocaleToExclude && langCode === currentLocaleToExclude) {
    //   return;
    // }

    let langUrlPrefix = '';
    if (langCode !== DEFAULT_LANG_CODE || (langCode === DEFAULT_LANG_CODE && PREFIX_DEFAULT_LOCALE)) {
      langUrlPrefix = `/${langCode}`;
    }

    // Prioridad: slug específico del idioma, luego el baseSlug.
    // Los slugs en pageMappings NO deben tener prefijos de idioma.
    const slugForLang = (mapping.langSlugs && mapping.langSlugs[langCode])
      ? normalizeSlugSegment(mapping.langSlugs[langCode])
      : normalizeSlugSegment(mapping.baseSlug);

    // Construir la ruta relativa (ej. /es/contacto o /about)
    const pathParts = [langUrlPrefix, slugForLang].map(normalizeSlugSegment).filter(Boolean);
    const relativePath = pathParts.length > 0 ? `/${pathParts.join('/')}` : '';

    let finalHref = `${SITE_URL}${relativePath || '/'}`; // Añadir '/' si relativePath es vacío (para home)

    // Asegurar un trailing slash si no es solo el dominio base y si el slug no estaba vacío
    if (finalHref !== SITE_URL + '/' && slugForLang !== '') {
      if (!finalHref.endsWith('/')) {
        finalHref += '/';
      }
    } else if (finalHref === SITE_URL && !finalHref.endsWith('/')) { // Para SITE_URL solo
      finalHref += '/';
    }
    finalHref = finalHref.replace(/\/\//g, '/'); // Limpiar doble slashes por si acaso


    alternateLinks.push({
      hreflang: LANG_TO_HREFLANG_MAP[langCode] || langCode, // ej. 'es-ES'
      href: finalHref,
    });
  });

  return alternateLinks;
}