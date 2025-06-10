import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig, squooshImageService } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin } from './src/utils/frontmatter.mjs';
import { ANALYTICS, SITE } from './src/utils/config.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const whenExternalScripts = (items = []) =>
  ANALYTICS.vendors.googleAnalytics.id && ANALYTICS.vendors.googleAnalytics.partytown
    ? Array.isArray(items)
      ? items.map((item) => item())
      : [items()]
    : [];

export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  trailingSlash: (SITE.trailingSlash ? 'always' : 'never') || 'always',

  output: 'static',

  i18n: {
    defaultLocale: 'es',
    locales: ['en', 'es', 'nl', 'fr', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      // Configuración de i18n para el sitemap
      i18n: {
        defaultLocale: 'es',
        locales: {
          en: 'en-US',
          es: 'es-ES',
          de: 'de-DE',
          nl: 'nl-NL',
          fr: 'fr-FR',
        },
      },
      // --- FILTRO ACTUALIZADO Y SIMPLIFICADO ---
      filter: (page) => {
        const pathname = new URL(page).pathname;

        // Lista de slugs base permitidos (sin prefijos de idioma ni slashes)
        const allowedSlugs = new Set([
          '', // Para todas las páginas de inicio (/, /en/, /fr/, etc.)
          // Slugs de la Landing Page en todos los idiomas
          'landing/curso-eneagrama-game',
          'landing/course-enneagram-game',
          'page-daccueil/cours-jeu-enneagramme',
          'bestemmingspagina/enneagram-cursus-spel',
          'startseite/enneagramm-kurs-spiel',
          // Slugs de Términos y Condiciones en todos los idiomas
          'terminos',
          'terms',
          'conditions-generales',
          'voorwaarden',
          'geschaeftsbedingungen',
          // Slugs de Política de Privacidad (ejemplo adicional si lo necesitas)
          // 'privacidad',
          // 'privacy',
          // 'confidentialite',
          // 'privacybeleid',
          // 'datenschutz',
        ]);

        // 1. Quitar prefijo de idioma: /es/terminos/ -> /terminos/
        const pathWithoutLang = pathname.replace(/^\/(en|es|de|fr|nl)/, '');
        // 2. Quitar slashes de los extremos: /terminos/ -> terminos
        const cleanSlug = pathWithoutLang.replace(/^\/|\/$/g, '');

        // 3. Comprobar si el slug limpio está en el Set de permitidos
        return allowedSlugs.has(cleanSlug);
      },
    }),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),
  ],

  image: {},

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});