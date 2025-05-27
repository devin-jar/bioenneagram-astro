// src/i18n/index.js

// Configuración de i18n (puedes tomarla de astro.config.mjs si la exportas,
// o definirla aquí para mantener este módulo autocontenido)
export const defaultLang = 'es';
export const supportedLangs = ['es', 'en'];
export const prefixDefaultLocale = false; // Importante: debe coincidir con astro.config.mjs

/**
 * Obtiene el código de idioma de la URL.
 * @param {URL} url El objeto URL de Astro.
 * @returns {string} El código de idioma.
 */
export function getLangFromUrl(url) {
  const [, langFromFile] = url.pathname.split('/');
  if (supportedLangs.includes(langFromFile)) {
    return langFromFile;
  }
  return defaultLang;
}

/**
 * Crea una función de traductor (t) para un idioma y un conjunto de traducciones dados.
 * @param {object} translations Objeto con todas las traducciones para un idioma.
 * @param {string} lang Código del idioma actual (para depuración).
 * @returns {function(string, object=): string} Función t(key, params).
 */
export function getTranslator(translations, lang) {
  return function t(key, params = {}) {
    const keys = key.split('.');
    let current = translations;

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        // Fallback: si la clave no se encuentra, devuelve la clave entre corchetes
        // y muestra una advertencia en la consola (útil durante el desarrollo).
        console.warn(`[i18n] Key not found for lang "${lang}": ${key}`);
        return `[${key}]`;
      }
    }

    if (typeof current === 'string') {
      // Reemplazar placeholders como {variable}
      let translatedString = current.replace(/{(\w+)}/g, (match, placeholder) => {
        return params[placeholder] !== undefined ? String(params[placeholder]) : match;
      });
      // Reemplazar placeholders numéricos como <0>, <1> para HTML
      translatedString = translatedString.replace(/<(\d+)>/g, (match, index) => {
        return params[index] !== undefined ? String(params[index]) : match;
      });
      return translatedString;
    }
    // Si la clave lleva a un objeto en lugar de una cadena (error en la clave), devuelve la clave.
    console.warn(`[i18n] Key does not lead to a string for lang "${lang}": ${key}`);
    return `[${key}]`;
  };
}