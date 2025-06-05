// src/types.ts
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { HTMLAttributes, HTMLInputTypeAttribute } from 'astro/types'; // Añadido HTMLInputTypeAttribute

export interface Post {
  id: string;
  slug: string;
  permalink: string;
  publishDate: Date;
  updateDate?: Date;
  title: string;
  excerpt?: string;
  image?: string; // Podría ser MetaDataImage si quieres más estructura
  category?: string;
  tags?: Array<string>;
  author?: string;
  metadata?: MetaData; // Usa la MetaData actualizada abajo
  draft?: boolean;
  Content?: AstroComponentFactory;
  content?: string;
  readingTime?: number;
}

// --- INTERFACES DE METADATOS ACTUALIZADAS ---
export interface MetaDataImage {
  url: string; // URL absoluta o relativa a assets que se resolverá
  width?: number;
  height?: number;
  alt?: string; // Añadido alt para imágenes OG y Twitter
}

export interface MetaDataOpenGraph {
  url?: string | URL; // URL canónica de la página
  site_name?: string; // Nombre del sitio
  title?: string; // Título específico para OG (suele ser el mismo que el de la página)
  description?: string; // Descripción específica para OG
  images?: Array<MetaDataImage>; // Array de imágenes OG
  locale?: string; // ej. 'en_US', 'es_ES'
  type?: 'website' | 'article' | 'book' | 'profile' | string; // Tipos comunes
  article?: { // Específico si type es 'article'
    published_time?: string; // ISO 8601 date
    modified_time?: string;  // ISO 8601 date
    expiration_time?: string; // ISO 8601 date
    author?: string | string[]; // URL(s) a perfiles de autor o nombres
    section?: string; // Categoría del artículo
    tag?: string[]; // Tags del artículo
  };
}

export interface MetaDataTwitter {
  handle?: string; // @username del creador/sitio
  site?: string; // @username del sitio (a veces el mismo que handle)
  cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  title?: string; // Título para la tarjeta de Twitter
  description?: string; // Descripción para la tarjeta de Twitter
  image?: string; // URL de la imagen para la tarjeta (debe ser absoluta)
  imageAlt?: string; // Alt text para la imagen de la tarjeta
}

export interface MetaDataRobots {
  index?: boolean;
  follow?: boolean;
  noindex?: boolean; // Propiedad explícita para AstroSeo
  nofollow?: boolean; // Propiedad explícita para AstroSeo
  maxSnippet?: number; // Google-specific
  maxImagePreview?: 'none' | 'standard' | 'large'; // Google-specific
  maxVideoPreview?: number; // Google-specific
}

export interface AlternateLinkInfo {
  lang: string;
  href: string; // URL absoluta completa de la versión en ese idioma
}

export interface MetaData {
  title?: string | ((t: Function) => string);
  description?: string | ((t: Function) => string);
  canonical?: string | URL;
  robots?: MetaDataRobots; // Asumo que MetaDataRobots está definido como antes
  openGraph?: MetaDataOpenGraph; // Asumo que MetaDataOpenGraph está definido como antes
  twitter?: MetaDataTwitter; // Asumo que MetaDataTwitter está definido como antes

  // Propiedades para hreflang y lógica de artículo/página
  alternateLinks?: AlternateLinkInfo[]; // <--- AÑADIDO/ASEGURADO
  type?: 'website' | 'article' | string;
  image?: string | URL | MetaDataImage; // Asumo que MetaDataImage está definido
  pubDate?: string | Date;
  modDate?: string | Date;
  updatedDate?: string | Date;
  author?: string;
  keywords?: string[] | string;
  layout?: string;
  ignoreTitleTemplate?: boolean;
  slug?: string; // Opcional: slug base de la página si es útil (generalmente manejado por Astro)
}
// --- FIN DE INTERFACES DE METADATOS ACTUALIZADAS ---


export interface Image {
  src: string;
  alt?: string;
}

// ... (resto de tus tipos: Video, Widget, Headline, TeamMember, Social, Stat, Item, Price, Testimonial, etc. se mantienen igual)
export interface Video {
  src: string;
  type?: string;
}

export interface Widget {
  id?: string;
  isDark?: boolean;
  bg?: string;
  classes?: Record<string, string>;
}

export interface Headline {
  title?: string;
  subtitle?: string;
  tagline?: string;
  classes?: Record<string, string>;
}

