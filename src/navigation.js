// src/navigation.js
import { getPermalink, getBlogPermalink, getAsset, getHomePermalink } from '~/utils/permalinks'; // Asegúrate que es .ts o .js según tu archivo

export const getHeaderData = (t, lang) => {
  return {
    links: [
      {
        text: t('nav.home'),
        href: getPermalink(t('routes.home', {}, { defaultValue: '/' }), 'page', lang),
      },
      // {
      //   text: t('nav.services'),
      //   href: getPermalink(t('routes.services', {}, { defaultValue: 'services' }), 'page', lang),
      // },
      // {
      //   text: t('nav.blog'),
      //   // Si el enlace principal "Blog" lleva al listado del blog:
      //   href: getBlogPermalink(t, lang), // Pasamos 't' a getBlogPermalink
      //   // Si "Blog" es un desplegable, entonces href podría ser '#' o getBlogPermalink,
      //   // y los links internos usarían t() para sus slugs de post/categoría si es necesario.
      //   // links: [
      //   //   {
      //   //     text: t('nav.blogList'),
      //   //     href: getBlogPermalink(t, lang),
      //   //   },
      //   //   {
      //   //     text: t('nav.article'), // Texto del enlace
      //   //     // Suponiendo que 'postViajeInterior' es la clave para este post específico en routes.json
      //   //     href: getPermalink(t('routes.postViajeInterior', {}, {defaultValue: 'blog/eneagrama-un-viaje-a-tu-mundo-interior'}), 'post', lang),
      //   //   },
      //   // ],
      // },
      // {
      //   text: t('nav.aboutUs'),
      //   href: getPermalink(t('routes.about', {}, { defaultValue: 'about' }), 'page', lang),
      // },
      // {
      //   text: t('nav.contactUs'),
      //   href: getPermalink(t('routes.contact', {}, { defaultValue: 'contact' }), 'page', lang),
      // },
    ],
    actions: [
      {
        text: t('nav.actions.book'),
        href: 'https://booking.bioenneagram.com/book', // Enlace externo
        target: '_blank',
      },
    ],
  };
};

