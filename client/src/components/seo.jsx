import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'LO SCALE';
const SITE_URL = 'https://loscaledigital.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-default.jpg`;

export default function Seo({ title, description, path = '/', image, type = 'website', noindex = false }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Digital Growth Agency`;
  const url = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;

  if (noindex) {
    return (
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    );
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}