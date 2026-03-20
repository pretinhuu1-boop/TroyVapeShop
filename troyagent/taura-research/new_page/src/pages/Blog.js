import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { peptides } from '../data/peptides';
import '../styles/blog.css';

const Blog = () => {
  const [filter, setFilter] = useState('Todos');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const categories = ['Todos', 'Peptídeos', 'SARMs', 'Nootrópicos', 'Longevidade'];

  const filterMap = {
    'Peptídeos': 'peptídeo',
    'SARMs': 'sarms',
    'Nootrópicos': 'nootrópico',
    'Longevidade': 'longevidade',
  };

  const filteredPeptides = filter === 'Todos'
    ? peptides
    : peptides.filter(p => p.category.toLowerCase().includes(filterMap[filter]));

  return (
    <>
      <SEO
        title="Catálogo de Compostos"
        description="Catálogo completo de compostos de pesquisa: peptídeos, SARMs, nootrópicos e longevidade. Fichas técnicas, COA por lote e referências científicas."
        path="/blog"
      />
      <Navbar />

      <section className="blog-hero catalog">
        <div className="blog-hero-bg" style={{ backgroundImage: 'url(/images/products/vial-hero.jpg)' }}></div>
        <div className="blog-hero-vignette"></div>
        <div className="hero-label">Catálogo de Pesquisa</div>
        <h1 className="hero-title">Compostos<br/>sob Protocolo</h1>
        <p className="hero-desc">
          Fichas técnicas completas, COA por lote, referências da literatura.
          Para quem opera na fronteira — dados primeiro, opinião depois.
        </p>
      </section>

      <div className="filters">
        {categories.map(cat => (
          <button key={cat} className={`filter-btn ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <section className="product-list">
        {filteredPeptides.map((p) => (
          <Link to={`/produtos/${p.slug}`} className="product-item" key={p.id}>
            <div className="product-img-wrap">
              {(p.imagePhoto || p.image) ? (
                <img src={p.imagePhoto || p.image} alt={p.name} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              ) : (
                <div style={{width:'100%',height:'100%',background:p.gradient,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{fontFamily:'var(--font-d)',fontSize:'36px',fontWeight:900,color:'rgba(242,239,233,0.08)',letterSpacing:'0.1em'}}>{p.name.toUpperCase()}</span>
                </div>
              )}
              <div className="product-img-badge">{p.badge}</div>
            </div>
            <div className="product-info">
              <div className="product-cat">{p.category}</div>
              <h2 className="product-title">{p.name}</h2>
              <p className="product-excerpt">{p.excerpt}</p>
              <div className="product-specs">
                <div className="product-spec"><span className="product-spec-label">Pureza</span><span className="product-spec-value">{p.specs.pureza}</span></div>
                <div className="product-spec"><span className="product-spec-label">Concentração</span><span className="product-spec-value">{p.specs.concentracao}</span></div>
                <div className="product-spec"><span className="product-spec-label">{p.specs.forma ? 'Forma' : 'Peso Mol.'}</span><span className="product-spec-value">{p.specs.forma || p.specs.pesoMol}</span></div>
              </div>
              <div className="product-link">Ver protocolo completo <span>→</span></div>
            </div>
          </Link>
        ))}
      </section>

      <Footer type="catalog" />
    </>
  );
};

export default Blog;
