import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ReadingProgress from './ReadingProgress';
import SEO from './SEO';

const ArticleLayout = ({ article }) => {
  if (!article) return null;

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt || `${article.title} — Artigo científico por TAURA Research.`}
        path={`/artigos/${article.slug}`}
        type="article"
        article={{ title: article.title, dateISO: article.dateISO || '2026-03-01' }}
      />
      <ReadingProgress />
      <Navbar />
      <main>

      <header className="article-header">
        <Link to="/blog/curiosidades" className="article-back">← Voltar ao blog</Link>
        <div className="article-tag">{article.tag}</div>
        <h1 className="article-title">{article.title}</h1>
        <div className="article-meta">
          <span>{article.date}</span>
          <span className="article-meta-dot"></span>
          <span>{article.readTime} leitura</span>
          <span className="article-meta-dot"></span>
          <span>TAURA Research</span>
        </div>
      </header>

      <div className="article-cover">
        <div className="article-cover-inner">
          <img src={`/images/articles/${article.slug}.png`} alt={article.title} className="article-cover-img" />
          <div className="article-cover-overlay"></div>
          <span className="article-cover-text">{article.coverText}</span>
        </div>
      </div>

      <article className="article-body" dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />

      {article.sources && article.sources.length > 0 && (
        <section className="sources">
          <div className="sources-label">Fontes</div>
          {article.sources.map((src, i) => (
            <div className="source-item" key={i}>
              <span className="source-num">[{i + 1}]</span>
              <div dangerouslySetInnerHTML={{ __html: src }} />
            </div>
          ))}
        </section>
      )}

      {article.related && article.related.length > 0 && (
        <section className="related">
          <div className="related-label">Leia Também</div>
          <div className="related-grid">
            {article.related.map((rel, i) => (
              <Link to={`/artigos/${rel.slug}`} className="related-card" key={i}>
                <div className="related-card-img">
                  <img src={`/images/articles/${rel.slug}.png`} alt={rel.title} loading="lazy" />
                </div>
                <div className="related-card-info">
                  <span className="related-card-tag">{rel.tag}</span>
                  <h3 className="related-card-title">{rel.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      </main>
      <Footer type="blog" />
    </>
  );
};

export default ArticleLayout;
