import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@/hooks/useTranslation';

const SITE_URL = 'https://TU-DOMINIO.vercel.app'; // [CONFIRMAR]

const DESCRIPTIONS = {
  es: 'Portafolio de desarrollo frontend enfocado en arquitectura, accesibilidad, Three.js y experiencias interactivas.',
  en: 'Frontend development portfolio focused on architecture, accessibility, Three.js, and interactive experiences.',
};

const Seo = () => {
  const { language } = useTranslation();
  const title = 'CamiloDev — Creative Developer';
  const description = DESCRIPTIONS[language];

  return (
    <Helmet htmlAttributes={{ lang: language }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={SITE_URL} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:locale" content={language === 'es' ? 'es_ES' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default Seo;