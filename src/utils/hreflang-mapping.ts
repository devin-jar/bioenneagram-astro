// src/utils/hreflang-mapping.ts
import type { AlternateLinkInfo } from '~/types';
import { SITE } from '~/utils/config.ts';

// --- I18N CONFIGURATION CONSTANTS ---
// Asegurarse de que SITE_URL no tenga un slash al final para un control predecible
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
interface PageUrlDefinition {
  baseSlug: string;
  langSlugs?: {
    [langCode: string]: string;
  };
}

const pageMappings: Record<string, PageUrlDefinition> = {
  home: { baseSlug: '' },
  contact: {
    baseSlug: 'contacto',
    langSlugs: { en: 'contact', de: 'kontakt' },
  },
  services: {
    baseSlug: 'servicios',
    langSlugs: { en: 'services', nl: 'diensten', de: 'dienstleistungen' },
  },
  pricing: {
    baseSlug: 'pricing',
    langSlugs: { en: 'pricing', nl: 'prijzen', fr: 'tarifs', de: 'preise' },
  },
  about: {
    baseSlug: 'nosotros',
    langSlugs: { en: 'about', nl: 'over-ons', fr: 'a-propos', de: 'ueber-uns' },
  },
  privacy: {
    baseSlug: 'privacidad',
    langSlugs: { en: 'privacy', nl: 'privacybeleid', fr: 'confidentialite', de: 'datenschutz' },
  },
  terms: {
    baseSlug: 'terminos',
    langSlugs: { en: 'terms', nl: 'voorwaarden', fr: 'conditions-generales', de: 'geschaeftsbedingungen' },
  },
  building: {
    baseSlug: 'contruyendo',
    langSlugs: { en: 'building', nl: 'bouw', fr: 'construction', de: 'gebaeude' },
  },
  'course-enneagram-game': {
    baseSlug: 'landing/curso-eneagrama-game',
    langSlugs: {
      en: 'landing/course-enneagram-game',
      nl: 'bestemmingspagina/enneagram-cursus-spel',
      fr: 'page-daccueil/cours-jeu-enneagramme',
      de: 'startseite/enneagramm-kurs-spiel',
    },
  },
  '404': { baseSlug: '404' },
};

function normalizeSlugSegment(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '');
}

export function getPageKeyForPath(astroUrlPathname: string, currentLocale: string): string | null {
  let pathWithoutLangPrefix = normalizeSlugSegment(astroUrlPathname);

  if (currentLocale !== DEFAULT_LANG_CODE || (currentLocale === DEFAULT_LANG_CODE && PREFIX_DEFAULT_LOCALE)) {
    if (pathWithoutLangPrefix.startsWith(`${currentLocale}`)) {
      pathWithoutLangPrefix = normalizeSlugSegment(pathWithoutLangPrefix.substring(currentLocale.length));
    }
  }

  if (pathWithoutLangPrefix === '') return 'home';

  for (const key in pageMappings) {
    const mapping = pageMappings[key];
    if (mapping.langSlugs && mapping.langSlugs[currentLocale] === pathWithoutLangPrefix) {
      return key;
    }
    if (mapping.baseSlug === pathWithoutLangPrefix) {
      return key;
    }
  }

  console.warn(`[hreflang] No page key found for path: "${astroUrlPathname}" (processed to: "${pathWithoutLangPrefix}" for locale: "${currentLocale}")`);
  return null;
}

export function getAlternateLinksForPage(pageKey: string, currentLocaleToExclude?: string): AlternateLinkInfo[] {
  const mapping = pageMappings[pageKey];
  if (!mapping) {
    console.warn(`[hreflang] Invalid pageKey "${pageKey}" for generating alternate links.`);
    return [];
  }

  const alternateLinks: AlternateLinkInfo[] = [];

  SUPPORTED_LANGS_CODES.forEach(langCode => {
    let langUrlPrefix = '';
    if (langCode !== DEFAULT_LANG_CODE || (langCode === DEFAULT_LANG_CODE && PREFIX_DEFAULT_LOCALE)) {
      langUrlPrefix = `/${langCode}`;
    }

    const slugForLang = (mapping.langSlugs && mapping.langSlugs[langCode])
      ? normalizeSlugSegment(mapping.langSlugs[langCode])
      : normalizeSlugSegment(mapping.baseSlug);

    // --- CAMBIO PRINCIPAL AQUÍ ---
    // Construimos la ruta relativa de forma controlada
    const pathParts = [langUrlPrefix, slugForLang].map(p => normalizeSlugSegment(p)).filter(Boolean);
    const relativePath = pathParts.join('/');

    let finalHref: string;

    if (pageKey === 'home') {
      // Para la página de inicio, la URL base del idioma
      finalHref = langUrlPrefix ? `${SITE_URL}${langUrlPrefix}/` : `${SITE_URL}`;
    } else {
      // Para todas las demás páginas, no añadir el slash final
      finalHref = `${SITE_URL}/${relativePath}/`;
    }

    // Limpieza final para evitar dobles slashes si algo sale mal (ej. // -> /)
    // pero sin afectar el http://
    finalHref = finalHref.replace(/([^:])\/{2,}/g, '$1/');

    alternateLinks.push({
      hreflang: LANG_TO_HREFLANG_MAP[langCode] || langCode,
      href: finalHref,
    });
  });

  return alternateLinks;
}