// src/pages/robots.txt.js
import { SITE } from '~/utils/config.ts';

const sitemapUrl = new URL('sitemap-index.xml', SITE.site).href;

const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`.trim();

export async function GET() {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}