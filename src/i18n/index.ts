// src/i18n/index.js

// Configuración de i18n
export const defaultLang = 'en'; // Idioma principal
export const supportedLangs = ['en', 'es', 'nl', 'fr', 'de'];
// 'en' es el idioma por defecto y NO quieres que tenga prefijo (ej. /about)
export const prefixDefaultLocale = false;
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
  return function t(key: string, params: Record<string, any> = {}, options: TranslationOptions = {}) {
    // --- LOGS IMPORTANTES AQUÍ ---
    console.log(`[t() for ${lang}] Key: "${key}", Params: ${JSON.stringify(params)}, Options: ${JSON.stringify(options)}`);

    const keys = key.split('.');
    let current: any = translations;

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        console.warn(`[t() for ${lang}] Key not found: "${key}" (failed at subkey: "${k}")`);
        if (options.defaultValue !== undefined) {
          console.log(`[t() for ${lang}] Returning defaultValue for "${key}":`, options.defaultValue);
          return options.defaultValue;
        }
        console.log(`[t() for ${lang}] Returning placeholder for "${key}": "[${key}]"`);
        return `[${key}]`;
      }
    }

    console.log(`[t() for ${lang}] Key "${key}" resolved to (type ${typeof current}):`, current);

    if (typeof current === 'string') {
      let originalString = current; // Guardar para el log
      let translatedString = current;
      if (Object.keys(params).length > 0) {
        // Log para reemplazo de {placeholder} (si lo usas)
        translatedString = translatedString.replace(/<(\d+)>.*?<\/\1>/g, (match, index) => {
          //                                                ^^^^^^^^^^^  Cambio aquí:
          //                                                .*?        Coincide con cualquier carácter (no codicioso)
          //                                                <\/\1>     Coincide con la etiqueta de cierre (ej. </0>)
          const replacement = params[index] !== undefined ? String(params[index]) : match;
          console.log(`[t() for ${lang}] In "${originalString}", replacing <${index}>...</${index}> ("${match}") with "${replacement}" for key "${key}"`);
          return replacement;
        });
        // Log para reemplazo de <numero>
        translatedString = translatedString.replace(/<(\d+)>/g, (match, index) => {
          const replacement = params[index] !== undefined ? String(params[index]) : match;
          console.log(`[t() for ${lang}] In "${originalString}", replacing <${index}> ("${match}") with "${replacement}" for key "${key}"`);
          return replacement;
        });
      }
      console.log(`[t() for ${lang}] Final string for "${key}": "${translatedString}"`);
      return translatedString;
    }
    else if (typeof current === 'object' || Array.isArray(current)) {
      if (Object.keys(params).length > 0 && options.defaultValue === undefined) {
        console.warn(`[t() for ${lang}] Params passed to key "${key}" which resolved to an object/array. Params are ignored for non-string results when not using defaultValue.`);
      }
      console.log(`[t() for ${lang}] Returning object/array for "${key}"`);
      return current;
    }

    console.warn(`[t() for ${lang}] Key "${key}" does not lead to a string, object, or array. Type: ${typeof current}. Returning placeholder.`);
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