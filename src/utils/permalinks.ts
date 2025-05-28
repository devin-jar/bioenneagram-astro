// src/utils/permalinks.ts
import slugify from 'limax';

import { SITE, APP_BLOG } from '~/utils/config';
import { trim } from '~/utils/utils';

import {
  defaultLang as i18nDefaultLang,
  prefixDefaultLocale as i18nPrefixDefaultLocale,
} from '~/i18n';

// === INICIO DE FUNCIONES AUXILIARES ===
// Estas funciones ahora SÍ se exportan
export const trimSlash = (s: string) => trim(trim(s, '/'));

export const ensureLeadingSlash = (s: string): string => {
  const trimmed = trimSlash(s); // Asegura que no haya slashes al inicio/final antes de añadir
  return trimmed === '' ? '/' : '/' + trimmed; // Si es la raíz, devuelve solo '/', sino añade slash
};

export const ensureTrailingSlash = (s: string): string => {
  if (s.endsWith('/')) {
    return s;
  }
  return s + '/';
};
// === FIN DE FUNCIONES AUXILIARES ===


const getLanguagePrefix = (lang: string): string => {
  // ... (sin cambios)
  if (lang && lang !== i18nDefaultLang) {
    return `/${lang}`;
  }
  if (lang && lang === i18nDefaultLang && i18nPrefixDefaultLocale) {
    return `/${lang}`;
  }
  return '';
};

const createPathWithLang = (lang: string, ...params: string[]): string => {
  const langPrefix = getLanguagePrefix(lang);
  const pathSegments = params
    .map((el) => trimSlash(el)) // Usa trimSlash
    .filter((el) => !!el);

  let path = [langPrefix, ...pathSegments].filter(Boolean).join('/');

  if (pathSegments.length === 0 && langPrefix) {
    path = langPrefix;
  } else if (pathSegments.length === 0 && !langPrefix) {
    path = '';
  }

  const basePath = trimSlash(SITE.base || '/'); // Usa trimSlash
  let finalPath = [basePath, path]
    .map((el) => trimSlash(el)) // Usa trimSlash
    .filter((el) => !!el)
    .join('/');

  if (finalPath === '') {
    finalPath = '/';
  } else {
    finalPath = '/' + finalPath; // Asegura un leading slash aquí
  }

  if (SITE.trailingSlash && path) {
    if (!finalPath.endsWith('/')) {
      finalPath += '/'; // Aquí no usamos ensureTrailingSlash porque ya controlamos la lógica
    }
  } else if (!SITE.trailingSlash && finalPath.length > 1 && finalPath.endsWith('/')) {
    finalPath = finalPath.slice(0, -1);
  }

  return finalPath;
};


const BASE_PATHNAME_FOR_ASSETS = trimSlash(SITE.base || '/'); // Usa trimSlash

export const cleanSlug = (text = ''): string =>
  trimSlash(text) // Usa trimSlash
    .split('/')
    .map((slug) => slugify(slug))
    .join('/');

export const BLOG_BASE_SLUG = cleanSlug(APP_BLOG?.list?.pathname || 'blog');
export const CATEGORY_BASE_SLUG = cleanSlug(APP_BLOG?.category?.pathname || 'category');
export const TAG_BASE_SLUG = cleanSlug(APP_BLOG?.tag?.pathname || 'tag');

export const POST_PERMALINK_PATTERN = trimSlash(APP_BLOG?.post?.permalink || `${BLOG_BASE_SLUG}/%slug%`); // Usa trimSlash

export const getCanonical = (path = '', lang: string = i18nDefaultLang): string => {
  const fullPath = getPermalink(path, 'page', lang);

  let relativePathForCanonical = fullPath;
  const siteBase = trimSlash(SITE.base || '/'); // Usa trimSlash

  if (siteBase && fullPath.startsWith(ensureLeadingSlash(siteBase))) { // Usa ensureLeadingSlash
    relativePathForCanonical = fullPath.substring(siteBase.length + 1);
  } else if (fullPath.startsWith('/')) {
    relativePathForCanonical = fullPath.substring(1);
  }
  if (relativePathForCanonical === '') relativePathForCanonical = '/';
  else relativePathForCanonical = ensureLeadingSlash(relativePathForCanonical); // Usa ensureLeadingSlash


  const url = new URL(relativePathForCanonical, SITE.site).toString();

  return url;
};

export const getPermalink = (slug = '', type = 'page', lang: string = i18nDefaultLang): string => {
  let pathWithoutLang: string;
  const cleanInputSlug = trimSlash(slug); // Usa trimSlash

  switch (type) {
    case 'category':
      pathWithoutLang = [CATEGORY_BASE_SLUG, cleanInputSlug].filter(Boolean).join('/');
      break;

    case 'tag':
      pathWithoutLang = [TAG_BASE_SLUG, cleanInputSlug].filter(Boolean).join('/');
      break;

    case 'post':
      if (POST_PERMALINK_PATTERN.includes('%slug%')) {
        pathWithoutLang = POST_PERMALINK_PATTERN.replace('%slug%', cleanInputSlug);
      } else {
        pathWithoutLang = [BLOG_BASE_SLUG, cleanInputSlug].filter(Boolean).join('/');
      }
      break;

    case 'page':
    default:
      pathWithoutLang = (cleanInputSlug === '' || cleanInputSlug === '/') ? '/' : cleanInputSlug;
      break;
  }

  if (pathWithoutLang === '/') {
    return createPathWithLang(lang, '');
  }
  return createPathWithLang(lang, trimSlash(pathWithoutLang)); // Usa trimSlash
};

export const getHomePermalink = (lang: string = i18nDefaultLang): string => getPermalink('', 'page', lang);

export const getBlogPermalink = (lang: string = i18nDefaultLang): string => {
  return getPermalink(BLOG_BASE_SLUG, 'page', lang);
};

export const getAsset = (path: string): string => {
  const segments = [BASE_PATHNAME_FOR_ASSETS, trimSlash(path)] // Usa trimSlash
    .map((el) => trimSlash(el)) // Usa trimSlash
    .filter((el) => !!el);

  let assetPath = '/' + segments.join('/');

  assetPath = assetPath.replace(/\/\//g, '/');

  return assetPath;
}