export const getFooterData = (t, lang) => {
  const whatsappMessage = encodeURIComponent(t('footer.social.whatsappMessage', {}, { defaultValue: 'Hello!' }));
  const homePermalink = getHomePermalink(lang); // Obtener una vez

  return {
    links: [
      {
        title: t('footer.products.title'),
        links: [
          // { text: t('footer.products.retreat'), href: getPermalink(t('routes.productRetreat', {}, { defaultValue: 'products/retreat' }), 'page', lang) },
          // { text: t('footer.products.individualTherapy'), href: getPermalink(t('routes.productIndividualTherapy', {}, { defaultValue: 'products/individual-therapy' }), 'page', lang) },
          // { text: t('footer.products.couplesTherapy'), href: getPermalink(t('routes.productCouplesTherapy', {}, { defaultValue: 'products/couples-therapy' }), 'page', lang) },
          // { text: t('footer.products.manifestationWorkshop'), href: getPermalink(t('routes.workshopManifestation', {}, { defaultValue: 'workshops/manifestation' }), 'page', lang) },
          // { text: t('footer.products.emotionsWorkshop'), href: getPermalink(t('routes.workshopEmotions', {}, { defaultValue: 'workshops/emotions' }), 'page', lang) },
          // { text: t('footer.products.brainIntroCourse'), href: getPermalink(t('routes.courseIntroBrain', {}, { defaultValue: 'courses/intro-brain' }), 'page', lang) },
          // { text: t('footer.products.enneagramIntroCourse'), href: getPermalink(t('routes.courseIntroEnneagram', {}, { defaultValue: 'courses/intro-enneagram' }), 'page', lang) },
          { text: t('footer.products.enneagramGameCourse'), href: getPermalink(t('routes.courseEnneagramGame', {}, { defaultValue: 'landing/course-enneagram-game' }), 'page', lang) },
          // { text: t('footer.products.biodescodificacionIntroCourse'), href: getPermalink(t('routes.courseIntroBiodecoding', {}, { defaultValue: 'courses/intro-biodecoding' }), 'page', lang) },
        ],
      },
      // {
      //   title: t('footer.companies.title'),
      //   links: [
      //     { text: t('footer.companies.teamWorkshop'), href: getPermalink(t('routes.servicesTeamWorkshop', {}, { defaultValue: 'services/team-workshop' }), 'page', lang) },
      //     { text: t('footer.companies.conferences'), href: getPermalink(t('routes.servicesConferences', {}, { defaultValue: 'services/conferences' }), 'page', lang) },
      //     { text: t('footer.companies.consultationPackage'), href: getPermalink(t('routes.servicesConsultationPackage', {}, { defaultValue: 'services/consultation-package' }), 'page', lang) },
      //   ],
      // },
      {
        title: t('footer.support.title'),
        links: [
          { text: t('footer.support.aboutUs'), href: getPermalink(t('routes.about', {}, { defaultValue: 'about' }), 'page', lang) },
          // { text: t('footer.support.blog'), href: getBlogPermalink(t, lang) }, // Pasando 't'
          // { text: t('footer.support.professionalServices'), href: getPermalink(t('routes.services', {}, { defaultValue: 'services' }), 'page', lang) },
          { text: t('footer.support.socialImpact'), href: getPermalink(t('routes.socialImpact', {}, { defaultValue: 'social-impact' }), 'page', lang) },
          { text: t('footer.support.store'), href: 'https://shop.bioenneagram.com/', target: '_blank' },
          { text: t('footer.support.location'), target: '_blank', href: 'https://goo.gl/maps/Zw139zUs4rSwnGUQ7' },
        ],
      },
    ],
    secondaryLinks: [
      { text: t('footer.secondaryLinks.terms'), href: getPermalink(t('routes.terms', {}, { defaultValue: 'terms' }), 'page', lang) },
      { text: t('footer.secondaryLinks.privacy'), href: getPermalink(t('routes.privacy', {}, { defaultValue: 'privacy' }), 'page', lang) },
    ],
    socialLinks: [
      { ariaLabel: t('footer.social.ariaLabelX', {}, { defaultValue: 'X Profile' }), target: '_blank', icon: 'tabler:brand-x', href: 'https://twitter.com/bioenneagram' },
      { ariaLabel: t('footer.social.ariaLabelInstagram', {}, { defaultValue: 'Instagram Profile' }), target: '_blank', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/bioenneagramcoach/' },
      { ariaLabel: t('footer.social.ariaLabelFacebook', {}, { defaultValue: 'Facebook Page' }), target: '_blank', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/bioenneagram' },
      {
        ariaLabel: t('footer.social.ariaLabelWhatsapp', {}, { defaultValue: 'WhatsApp Contact' }),
        target: '_blank',
        icon: 'tabler:brand-whatsapp',
        href: `https://api.whatsapp.com/send/?phone=573004481819&text=${whatsappMessage}&type=phone_number&app_absent=0`,
      },
      { ariaLabel: t('footer.social.ariaLabelSpotify', {}, { defaultValue: 'Spotify Podcast' }), target: '_blank', icon: 'tabler:brand-spotify', href: 'https://open.spotify.com/show/4eW2cf7WMf8OrV19Ouyojm' },
      // { ariaLabel: t('footer.social.ariaLabelRSS', {}, {defaultValue: 'RSS Feed'}), target: '_blank', icon: 'tabler:rss', href: getAsset('/rss.xml') }, // Descomenta si tienes RSS
    ],
    footNote: `
      <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-logo"></span>
      ${t('footer.footNote.developedBy')} <a class="text-blue-600 hover:underline dark:text-gray-200" href="${homePermalink}"> Bioenneagram</a> · © ${new Date().getFullYear()} ${t('footer.footNote.rightsReserved')}
    `,
  };
};