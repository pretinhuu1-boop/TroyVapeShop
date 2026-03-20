import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { peptides } from '../data/peptides';
import '../styles/landing.css';

const Landing = () => {
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const heroVideoRef = useRef(null);
  const moleculeVideoRef = useRef(null);

  // Ping-pong: two videos (normal + reverse) stacked, alternate visibility
  const setupPingPong = useCallback((container) => {
    if (!container) return;
    const videos = container.querySelectorAll('video');
    if (videos.length < 2) return;

    const vidFwd = videos[0]; // normal video
    const vidRev = videos[1]; // reversed video

    vidRev.style.opacity = '0';
    vidFwd.style.opacity = '0.85';

    const onFwdEnd = () => {
      vidFwd.style.opacity = '0';
      vidRev.style.opacity = '0.85';
      vidRev.currentTime = 0;
      vidRev.play();
    };

    const onRevEnd = () => {
      vidRev.style.opacity = '0';
      vidFwd.style.opacity = '0.85';
      vidFwd.currentTime = 0;
      vidFwd.play();
    };

    vidFwd.addEventListener('ended', onFwdEnd);
    vidRev.addEventListener('ended', onRevEnd);

    // Start forward
    vidFwd.currentTime = 0;
    vidFwd.play();

    return () => {
      vidFwd.removeEventListener('ended', onFwdEnd);
      vidRev.removeEventListener('ended', onRevEnd);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = e.clientX + 'px';
        cursorRingRef.current.style.top = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Setup ping-pong for both videos
    const cleanupHero = setupPingPong(heroVideoRef.current);
    const cleanupMolecule = setupPingPong(moleculeVideoRef.current);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (cleanupHero) cleanupHero();
      if (cleanupMolecule) cleanupMolecule();
    };
  }, [setupPingPong]);

  return (
    <div className="landing-page">
      <SEO
        title={null}
        description="Compostos de pesquisa com pureza verificada por HPLC ≥98%. Peptídeos, SARMs, nootrópicos e compostos de longevidade com COA por lote e fichas técnicas completas."
        path="/"
      />
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={cursorRingRef}></div>
      <Navbar />

      <main>
      {/* HERO */}
      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid-lines"></div>
        <div className="hero-vial" ref={heroVideoRef}>
          <video autoPlay muted playsInline preload="auto" className="hero-video pingpong-fwd">
            <source src="/video/taura1.mp4" type="video/mp4" />
          </video>
          <video muted playsInline preload="auto" className="hero-video pingpong-rev">
            <source src="/video/taura1_reverse.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-vignette"></div>
        <div className="hero-content">
          <div className="hero-eyebrow">Compostos de pesquisa verificados por COA</div>
          <h1 className="hero-wordmark">TAURA</h1>
          <div className="hero-tagline">
            Força não é acidente. <em>É protocolo.</em>
          </div>
          <div className="hero-cta-group">
            <Link to="/blog" className="btn-primary"><span>Acessar Canal de Pesquisa</span></Link>
            <Link to="/blog/curiosidades" className="btn-ghost">Ver compostos</Link>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>SCROLL</span>
          <div className="scroll-line"></div>
        </div>
        <div className="hero-stat-bar">
          <div className="hero-stat">
            <div className="stat-num">9</div>
            <div className="stat-label">Compostos Ativos</div>
          </div>
          <div className="hero-stat">
            <div className="stat-num">≥98%</div>
            <div className="stat-label">Pureza HPLC</div>
          </div>
          <div className="hero-stat">
            <div className="stat-num">COA</div>
            <div className="stat-label">Por Lote</div>
          </div>
          <div className="hero-stat">
            <div className="stat-num">48h</div>
            <div className="stat-label">Despacho</div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section id="social-proof">
        <div className="section-bg" style={{ backgroundImage: 'url(/images/landing/social-proof-bg.png)' }}></div>
        <div className="section-bg-vignette"></div>
        <div className="section-label">Quem Confia</div>
        <h2 className="social-proof-title">
          Pesquisadores. Clínicos.<br/>Atletas de elite.<br/><span className="vinho">Quem opera na fronteira.</span>
        </h2>
        <div className="proof-grid">
          {[
            { name: 'Clínicas de Longevidade', context: 'Protocolos de otimização com peptídeos de pureza verificada' },
            { name: 'Pesquisadores Independentes', context: 'Compostos para estudos in vitro e modelos animais' },
            { name: 'Médicos Integrativistas', context: 'Acesso a moléculas com COA por lote' },
            { name: 'Biohackers Avançados', context: 'Dados primeiro, decisão depois' },
            { name: 'Atletas de Elite', context: 'Performance baseada em literatura revisada' },
            { name: 'Farmacêuticos', context: 'Compostos com especificação técnica completa' },
          ].map((p, i) => (
            <div className="proof-item" key={i}>
              <div className="proof-name">{p.name}</div>
              <div className="proof-context">{p.context}</div>
            </div>
          ))}
        </div>
        <div className="proof-disclaimer">
          Todos os compostos são destinados exclusivamente a fins de pesquisa.
          Não se destinam a uso humano, diagnóstico ou tratamento de doenças.
        </div>
      </section>

      {/* MOLECULAR VISUAL */}
      <section className="visual-break">
        <div className="visual-break-img">
          <div className="pingpong-container" ref={moleculeVideoRef}>
            <video autoPlay muted playsInline preload="auto" className="visual-break-video pingpong-fwd">
              <source src="/video/Molecule_zoom.mp4" type="video/mp4" />
            </video>
            <video muted playsInline preload="auto" className="visual-break-video pingpong-rev">
              <source src="/video/Molecule_zoom_reverse.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="visual-break-vignette"></div>
        </div>
        <div className="visual-break-text">
          <div className="visual-break-label">// Estrutura Molecular</div>
          <div className="visual-break-title">PUREZA<br/>VERIFICADA.</div>
          <div className="visual-break-body">Cada lote é analisado por HPLC com COA disponível. Sem exceções.</div>
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars">
        <div className="pillars-header">
          <h2 className="pillars-title">Por Que<br/>TAURA</h2>
          <p className="pillars-subtitle">Três pilares que definem o protocolo de acesso e a filosofia operacional.</p>
        </div>
        <div className="pillars-grid">
          <div className="pillar">
            <div className="pillar-img"><img src="/images/landing/pillars-pureza.png" alt="Pureza HPLC" loading="lazy" /></div>
            <div className="pillar-num">01</div>
            <h3 className="pillar-title">Pureza Verificada</h3>
            <div className="pillar-value">HPLC ≥ 98%</div>
            <p className="pillar-desc">Cada lote passa por análise HPLC com COA disponível. Sem exceções, sem atalhos.</p>
          </div>
          <div className="pillar">
            <div className="pillar-img"><img src="/images/landing/pillars-dados.png" alt="Literatura científica" loading="lazy" /></div>
            <div className="pillar-num">02</div>
            <h3 className="pillar-title">Dados Primeiro</h3>
            <div className="pillar-value">Literatura revisada</div>
            <p className="pillar-desc">Cada composto vem acompanhado de ficha técnica completa e referências da literatura científica.</p>
          </div>
          <div className="pillar">
            <div className="pillar-img"><img src="/images/landing/pillars-acesso.png" alt="Acesso discreto" loading="lazy" /></div>
            <div className="pillar-num">03</div>
            <h3 className="pillar-title">Acesso Discreto</h3>
            <div className="pillar-value">Protocolo verificado</div>
            <p className="pillar-desc">Canal de acesso com verificação. Atendimento técnico por profissionais que entendem o que você pesquisa.</p>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog">
        <div className="catalog-header">
          <h2 className="catalog-title">Catálogo de<br/>Compostos</h2>
          <p className="catalog-sub">Fichas técnicas completas, COA por lote, referências da literatura. Para quem opera na fronteira.</p>
        </div>
        <div className="catalog-grid">
          {peptides.map((p) => (
            <Link to={`/produtos/${p.slug}`} className="catalog-card" key={p.id}>
              {(p.imagePhoto || p.image) && <div className="card-img"><img src={p.imagePhoto || p.image} alt={p.name} loading="lazy" /></div>}
              <div className="card-cat">{p.category.split('·')[0].trim()}</div>
              <div className="card-name">{p.name}</div>
              <div className="card-tag">{p.excerpt.substring(0, 80)}...</div>
              <span className="card-cta">Consultar disponibilidade</span>
            </Link>
          ))}
        </div>
      </section>

      {/* KIT VISUAL */}
      <section className="visual-break visual-break-kit">
        <div className="visual-break-img">
          <img src="/images/products/kit-unboxing.jpg" alt="Kit TAURA Research" loading="lazy" />
          <div className="visual-break-vignette"></div>
        </div>
        <div className="visual-break-text visual-break-text-right">
          <div className="visual-break-label">// Entrega</div>
          <div className="visual-break-title">DISCRETO<br/>POR<br/>DESIGN.</div>
          <div className="visual-break-body">Embalagem neutra. Rastreamento completo. COA incluído. Processamento em 48h.</div>
        </div>
      </section>

      {/* BLOG PREVIEW - FROM THE RESEARCH */}
      <section id="blog-preview">
        <div className="blog-preview-header">
          <div className="section-label">O Que a Ciência Diz</div>
          <h2 className="blog-preview-title">Direto da<br/>Pesquisa</h2>
          <p className="blog-preview-sub">Mecanismos de ação, literatura revisada por pares e dados — sem hype, sem promessas.</p>
        </div>
        <div className="blog-preview-grid">
          {[
            { slug: 'retatrutida', tag: 'Metabólico · Peptídeos', title: 'Agonismo triplo: por que três receptores mudam tudo na pesquisa metabólica', readTime: '8 min' },
            { slug: 'bpc-157', tag: 'Peptídeos · Reparação', title: 'Como um fragmento gástrico se tornou o peptídeo mais estudado em reparo tecidual', readTime: '5 min' },
            { slug: 'epithalon', tag: 'Longevidade · Peptídeos', title: 'Epithalon e telomerase: quatro aminoácidos que intrigam a gerontologia', readTime: '6 min' },
            { slug: 'mots-c', tag: 'Longevidade · Metabólico', title: 'MOTS-c: o primeiro peptídeo codificado pelo DNA mitocondrial com ação nuclear', readTime: '7 min' },
            { slug: 'pp-332', tag: 'SARMs · Performance', title: 'SLU-PP-332: o composto que mimetiza exercício físico a nível molecular', readTime: '6 min' },
            { slug: 'semax', tag: 'Nootrópicos · Peptídeos', title: 'Semax e BDNF: o peptídeo russo que modula fator neurotrófico', readTime: '6 min' },
          ].map((post) => (
            <Link to={`/artigos/${post.slug}`} className="blog-preview-card" key={post.slug}>
              <div className="blog-preview-card-img">
                <img src={`/images/articles/${post.slug}.png`} alt={post.title} loading="lazy" />
              </div>
              <div className="blog-preview-card-body">
                <div className="blog-preview-card-tag">{post.tag}</div>
                <h3 className="blog-preview-card-title">{post.title}</h3>
                <div className="blog-preview-card-meta">{post.readTime} leitura</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="blog-preview-cta">
          <Link to="/blog/curiosidades" className="btn-ghost">Ver todos os artigos <span>→</span></Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="final-cta">
        <div className="section-bg" style={{ backgroundImage: 'url(/images/landing/final-cta-bg.png)' }}></div>
        <div className="section-bg-vignette"></div>
        <h2 className="final-title">Para quem opera<br/>na fronteira.</h2>
        <p className="final-sub">
          Compostos de pesquisa com pureza verificada, COA por lote e acesso via protocolo.
          Para quem opera com dados — não com promessas.
        </p>
        <Link to="/blog" className="final-btn">Acessar Catálogo Completo</Link>
      </section>

      </main>
      <Footer type="catalog" />
    </div>
  );
};

export default Landing;
