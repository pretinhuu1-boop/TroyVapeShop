import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import { getWhatsAppURL } from '../utils/whatsapp';

const ProductLayout = ({ peptide }) => {
  if (!peptide) return null;

  return (
    <>
      <SEO
        title={`${peptide.name} (${peptide.code})`}
        description={peptide.subtitle || `${peptide.name} — ficha técnica completa, COA por lote e referências científicas.`}
        path={`/produtos/${peptide.slug}`}
        product={{ name: peptide.name, category: peptide.category }}
      />
      <Navbar />
      <main>

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/blog">Catálogo</Link>
        <span className="breadcrumb-sep">/</span>
        <span style={{color:'var(--prata)'}}>{peptide.name} ({peptide.code})</span>
      </nav>

      <section className="product-hero">
        <div className="product-hero-img">
          {(peptide.imagePhoto || peptide.image) ? (
            <img src={peptide.imagePhoto || peptide.image} alt={`${peptide.name} — ${peptide.category}`} loading="lazy" />
          ) : (
            <div className="product-hero-img-placeholder">
              <span>{peptide.code}</span>
            </div>
          )}
        </div>
        <div className="product-hero-info">
          <div className="product-hero-cat">{peptide.category}</div>
          <h1 className="product-hero-title">{peptide.name}</h1>
          <p className="product-hero-subtitle">{peptide.subtitle}</p>

          <div className="quick-specs">
            <div className="quick-spec">
              <span className="quick-spec-label">Pureza</span>
              <span className="quick-spec-value">{peptide.specs.pureza}</span>
            </div>
            <div className="quick-spec">
              <span className="quick-spec-label">Peso Mol.</span>
              <span className="quick-spec-value">{peptide.specs.pesoMol || '—'}</span>
            </div>
            <div className="quick-spec">
              <span className="quick-spec-label">{peptide.specs.cas ? 'CAS' : 'Forma'}</span>
              <span className="quick-spec-value">{peptide.specs.cas || peptide.specs.forma || '—'}</span>
            </div>
          </div>

          <div className="cta-row">
            <a href={getWhatsAppURL(peptide.name)} className="cta-primary" target="_blank" rel="noopener noreferrer">Solicitar Acesso</a>
            <a href="#datasheet" className="cta-secondary">Ver Ficha Completa</a>
          </div>
        </div>
      </section>

      <div className="divider"><div className="divider-line"></div></div>

      {(peptide.editorial.overview.length > 0 || peptide.editorial.mechanism.length > 0) && (
        <>
          <section className="editorial">
            <aside className="editorial-sidebar">
              <div className="editorial-sidebar-label">Neste Protocolo</div>
              <a href="#overview" className="editorial-toc-item">Visão Geral</a>
              <a href="#mechanism" className="editorial-toc-item">Mecanismo</a>
              <a href="#literature" className="editorial-toc-item">Literatura</a>
              <a href="#datasheet" className="editorial-toc-item">Ficha Técnica</a>
              <a href="#refs" className="editorial-toc-item">Referências</a>
            </aside>

            <div className="editorial-content">
              {peptide.editorial.overview.length > 0 && (
                <>
                  <h2 className="editorial-h2" id="overview">Visão Geral</h2>
                  {peptide.editorial.overview.map((p, i) => (
                    <p className="editorial-p" key={i}>{p}</p>
                  ))}
                </>
              )}

              {peptide.editorial.highlight && (
                <div className="editorial-highlight">{peptide.editorial.highlight}</div>
              )}

              {peptide.editorial.mechanism.length > 0 && (
                <>
                  <h2 className="editorial-h2" id="mechanism">Mecanismo de Ação Proposto</h2>
                  {peptide.editorial.mechanism.map((p, i) => (
                    <p className="editorial-p" key={i}>{p}</p>
                  ))}
                </>
              )}

              {peptide.editorial.literature.length > 0 && (
                <>
                  <h2 className="editorial-h2" id="literature">O Que a Literatura Indica</h2>
                  {peptide.editorial.literature.map((p, i) => (
                    <p className="editorial-p" key={i}>{p}</p>
                  ))}
                </>
              )}
            </div>
          </section>
          <div className="divider"><div className="divider-line"></div></div>
        </>
      )}

      <section className="datasheet" id="datasheet">
        <div className="datasheet-label">Dados Técnicos</div>
        <h2 className="datasheet-title">Ficha do Composto</h2>
        <table className="data-table">
          <tbody>
            {peptide.datasheet.map(([label, value], i) => (
              <tr key={i}>
                <td>{label}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {peptide.references.length > 0 && (
        <>
          <div className="divider"><div className="divider-line"></div></div>
          <section className="references" id="refs">
            <div className="ref-label">Referências</div>
            {peptide.references.map((ref, i) => (
              <div className="ref-item" key={i}>
                <span className="ref-number">[{ref.num}]</span>
                <div>
                  <div className="ref-text">
                    {ref.text} <em>{ref.title}</em> {ref.journal}
                  </div>
                  {ref.doi && <span className="ref-doi">doi: {ref.doi}</span>}
                </div>
              </div>
            ))}
          </section>
        </>
      )}

      {peptide.blogLink && (
        <section className="blog-link-section">
          <Link to={`/artigos/${peptide.blogLink.slug}`} className="blog-link-card">
            <div className="blog-link-icon">&#x2B21; Dados</div>
            <div className="blog-link-content">
              <div className="blog-link-label">Leia o que a ciência diz</div>
              <div className="blog-link-title">{peptide.blogLink.title}</div>
            </div>
            <div className="blog-link-arrow">→</div>
          </Link>
        </section>
      )}

      </main>
      <Footer type="catalog" />
    </>
  );
};

export default ProductLayout;