interface TeamMember {
  name?: string;
  job?: string;
  image?: Image;
  socials?: Array<Social>;
  description?: string;
  classes?: Record<string, string>;
}

interface Social {
  icon?: string;
  href?: string;
}

export interface Stat {
  amount?: number | string; // Permitir string para casos como '80k'
  title?: string;
  icon?: string;
}

export interface Item {
  title?: string;
  description?: string;
  icon?: string;
  classes?: Record<string, string>;
  callToAction?: CallToAction; // Reutiliza CallToAction
  image?: Image; // Reutiliza Image
  href?: string; // Añadido si el item es un enlace en sí mismo (ej. en Steps2)
}

export interface Price {
  title?: string;
  subtitle?: string;
  description?: string;
  price?: number | string; // Permitir string para casos como '80k'
  period?: string;
  items?: Array<Item>; // Lista de características incluidas
  callToAction?: CallToAction;
  hasRibbon?: boolean;
  ribbonTitle?: string;
}

export interface Testimonial {
  title?: string; // Opcional, si el testimonio tiene un título
  testimonial?: string;
  name?: string;
  job?: string;
  image?: string | Image | unknown; // Permite objeto Image o string URL
}

export interface Input {
  type: HTMLInputTypeAttribute; // Usar el tipo de Astro
  name: string;
  label?: string;
  autocomplete?: string;
  placeholder?: string;
}

export interface Textarea {
  name: string; // Añadir 'name' para que sea un campo de formulario válido
  label?: string;
  placeholder?: string;
  rows?: number;
}

export interface Disclaimer {
  label?: string;
}

// COMPONENTS
export interface CallToAction extends HTMLAttributes<'a'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  text?: string;
  icon?: string;
  classes?: Record<string, string>;
  // href y target ya están en HTMLAttributes<'a'>
}

export interface ItemGrid {
  items?: Array<Item>;
  columns?: number;
  defaultIcon?: string;
  classes?: Record<string, string>;
}

export interface Collapse {
  iconUp?: string;
  iconDown?: string;
  items?: Array<Item>;
  columns?: number;
  classes?: Record<string, string>;
}

export interface Form {
  inputs?: Array<Input>;
  textarea?: Textarea;
  disclaimer?: Disclaimer;
  button?: string; // Texto del botón
  description?: string;
}

// WIDGETS
export interface Hero extends Headline, Widget {
  content?: string;
  image?: string | Image | unknown; // Permitir objeto Image
  actions?: CallToAction[]; // Permitir múltiples acciones
  // callToAction1?: CallToAction; // Considera usar un array 'actions' en su lugar
  // callToAction2?: CallToAction;
  isReversed?: boolean;
}

export interface Team extends Headline, Widget {
  team?: Array<TeamMember>;
}

export interface Stats extends Headline, Widget {
  stats?: Array<Stat>;
}

export interface Pricing extends Headline, Widget {
  prices?: Array<Price>;
}

export interface Testimonials extends Headline, Widget {
  testimonials?: Array<Testimonial>;
  callToAction?: CallToAction;
}

export interface Brands extends Headline, Widget {
  icons?: Array<string>;
  images?: Array<Image>;
}

export interface Features extends Headline, Widget {
  image?: string | Image | unknown;
  video?: Video;
  items: Array<Item>; // Asumimos que siempre habrá items
  columns?: number; // 'columns' ya estaba, pero era inconsistente con el uso
  defaultIcon?: string;
  callToAction1?: CallToAction;
  callToAction2?: CallToAction;
  isReversed?: boolean;
  isBeforeContent?: boolean;
  isAfterContent?: boolean;
}

export interface Faqs extends Headline, Widget {
  iconUp?: string;
  iconDown?: string;
  items?: Array<Item>;
  columns?: number;
}

export interface Steps extends Headline, Widget {
  items: Array<Item>; // Reutilizar Item, asegurándose que Item tenga 'href'
  callToAction?: CallToAction; // Reutilizar CallToAction
  image?: string | Image;
  isReversed?: boolean;
}

export interface Content extends Headline, Widget {
  content?: string;
  image?: string | Image | unknown;
  items?: Array<Item>;
  columns?: number;
  isReversed?: boolean;
  isAfterContent?: boolean;
  callToAction?: CallToAction;
}

export interface Contact extends Headline, Form, Widget { }