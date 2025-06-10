// src/utils/permalinks.ts
import slugify from 'limax'; // Asumo que la sigues usando para cleanSlug

import { SITE, APP_BLOG } from '~/utils/config'; // Tus configuraciones
import { trim } from '~/utils/utils'; // Tu utilidad trim

import {
  defaultLang as i18nDefaultLang,
  prefixDefaultLocale as i18nPrefixDefaultLocale,
} from '~/i18n'; // Configuración i18n

// --- FUNCIONES AUXILIARES (exportadas si las necesitas en otros sitios) ---
export const trimSlash = (s: string): string => trim(trim(s, '/'));

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

const getLanguagePrefix = (lang: string): string => {
  if (lang && lang !== i18nDefaultLang) {
    return `/${lang}`;
  }
  if (lang && lang === i18nDefaultLang && i18nPrefixDefaultLocale) {
    return `/${lang}`;
  }
  return '';
};

/**
 * Construye la ruta final incluyendo SITE.base, prefijo de idioma y trailingSlash.
 */
const createPathWithLang = (lang: string, relativePath: string): string => {
  const langPrefix = getLanguagePrefix(lang);
  const siteBase = trimSlash(SITE.base || '/');

  // Normalizar relativePath para evitar problemas con slashes
  let cleanRelativePath = trimSlash(relativePath);
  if (cleanRelativePath === '') cleanRelativePath = '/'; // Raíz

  // Construir la ruta con prefijo de idioma
  let pathWithLang = langPrefix;
  if (cleanRelativePath !== '/') {
    pathWithLang = `${langPrefix}/${cleanRelativePath}`;
  } else if (langPrefix === '') { // Raíz del idioma por defecto
    pathWithLang = '/';
  }
  // Si langPrefix no es vacío y cleanRelativePath es '/', pathWithLang ya es correcto (ej. /es)

  // Combinar con SITE.base
  let finalPath = siteBase;
  if (pathWithLang !== '/') { // Evitar /base//slug si base es /
    finalPath = `${siteBase}${ensureLeadingSlash(pathWithLang)}`;
  } else if (siteBase === '') { // Si no hay base y es la raíz
    finalPath = '/';
  }
  // Limpiar slashes dobles que puedan surgir de la concatenación
  finalPath = finalPath.replace(/\/\//g, '/');
  if (finalPath !== '/' && finalPath.endsWith('/')) { // Quitar trailing slash si no es la raíz y no se quiere
    if (!SITE.trailingSlash) {
      finalPath = finalPath.slice(0, -1);
    }
  } else if (SITE.trailingSlash && finalPath !== '/') { // Añadir trailing slash si se quiere y no es la raíz
    finalPath += '/';
  }


  return finalPath === '' ? '/' : finalPath; // Asegurar que la raíz siempre sea al menos '/'
};


export const cleanSlug = (text = ''): string =>
  trimSlash(text)
    .split('/')
    .map((slug) => slugify(slug))
    .join('/');

// Estos slugs base podrían ser del idioma por defecto o podrías pasarlos traducidos
// si la estructura del blog/categorías cambia radicalmente por idioma.
// Por ahora, los dejamos como slugs base del idioma por defecto.
export const BLOG_BASE_DEFAULT_SLUG = cleanSlug(APP_BLOG?.list?.pathname || 'blog');
export const CATEGORY_BASE_DEFAULT_SLUG = cleanSlug(APP_BLOG?.category?.pathname || 'category');
export const TAG_BASE_DEFAULT_SLUG = cleanSlug(APP_BLOG?.tag?.pathname || 'tag');


/**
 * Genera un permalink.
 * @param slug EL SLUG BASE YA TRADUCIDO (ej. 'nosotros', 'landing/curso-juego', 'blog/mi-articulo').
 *             Para la página de inicio, pasar '/' o una cadena vacía.
 * @param type NO SE USA MUCHO AHORA si el slug es la ruta completa. Principalmente para 'page' o 'post' si hay lógica especial.
 * @param lang El código del idioma actual.
 * @returns El permalink completo.
 */
export const getPermalink = (slug = '', type = 'page', lang: string = i18nDefaultLang): string => {
  // El 'slug' que llega aquí ya debería ser el slug localizado deseado,
  // obtenido de t('routes.myKey') en navigation.js.
  // Ej: 'nosotros', 'landing/curso-eneagrama-game', 'blog/mi-post-traducido'

  // El tipo 'post', 'category', 'tag' podría usarse si necesitas anteponer
  // un slug base de blog/categoría/tag que también se traduce, pero es más simple
  // si la clave 'routes.myPost' ya incluye 'blog-traducido/mi-post-traducido'.

  const finalSlug = (slug === '' || slug === '/') ? '/' : trimSlash(slug);
  return createPathWithLang(lang, finalSlug);
};

export const getHomePermalink = (lang: string = i18nDefaultLang): string => {
  // La clave 'routes.home' en el JSON debería ser "/"
  // No es necesario llamar a t() aquí, se hace en navigation.js
  return getPermalink('/', 'page', lang);
};

/**
 * Obtiene el permalink de la página de listado del blog para un idioma dado.
 * Necesita la función 't' para obtener el slug base del blog traducido.
 */
export const getBlogPermalink = (t: Function, lang: string = i18nDefaultLang): string => {
  // Obtiene el slug base del blog (ej. 'blog', 'nieuws') del archivo de traducción
  const blogRouteSlug = t('routes.blog', {}, { defaultValue: BLOG_BASE_DEFAULT_SLUG });
  return getPermalink(blogRouteSlug, 'page', lang);
};

export const getAsset = (path: string): string => {
  const basePathForAssets = trimSlash(SITE.base || '/');
  const cleanPath = trimSlash(path);
  // Asegurar que no haya doble slash si basePath es '/' y path también empieza con '/'
  let assetPath = `${basePathForAssets}/${cleanPath}`.replace(/\/\//g, '/');
  if (!assetPath.startsWith('/')) {
    assetPath = '/' + assetPath;
  }
  return assetPath;
};


export const getCanonical = (path = '', lang: string = i18nDefaultLang): string => {
  // El 'path' aquí debería ser la ruta CANÓNICA sin prefijo de idioma ni SITE.base,
  // usualmente la del idioma por defecto.
  // O, si se llama desde una página ya localizada, 'path' podría ser el slug localizado
  // y 'lang' el idioma actual. `getPermalink` se encargará.

  const permalink = getPermalink(path, 'page', lang); // Genera la URL completa con prefijo y base

  // Construir la URL canónica absoluta
  // SITE.site debe ser la URL base del dominio, ej https://www.example.com
  // permalink ya incluye el SITE.base y el prefijo de idioma si aplica.
  // Necesitamos asegurar que no duplicamos SITE.base si ya está en permalink.

  let urlPath = permalink;
  const siteBase = trimSlash(SITE.base || '/');

  // Si permalink ya incluye el siteBase (ej. permalink es /sub/es/pagina y siteBase es /sub)
  // necesitamos quitarlo para que URL constructor no lo duplique.
  // Pero createPathWithLang ya maneja SITE.base, así que permalink es la ruta completa después del dominio.
  // Ej: si SITE.site = "https://dominio.com" y permalink = "/es/pagina" -> "https://dominio.com/es/pagina"
  // Ej: si SITE.site = "https://dominio.com/sub" y permalink = "/sub/es/pagina" (createPathWithLang ya añadió /sub)
  //     entonces debemos pasar a new URL solo "/es/pagina" si SITE.site ya tiene /sub
  // La implementación actual de createPathWithLang ya incluye SITE.base,
  // por lo que permalink es la ruta completa después del nombre de host.

  // La forma más simple es si SITE.url es solo el dominio (https://example.com)
  // y permalink es la ruta completa (/es/about)
  return new URL(permalink, SITE.site).toString();
};