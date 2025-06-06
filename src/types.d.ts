// src/types.ts
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { HTMLAttributes, HTMLInputTypeAttribute } from 'astro/types';

// --- METADATA Y SEO ---

/** Representa una imagen para metadatos (Open Graph, Twitter, JSON-LD) */
export interface MetaDataImage {
  url: string;        // URL absoluta o relativa que se resolverá
  width?: number;
  height?: number;
  alt?: string;        // Texto alternativo (traducido)
  type?: string;       // ej. 'image/jpeg' (para OG)
  secureUrl?: string; // URL segura (para OG)
}

/** Propiedades para Open Graph, alineadas con lo que AstroSeo podría esperar */
export interface MetaDataOpenGraph {
  url?: string | URL;         // URL canónica de la página
  siteName?: string;        // Nombre del sitio (AstroSeo usa siteName)
  title?: string;             // Título específico para OG
  description?: string;       // Descripción específica para OG
  images?: Array<MetaDataImage>; // Array de imágenes OG
  locale?: string;            // ej. 'en_US', 'es_ES'
  type?: 'website' | 'article' | 'book' | 'profile' | string;
  article?: {
    publishedTime?: string; // ISO 8601 (AstroSeo usa publishedTime)
    modifiedTime?: string;  // ISO 8601 (AstroSeo usa modifiedTime)
    expirationTime?: string;// ISO 8601
    author?: string | string[]; // URLs a perfiles o nombres
    section?: string;          // Categoría
    tag?: string[];            // Tags
  };
  // Agrega otras propiedades OG que necesites (ej. video, audio)
}

/** Propiedades para Twitter Cards, alineadas con AstroSeo */
export interface MetaDataTwitter {
  handle?: string;    // @username del creador/sitio (AstroSeo usa esto como 'creator' o 'site' a veces)
  site?: string;      // @username del sitio
  cardType?: 'summary' | 'summary_large_image' | 'app' | 'player'; // AstroSeo usa 'card'
  title?: string;       // Título específico (opcional, hereda del principal)
  description?: string; // Descripción específica (opcional, hereda)
  image?: string;       // URL de imagen (AstroSeo espera URL absoluta)
  imageAlt?: string;    // Alt text para la imagen
  // Agrega otras propiedades de Twitter que necesites
}

/** Directivas para robots meta tag */
export interface MetaDataRobots {
  index?: boolean;
  follow?: boolean;
  noindex?: boolean;   // Preferido por AstroSeo sobre !index
  nofollow?: boolean;  // Preferido por AstroSeo sobre !follow
  maxSnippet?: number; // 'max-snippet'
  maxImagePreview?: 'none' | 'standard' | 'large'; // 'max-image-preview'
  maxVideoPreview?: number; // 'max-video-preview'
  noarchive?: boolean;
  unavailable_after?: string; // Formato RFC 850 o ISO 8601
  // Añade otras directivas según sea necesario
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
  robots?: MetaDataRobots;         // Usa la interfaz MetaDataRobots definida arriba
  openGraph?: MetaDataOpenGraph;   // Usa la interfaz MetaDataOpenGraph
  twitter?: MetaDataTwitter;       // Usa la interfaz MetaDataTwitter
  alternateLinks?: AlternateLinkInfo[]; // Para hreflang

  slug?: string; // Slug base de la página (sin idioma), útil para hreflang fallbacks

  // Atajos comunes o propiedades adicionales
  ogImage?: string | URL | MetaDataImage; // Imagen principal para OG (puede ser un atajo)
  type?: 'website' | 'article' | string;  // Tipo de página (puede influir en OG y JSON-LD)
  pubDate?: string | Date;                // Fecha de publicación (para artículos)
  modDate?: string | Date;                // Fecha de modificación (para artículos)
  author?: string;                        // Autor (para artículos)
  keywords?: string[] | string;
  ignoreTitleTemplate?: boolean;          // Para anular plantillas de título globales
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
export interface Widget { id?: string; isDark?: boolean; bg?: string; class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>; /* Cambiado classes a class */ }
export interface Headline { title?: string; subtitle?: string; tagline?: string; class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>; }

export interface Item { title?: string; description?: string; icon?: string; href?: string; callToAction?: ActionLink; image?: Image; class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>; }
export interface Price { title?: string; subtitle?: string; description?: string; price?: number | string; period?: string; items?: Array<Item>; callToAction?: ActionLink; hasRibbon?: boolean; ribbonTitle?: string; }
export interface Testimonial { testimonial?: string; name?: string; job?: string; image?: Image; }
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
export interface CallToActionProps extends Headline, Widget { actions?: ActionLink[]; text?: string; href?: string; icon?: string; target?: string; variant?: string; }
export interface ContactProps extends Headline, Form, Widget { }
export interface TeamProps extends Headline, Widget { members: Array<TeamMember>; }
export interface StatsProps extends Headline, Widget { stats: Array<Stat>; }
export interface BrandsProps extends Headline, Widget { images?: Array<Image>; }