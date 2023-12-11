import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Inicio',
      href: getPermalink('/'),
    },
    // {
    //   text: 'Servicios',
    //   href: getPermalink('/services'),
    // },
    // {
    //   text: 'Blog',
    //   links: [
    //     {
    //       text: 'Blog List',
    //       href: getBlogPermalink(),
    //     },
    //     {
    //       text: 'Article',
    //       href: getPermalink('eneagrama-un-viaje-a-tu-mundo-interior', 'post'),
    //     },
    //     {
    //       text: 'Article (with MDX)',
    //       href: getPermalink('markdown-elements-demo-post', 'post'),
    //     },
    //     {
    //       text: 'Category Page',
    //       href: getPermalink('tutorials', 'category'),
    //     },
    //     {
    //       text: 'Tag Page',
    //       href: getPermalink('bioenneagram', 'tag'),
    //     },
    //   ],
    // },
    // {
    //   text: 'Nosotros',
    //   href: getPermalink('/about'),
    // },
    // {
    //   text: 'Contactanos',
    //   href: getPermalink('/contact'),
    // },
    // {
    //   text: 'Home',
    //   links: [
    //     // {
    //     //   text: 'SaaS',
    //     //   href: getPermalink('/homes/saas'),
    //     // },
    //     {
    //       text: 'Bioenneagram',
    //       href: getPermalink('/homes/bioenneagram'),
    //     },
    //     // {
    //     //   text: 'Startup',
    //     //   href: getPermalink('/homes/startup'),
    //     // },
    //     // {
    //     //   text: 'Mobile App',
    //     //   href: getPermalink('/homes/mobile-app'),
    //     // },
    //     // {
    //     //   text: 'Personal',
    //     //   href: getPermalink('/homes/personal'),
    //     // },
    //   ],
    // },
    // {
    //   text: 'Pages',
    //   links: [
    //     {
    //       text: 'Features (Anchor Link)',
    //       href: getPermalink('/#features'),
    //     },
    //     {
    //       text: 'Services',
    //       href: getPermalink('/services'),
    //     },
    //     {
    //       text: 'Pricing',
    //       href: getPermalink('/pricing'),
    //     },
    //     {
    //       text: 'About us',
    //       href: getPermalink('/about'),
    //     },
    //     {
    //       text: 'Contact',
    //       href: getPermalink('/contact'),
    //     },
    //     {
    //       text: 'Terms',
    //       href: getPermalink('/terms'),
    //     },
    //     {
    //       text: 'Privacy policy',
    //       href: getPermalink('/privacy'),
    //     },
    //   ],
    // },
    // {
    //   text: 'Landing',
    //   links: [
    //     {
    //       text: 'Lead Generation',
    //       href: getPermalink('/landing/lead-generation'),
    //     },
    //     {
    //       text: 'Long-form Sales',
    //       href: getPermalink('/landing/sales'),
    //     },
    //     {
    //       text: 'Click-Through',
    //       href: getPermalink('/landing/click-through'),
    //     },
    //     {
    //       text: 'Product Details (or Services)',
    //       href: getPermalink('/landing/product'),
    //     },
    //     {
    //       text: 'Coming Soon or Pre-Launch',
    //       href: getPermalink('/landing/pre-launch'),
    //     },
    //     {
    //       text: 'Subscription',
    //       href: getPermalink('/landing/subscription'),
    //     },
    //   ],
    // },
    // {
    //   text: 'Widgets',
    //   href: '#',
    // },
  ],
  actions: [
    {
      text: 'Reserva',
      href: 'https://api.whatsapp.com/send/?phone=573004481819&text=Hola%2C+me+gustar%C3%ADa+agendar+un+espacio+contigo&type=phone_number&app_absent=0',
      target: '_blank',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Productos',
      links: [
        { text: 'Retiro', href: getPermalink('/building') },
        { text: 'Terapia individual', href: getPermalink('/building') },
        { text: 'Terapia para parejas', href: getPermalink('/building') },
        { text: 'Taller de manifestaciones', href: getPermalink('/building') },
        { text: 'Taller de emociones', href: getPermalink('/building') },
        { text: 'Curso de introducción al cerebro', href: getPermalink('/building') },
        { text: 'Curso de introducción al eneagrama', href: getPermalink('/building') },
        { text: 'Curso de eneagrama game', href: getPermalink('/building') },
        { text: 'Curso de introducción a la biodescodificación', href: getPermalink('/building') },
      ],
    },
    {
      title: 'Empresas',
      links: [
        { text: 'Taller de equipos', href: getPermalink('/building') },
        { text: 'Conferencias', href: getPermalink('/building') },
        { text: 'Paquete de consultas', href: getPermalink('/building') },
      ],
    },
    {
      title: 'Soporte',
      links: [
        // { text: 'Contactanos', href: '/contact' },
        { text: 'Nosotros', href: getPermalink('/building') },
        { text: 'Blog', href: getPermalink('/building') },
        { text: 'Servicios Profesionales', href: getPermalink('/building') },
        { text: 'Impacto Social', href: getPermalink('/building') },
        { text: 'Tienda', href: getPermalink('/building') },
        { text: 'Ubicación', target: '_blank', href: 'https://goo.gl/maps/Zw139zUs4rSwnGUQ7' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terminos y Condiciones', href: getPermalink('/terms') },
    { text: 'Politicas de Privacidad', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', target: '_blank', icon: 'tabler:brand-x', href: 'https://twitter.com/bioenneagram' },
    {
      ariaLabel: 'Instagram',
      target: '_blank',
      icon: 'tabler:brand-instagram',
      href: 'https://www.instagram.com/bioenneagramcoach/',
    },
    {
      ariaLabel: 'Facebook',
      target: '_blank',
      icon: 'tabler:brand-facebook',
      href: 'https://www.facebook.com/bioenneagram',
    },
    {
      ariaLabel: 'Whatsapp',
      target: '_blank',
      icon: 'tabler:brand-whatsapp',
      href: 'https://api.whatsapp.com/send/?phone=573004481819&text=Hola%2C+me+gustar%C3%ADa+agendar+un+espacio+contigo&type=phone_number&app_absent=0',
    },
    {
      ariaLabel: 'Spotify',
      target: '_blank',
      icon: 'tabler:brand-spotify',
      href: 'https://open.spotify.com/show/4eW2cf7WMf8OrV19Ouyojm',
    },
    { ariaLabel: 'RSS', target: '_blank', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-logo"></span>
    Desarrollado por <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://bioenneagram.com/"> Bioenneagram</a> · © 2023 Todos los derechos reservados.
  `,
};
