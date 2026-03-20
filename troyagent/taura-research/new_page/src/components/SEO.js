import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE = 'TAURA Research';
const BASE = 'https://tauraresearch.com';

const SEO = ({ title, description, path = '/', type = 'website', article = null, product = null }) => {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Compostos de Pesquisa com Pureza Verificada`;
  const url = `${BASE}${path}`;
  const desc = description || 'Compostos de pesquisa com pureza verificada por HPLC ≥98%. Peptídeos, SARMs, nootrópicos e compostos de longevidade.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />

      {/* Article structured data */}
      {article && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: desc,
            datePublished: article.dateISO || '2026-03-01',
            author: { '@type': 'Organization', name: SITE },
            publisher: { '@type': 'Organization', name: SITE },
            mainEntityOfPage: { '@type': 'WebPage', '@id': url }
          })}
        </script>
      )}

      {/* Product structured data */}
      {product && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: desc,
            brand: { '@type': 'Brand', name: SITE },
            category: product.category,
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'BRL'
            }
          })}
        </script>
      )}

      {/* BreadcrumbList */}
      {path !== '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
              ...(path.startsWith('/produtos/') ? [
                { '@type': 'ListItem', position: 2, name: 'Catálogo', item: `${BASE}/blog` },
                { '@type': 'ListItem', position: 3, name: product?.name || 'Produto', item: url }
              ] : path.startsWith('/artigos/') ? [
                { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog/curiosidades` },
                { '@type': 'ListItem', position: 3, name: article?.title || 'Artigo', item: url }
              ] : [
                { '@type': 'ListItem', position: 2, name: title || 'Página', item: url }
              ])
            ]
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
