// src/types.ts
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { HTMLAttributes, HTMLInputTypeAttribute } from 'astro/types';

// --- TIPOS DE CONFIGURACIÓN GLOBAL (para config.ts) ---

/** Representa el objeto de configuración de título en config.ts */
export interface GlobalTitleConfig {
  default: string | ((t: Function) => string);
  template?: string;
}

/** Representa el objeto de configuración global de metadatos en config.ts */
export interface GlobalMetaDataConfig {
  title?: GlobalTitleConfig;
  description?: string | ((t: Function) => string);
  robots?: MetaDataRobots;
  openGraph?: MetaDataOpenGraph;
  twitter?: MetaDataTwitter;
  // Puedes añadir más configuraciones globales aquí
}

// --- METADATA Y SEO ---

/** Representa una imagen para metadatos (Open Graph, Twitter, JSON-LD) */
export interface MetaDataImage {
  url: string | URL;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
  secureUrl?: string;
}

/** Propiedades para Open Graph, alineadas con AstroSeo */
export interface MetaDataOpenGraph {
  url?: string | URL;
  siteName?: string;
  title?: string;
  description?: string;
  images?: Array<MetaDataImage | string | URL>; // Permitimos strings/URL como atajo
  locale?: string;
  type?: 'website' | 'article' | 'book' | 'profile' | string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    expirationTime?: string;
    author?: string | string[];
    section?: string;
    tag?: string[];
  };
}

/** Propiedades para Twitter Cards, alineadas con AstroSeo */
export interface MetaDataTwitter {
  handle?: string;
  site?: string;
  cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

/** Directivas para robots meta tag */
export interface MetaDataRobots {
  index?: boolean;
  follow?: boolean;
  noindex?: boolean;
  nofollow?: boolean;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number;
  noarchive?: boolean;
  unavailable_after?: string;
}

/** Información para un enlace <link rel="alternate" hreflang="..."> */
export interface AlternateLinkInfo {
  hreflang: string; // Código de idioma-región (ej. 'es-ES')
  href: string;     // URL absoluta completa
}

/** Interfaz principal para los metadatos de una página */
export interface MetaData {
  title?: string | ((t: Function) => string);
  description?: string | ((t: Function) => string);
  canonical?: string | URL;
  robots?: MetaDataRobots;
  openGraph?: MetaDataOpenGraph;
  twitter?: MetaDataTwitter;
  alternateLinks?: AlternateLinkInfo[];
  slug?: string;
  lang?: string;

  // Atajos comunes
  ogImage?: string | URL | MetaDataImage | Array<string | URL | MetaDataImage>;
  type?: 'website' | 'article' | string;
  pubDate?: string | Date;
  modDate?: string | Date;
  author?: string;
  keywords?: string[] | string;
  ignoreTitleTemplate?: boolean;
}

// --- CONTENIDO Y ESTRUCTURA DEL SITIO ---
export interface Post { /* ... (sin cambios si ya estaba bien) ... */
  id: string; slug: string; permalink: string; publishDate: Date; updateDate?: Date; title: string;
  excerpt?: string; image?: string | MetaDataImage; category?: string; tags?: Array<string>;
  author?: string; metadata?: MetaData; draft?: boolean; Content?: AstroComponentFactory;
  content?: string; readingTime?: number;
}
export interface Image { src: string; alt?: string; }
export interface Video { src: string; type?: string; }
export interface Link { text?: string; href?: string; ariaLabel?: string; icon?: string; target?: '_self' | '_blank' | '_parent' | '_top'; }
export interface ActionLink extends Link, HTMLAttributes<'a'> { variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | string; }
export interface MenuLink extends Link { links?: Array<MenuLink>; }

// --- WIDGETS Y COMPONENTES DE UI ---
export interface Widget {
  id?: string; isDark?: boolean; bg?: string;
  classes?: Record<string, string>; class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>; /* Cambiado classes a class */
}
export interface Headline { title?: string; subtitle?: string; tagline?: string; classes?: Record<string, string>; class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>; }

export interface Item {
  title?: string; description?: string; icon?: string; href?: string; callToAction?: ActionLink; image?: Image;
  classes?: Record<string, string>; class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>;
}
export interface Price { title?: string; subtitle?: string; description?: string; price?: number | string; period?: string; items?: Array<Item>; callToAction?: ActionLink; hasRibbon?: boolean; ribbonTitle?: string; }
export interface Testimonial { title?: string; testimonial?: string; name?: string; job?: string; image?: Image; }
export interface TeamMember { name?: string; job?: string; image?: Image; socials?: Array<Link>; description?: string; class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>; }
export interface Stat { amount?: number | string; title?: string; icon?: string; }

// Campos de Formulario (sin cambios significativos si ya estaban bien)
export interface Input { type: HTMLInputTypeAttribute; name: string; label?: string; autocomplete?: string; placeholder?: string; value?: string | number; required?: boolean; }
export interface Textarea { name: string; label?: string; placeholder?: string; rows?: number; value?: string; required?: boolean; }
export interface Checkbox { name: string; label?: string; checked?: boolean; required?: boolean; }
export interface RadioOption { label: string; value: string; }
export interface RadioGroup { name: string; label?: string; options: RadioOption[]; value?: string; required?: boolean; }
export interface SelectOption { label: string; value: string; disabled?: boolean; }
export interface Select { name: string; label?: string; options: SelectOption[]; value?: string; required?: boolean; placeholder?: string; }
export interface Disclaimer { label?: string; }
export interface Form { inputs?: Array<Input>; radioGroups?: Array<RadioGroup>; selects?: Array<Select>; checkboxes?: Array<Checkbox>; textarea?: Textarea; disclaimer?: Disclaimer; button?: string; description?: string; }

// Props para componentes de Widgets (sin cambios significativos si ya estaban bien, solo asegurar consistencia con Widget/Headline)
export interface NoteProps extends Widget { title?: string; values?: string | string[]; content?: string; iconName?: string; }
export interface HeroProps extends Headline, Widget { content?: string; image?: Image; actions?: ActionLink[]; isReversed?: boolean; }
export interface FeaturesProps extends Headline, Widget { items: Array<Item>; columns?: number; defaultIcon?: string; image?: Image; video?: Video; isReversed?: boolean; isBeforeContent?: boolean; isAfterContent?: boolean; callToAction?: ActionLink; }
export interface ContentProps extends Headline, Widget {
  [x: string]: string; content?: string; image?: Image; items?: Array<Item>; columns?: number; isReversed?: boolean; isAfterContent?: boolean; callToAction?: ActionLink;
}
export interface StepsProps extends Headline, Widget { items: Array<Item>; image?: Image; callToAction?: ActionLink; isReversed?: boolean; }
export interface PricingProps extends Headline, Widget { prices: Array<Price>; }
export interface TestimonialsProps extends Headline, Widget { testimonials: Array<Testimonial>; callToAction?: ActionLink; }
export interface FaqsProps extends Headline, Widget { items: Array<Item>; columns?: number; iconUp?: string; iconDown?: string; }
export interface CallToActionProps extends Headline, Widget {
  actions?: ActionLink[]; text?: string; href?: string; icon?: string; target?: string; variant?: string; type?: string;
  classes?: Record<string, string>;
}
export interface ContactProps extends Headline, Form, Widget { }
export interface TeamProps extends Headline, Widget { members: Array<TeamMember>; }
export interface StatsProps extends Headline, Widget { stats: Array<Stat>; }
export interface BrandsProps extends Headline, Widget { icons?: Array<string>; images?: Array<Image>; }