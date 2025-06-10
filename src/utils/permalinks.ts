// src/utils/permalinks.ts
import slugify from 'limax'; // Asumo que la sigues usando para cleanSlug

import { SITE, APP_BLOG } from '~/utils/config'; // Tus configuraciones
// import { trim } from '~/utils/utils'; // Tu utilidad trim

import {
  defaultLang,
  defaultLang as i18nDefaultLang,
  prefixDefaultLocale as i18nPrefixDefaultLocale,
  prefixDefaultLocale,
} from '~/i18n'; // Configuración i18n

// --- FUNCIONES AUXILIARES (exportadas si las necesitas en otros sitios) ---
export const trimSlash = (s: string) => s.replace(/^\/+|\/+$/g, '');

export const ensureLeadingSlash = (s: string): string => {
  const trimmed = trimSlash(s);
  return trimmed === '' ? '/' : '/' + trimmed;
};

export const ensureTrailingSlash = (s: string): string => {
  if (s.endsWith('/')) {
    return s;
  }
  // Evitar doble slash si la ruta es solo '/'
  return s === '/' ? s : s + '/';
};

// --- LÓGICA DE PERMALINKS ---

/**
 * Devuelve el prefijo de idioma para una ruta.
 * Ejemplo: para 'en', devuelve '/en'. Para 'es' (por defecto), devuelve ''.
 */
const getLangPrefix = (lang: string = defaultLang): string => {
  if (lang === defaultLang && !prefixDefaultLocale) {
    return '';
  }
  return `/${lang}`;
};


export const cleanSlug = (text: string = ''): string =>
  text
    .split('/')
    .map((segment) => slugify(segment))
    .join('/');


// Estos slugs base podrían ser del idioma por defecto o podrías pasarlos traducidos
// si la estructura del blog/categorías cambia radicalmente por idioma.
// Por ahora, los dejamos como slugs base del idioma por defecto.
export const BLOG_BASE_DEFAULT_SLUG = cleanSlug(APP_BLOG?.list?.pathname || 'blog');
export const CATEGORY_BASE_DEFAULT_SLUG = cleanSlug(APP_BLOG?.category?.pathname || 'category');
export const TAG_BASE_DEFAULT_SLUG = cleanSlug(APP_BLOG?.tag?.pathname || 'tag');


/**
 * Genera una ruta relativa al dominio (permalink) para un slug y un idioma.
 * @param slug El slug de la página (ej. 'contacto', 'servicios/terapia'). No debe empezar con '/'.
 * @param lang El código del idioma.
 * @returns Una ruta relativa completa como '/es/contacto/' o '/servicios/'.
 */
export const getPermalink = (slug?: string, lang: string = defaultLang): string => {
  const S = slug ? trimSlash(slug) : '';
  const L = getLangPrefix(lang);

  // Construye la ruta base
  let permalink = `${L}/${S}`;

  // Limpieza de slashes
  permalink = permalink.replace(/\/\//g, '/'); // Reemplaza slashes dobles
  if (permalink.length > 1 && permalink.endsWith('/')) {
    permalink = permalink.slice(0, -1); // Quita el slash final si no es la raíz
  }

  // Añadir slash final si la configuración lo requiere
  if (SITE.trailingSlash) {
    if (permalink.length > 0) { // No añadir a la ruta raíz vacía
      permalink += '/';
    } else {
      return '/'; // Asegurar que la raíz sea siempre '/'
    }
  }

  return permalink === '' ? '/' : `/${permalink.replace(/^\//, '')}`;
};

/**
 * Genera el permalink para la página de inicio de un idioma.
 */
export const getHomePermalink = (lang: string = defaultLang): string => getPermalink(undefined, lang);

/**
 * Obtiene el permalink de la página de listado del blog para un idioma dado.
 * Necesita la función 't' para obtener el slug base del blog traducido.
 */
// export const getBlogPermalink = (t: Function, lang: string = i18nDefaultLang): string => {
//   // Obtiene el slug base del blog (ej. 'blog', 'nieuws') del archivo de traducción
//   const blogRouteSlug = t('routes.blog', {}, { defaultValue: BLOG_BASE_DEFAULT_SLUG });
//   return getPermalink(blogRouteSlug, 'page', lang);
// };

/**
 * Genera una URL de recurso (asset) correcta, respetando SITE.base.
 */
export const getAsset = (path: string): string =>
  '/' +
  [trimSlash(SITE.base || '/'), trimSlash(path)]
    .filter(Boolean)
    .join('/');


/**
 * Genera la URL canónica ABSOLUTA para una página.
 * ESTA ES LA ÚNICA FUNCIÓN QUE DEBERÍA DEVOLVER UNA URL COMPLETA.
 */
export const getCanonical = (permalink: string): string => {
  // permalink debe ser una ruta relativa como '/es/contacto/'
  return new URL(permalink, SITE.site).href;
};
