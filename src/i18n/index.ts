// src/i18n/index.js

// Configuración de i18n
export const defaultLang = 'en'; // Idioma principal
export const supportedLangs = ['en', 'es', 'nl', 'fr', 'de'];
// 'en' es el idioma por defecto y NO quieres que tenga prefijo (ej. /about)
export const prefixDefaultLocale = true;
// Asegúrate que esto coincida con tu astro.config.mjs

/**
 * Obtiene el código de idioma de la URL. (Esta función puede ser menos necesaria si Astro.currentLocale siempre está disponible y es confiable)
 * @param {URL} url El objeto URL de Astro.
 * @returns {string} El código de idioma.
 */
export function getLangFromUrl(url) {
  const pathParts = url.pathname.split('/');
  const langCandidate = pathParts[1];

  if (supportedLangs.includes(langCandidate)) {
    return langCandidate;
  }
  return defaultLang;
}

// Definir una interfaz para las opciones de la función t
interface TranslationOptions {
  defaultValue?: any; // O un tipo más específico si defaultValue siempre es string o array, etc.
  // puedes añadir más opciones aquí en el futuro si es necesario
}

/**
 * Crea una función de traductor (t) para un idioma y un conjunto de traducciones dados.
 * @param {object} translations Objeto con todas las traducciones para un idioma.
 * @param {string} lang Código del idioma actual (para depuración).
 * @returns {function(string, object=, TranslationOptions=): (string|object|array)} Función t(key, params, options).
 */
export function getTranslator(translations, lang) {
  // Usar la interfaz para el tipo de options
  return function t(key: string, params: Record<string, any> = {}, options: TranslationOptions = {}) { // <--- CAMBIO AQUÍ
    const keys = key.split('.');
    let current: any = translations; // Usar 'any' o un tipo más específico para 'current'

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        console.warn(`[i18n] Key not found for lang "${lang}": ${key}`);
        if (options.defaultValue !== undefined) {
          return options.defaultValue;
        }
        return `[${key}]`;
      }
    }

    if (typeof current === 'string') {
      let translatedString = current;
      if (Object.keys(params).length > 0) {
        translatedString = translatedString.replace(/{(\w+)}/g, (match, placeholder) => {
          return params[placeholder] !== undefined ? String(params[placeholder]) : match;
        });
        translatedString = translatedString.replace(/<(\d+)>/g, (match, index) => {
          return params[index] !== undefined ? String(params[index]) : match;
        });
      }
      return translatedString;
    }
    else if (typeof current === 'object' || Array.isArray(current)) {
      if (Object.keys(params).length > 0 && options.defaultValue === undefined) {
        console.warn(`[i18n] Params passed to key "${key}" which resolved to an object/array for lang "${lang}". Params are ignored for non-string results when not using defaultValue.`);
      }
      return current;
    }

    console.warn(`[i18n] Key does not lead to a string, object, or array for lang "${lang}": ${key}. Type: ${typeof current}`);
    if (options.defaultValue !== undefined) {
      return options.defaultValue;
    }
    return `[${key}]`;
  };
}

// ... (resto del archivo: importaciones de JSON, translationsDataMap, getTranslationsForLocale) ...
// Importaciones estáticas de archivos JSON
import enTranslations from './locales/en/translation.json';
import esTranslations from './locales/es/translation.json';
import nlTranslations from './locales/nl/translation.json';
import frTranslations from './locales/fr/translation.json';
import deTranslations from './locales/de/translation.json';

// Mapeo de idiomas a sus objetos de traducción importados
const translationsDataMap = {
  en: enTranslations,
  es: esTranslations,
  nl: nlTranslations,
  fr: frTranslations,
  de: deTranslations,
};

/**
 * Obtiene el objeto de traducciones completo para un locale dado.
 * Si el locale no tiene traducciones, recurre al defaultLang.
 * @param {string} locale El código del idioma.
 * @returns {object} El objeto de traducciones.
 */
export function getTranslationsForLocale(locale: string): object { // Especificar tipo de retorno
  return translationsDataMap[locale] || translationsDataMap[defaultLang] || {};
}