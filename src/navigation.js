// src/navigation.js
import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const getHeaderData = (t, lang) => {
  return {
    links: [
      {
        text: t('nav.home'),
        href: getPermalink('/', 'page', lang),
      },
      // {
      //   text: t('nav.services'),
      //   href: getPermalink('/services', 'page', lang), // Crea tus slugs en /pages
      // },
      // {
      //   text: t('nav.blog'),
      //   links: [
      //     {
      //       text: t('nav.blogList'),
      //       href: getBlogPermalink(lang), // ej. /blog o /en/blog
      //     },
      //     {
      //       text: t('nav.article'),
      //       // Asume que el slug 'eneagrama-un-viaje-a-tu-mundo-interior' es el mismo en todos los idiomas
      //       // Si los slugs cambian, necesitarás una lógica más compleja o mapeos.
      //       href: getPermalink('eneagrama-un-viaje-a-tu-mundo-interior', 'post', lang),
      //     },
      //   ],
      // },
      // {
      //   text: t('nav.about'),
      //   href: getPermalink('/about', 'page', lang), // ej. /about o /en/about
      // },
      // {
      //   text: t('nav.contact'),
      //   href: getPermalink('/contact', 'page', lang),
      // },
    ],
    actions: [
      {
        text: t('nav.actions.book'),
        href: 'https://booking.bioenneagram.com/book',
        target: '_blank',
      },
    ],
  };
};

export const getFooterData = (t, lang) => {
  return {
    links: [
      {
        title: t('footer.products.title'),
        links: [
          { text: t('footer.products.retreat'), href: getPermalink('/products/retreat', 'page', lang) }, // Ejemplo de slug
          { text: t('footer.products.individualTherapy'), href: getPermalink('/products/individual-therapy', 'page', lang) },
          { text: t('footer.products.couplesTherapy'), href: getPermalink('/products/couples-therapy', 'page', lang) },
          { text: t('footer.products.manifestationWorkshop'), href: getPermalink('/workshops/manifestation', 'page', lang) },
          { text: t('footer.products.emotionsWorkshop'), href: getPermalink('/workshops/emotions', 'page', lang) },
          { text: t('footer.products.brainIntroCourse'), href: getPermalink('/courses/intro-brain', 'page', lang) },
          { text: t('footer.products.enneagramIntroCourse'), href: getPermalink('/courses/intro-enneagram', 'page', lang) },
          { text: t('footer.products.enneagramGameCourse'), href: getPermalink('/landing/course-enneagram-game', 'page', lang) },
          { text: t('footer.products.biodescodificacionIntroCourse'), href: getPermalink('/courses/intro-biodecoding', 'page', lang) },
        ],
      },
      {
        title: t('footer.companies.title'),
        links: [
          { text: t('footer.companies.teamWorkshop'), href: getPermalink('/services/team-workshop', 'page', lang) },
          { text: t('footer.companies.conferences'), href: getPermalink('/services/conferences', 'page', lang) },
          { text: t('footer.companies.consultationPackage'), href: getPermalink('/services/consultation-package', 'page', lang) },
        ],
      },
      {
        title: t('footer.support.title'),
        links: [
          { text: t('footer.support.aboutUs'), href: getPermalink('/about', 'page', lang) },
          { text: t('footer.support.blog'), href: getBlogPermalink(lang) }, // /blog o /en/blog
          { text: t('footer.support.professionalServices'), href: getPermalink('/services', 'page', lang) }, // Página general de servicios
          { text: t('footer.support.socialImpact'), href: getPermalink('/social-impact', 'page', lang) },
          { text: t('footer.support.store'), href: 'https://shop.bioenneagram.com/', target: '_blank' },
          { text: t('footer.support.location'), target: '_blank', href: 'https://goo.gl/maps/Zw139zUs4rSwnGUQ7' },
        ],
      },
    ],
    secondaryLinks: [
      { text: t('footer.secondaryLinks.terms'), href: getPermalink('/terms', 'page', lang) },
      { text: t('footer.secondaryLinks.privacy'), href: getPermalink('/privacy', 'page', lang) },
    ],
    socialLinks: [ // ariaLabel podría ser traducido si creas claves para ellos
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
        ariaLabel: 'Whatsapp', // Podrías tener 'nav.whatsappAriaLabel' si necesitas traducirlo
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
      // { ariaLabel: 'RSS', target: '_blank', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    ],
    footNote: `
      <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-logo"></span>
      ${t('footer.footNote.developedBy')} <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://bioenneagram.com/"> Bioenneagram</a> · © ${new Date().getFullYear()} ${t('footer.footNote.rightsReserved')}
    `,
  };
};