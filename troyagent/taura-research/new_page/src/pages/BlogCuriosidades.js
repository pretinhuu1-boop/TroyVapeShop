import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { articles } from '../data/articles';
import '../styles/blog.css';

const blogPosts = [
  { slug: 'retatrutida', tag: 'Metabólico · Peptídeos', title: 'Agonismo triplo: por que três receptores mudam tudo na pesquisa metabólica', excerpt: 'Retatrutida ativa GLP-1, GIP e glucagon simultaneamente — um mecanismo triplo inédito.', date: '12 Mar 2026', readTime: '8 min', gradient: 'linear-gradient(135deg, #111 0%, #1a0508 100%)' },
  { slug: 'tirzepatida', tag: 'Metabólico · Peptídeos', title: 'GIP + GLP-1: a combinação que redefiniu o campo das incretinas', excerpt: 'Tirzepatida é o primeiro agonista duplo GIP/GLP-1.', date: '10 Mar 2026', readTime: '7 min', gradient: 'linear-gradient(135deg, #111 0%, #1a0a0d 100%)' },
  { slug: 'semax', tag: 'Nootrópicos · Peptídeos', title: 'Semax e BDNF: o peptídeo russo que modula fator neurotrófico', excerpt: 'Desenvolvido na Rússia nos anos 80, um dos poucos peptídeos com aprovação regulatória.', date: '08 Mar 2026', readTime: '6 min', gradient: 'linear-gradient(135deg, #0d0d0d 0%, #0d0d1a 100%)' },
  { slug: 'bpc-157', tag: 'Peptídeos · Reparação', title: 'Como um fragmento gástrico se tornou o peptídeo mais estudado em reparo tecidual', excerpt: 'BPC-157 foi isolado de suco gástrico humano. Ele não deveria sobreviver ao pH do estômago — mas sobrevive.', date: '05 Mar 2026', readTime: '5 min', gradient: 'linear-gradient(135deg, #111 0%, #1a0508 100%)' },
  { slug: 'pp-332', tag: 'SARMs · Performance', title: 'SLU-PP-332: o composto que mimetiza exercício físico a nível molecular', excerpt: 'Um agonista de ERRα que ativa as mesmas vias metabólicas do exercício aeróbico.', date: '01 Mar 2026', readTime: '6 min', gradient: 'linear-gradient(135deg, #0f0f0f 0%, #1a1008 100%)' },
  { slug: 'pt-141', tag: 'Peptídeos · SNC', title: 'PT-141: o único peptídeo aprovado que age via sistema nervoso central', excerpt: 'Derivado do Melanotan II, atua no receptor MC4R no hipotálamo.', date: '25 Fev 2026', readTime: '5 min', gradient: 'linear-gradient(135deg, #111 0%, #160a0a 100%)' },
  { slug: 'cjc-ipamorelin', tag: 'Peptídeos · Performance', title: 'GH pulsátil: por que o timing importa mais que a quantidade', excerpt: 'CJC-1295 estende a meia-vida do GHRH, Ipamorelin mimetiza grelina sem elevar cortisol.', date: '20 Fev 2026', readTime: '7 min', gradient: 'linear-gradient(135deg, #0d0d0d 0%, #0d1a12 100%)' },
  { slug: 'epithalon', tag: 'Longevidade · Peptídeos', title: 'Epithalon e telomerase: quatro aminoácidos que intrigam a gerontologia', excerpt: 'Tetrapeptídeo estudado desde os anos 90, com ativação de telomerase e regulação de melatonina.', date: '15 Fev 2026', readTime: '6 min', gradient: 'linear-gradient(135deg, #0d0d0d 0%, #0a0d1a 100%)' },
  { slug: 'mots-c', tag: 'Longevidade · Metabólico', title: 'MOTS-c: o primeiro peptídeo codificado pelo DNA mitocondrial com ação nuclear', excerpt: 'Descoberto em 2015, codificado pelo gene 12S rRNA mitocondrial.', date: '10 Fev 2026', readTime: '7 min', gradient: 'linear-gradient(135deg, #0f0f0f 0%, #1a0a08 100%)' },
  { slug: 'peptideos-sinteticos-vs-naturais', tag: 'Peptídeos · Bioquímica', title: 'Peptídeos sintéticos vs naturais: estabilidade, pureza e biodisponibilidade', excerpt: 'O que diferencia um peptídeo sintetizado por fase sólida de seu análogo endógeno — e por que isso importa para pesquisa.', date: '11 Mar 2026', readTime: '7 min', gradient: 'linear-gradient(135deg, #0d0d0d 0%, #0d1a14 100%)' },
  { slug: 'hplc-pureza-peptideos', tag: 'Peptídeos · Análise', title: 'HPLC e pureza peptídica: como interpretar um certificado de análise', excerpt: 'Cromatografia líquida de alta eficiência é o padrão-ouro para quantificar pureza. Mas o que os números realmente significam?', date: '09 Mar 2026', readTime: '6 min', gradient: 'linear-gradient(135deg, #111 0%, #0d0d1a 100%)' },
  { slug: 'via-subcutanea-farmacocinetica', tag: 'Peptídeos · Farmacocinética', title: 'Via subcutânea: farmacocinética e absorção de peptídeos', excerpt: 'Por que a maioria dos peptídeos de pesquisa utiliza a via subcutânea — e o que a literatura diz sobre absorção, Tmax e biodisponibilidade.', date: '07 Mar 2026', readTime: '6 min', gradient: 'linear-gradient(135deg, #0f0f0f 0%, #1a0a0d 100%)' },
  { slug: 'sarms-receptores-androgenicos', tag: 'SARMs · Mecanismo', title: 'SARMs e receptores androgênicos: seletividade tecidual explicada', excerpt: 'Como os moduladores seletivos de receptores androgênicos discriminam entre tecido muscular e prostático a nível molecular.', date: '04 Mar 2026', readTime: '8 min', gradient: 'linear-gradient(135deg, #0f0f0f 0%, #1a1008 100%)' },
  { slug: 'sarms-vs-esteroides', tag: 'SARMs · Comparativo', title: 'SARMs vs esteroides anabolizantes: seletividade tecidual e perfil de efeitos', excerpt: 'A diferença fundamental entre ativação androgênica plena e modulação seletiva — o que a literatura pré-clínica mostra.', date: '02 Mar 2026', readTime: '7 min', gradient: 'linear-gradient(135deg, #111 0%, #1a1008 100%)' },
  { slug: 'ostarine-mk2866-literatura', tag: 'SARMs · Literatura', title: 'Ostarine (MK-2866): o que a literatura clínica realmente demonstra', excerpt: 'O SARM mais estudado em ensaios clínicos. Dados de fase II em sarcopenia, caquexia e composição corporal.', date: '28 Fev 2026', readTime: '8 min', gradient: 'linear-gradient(135deg, #0f0f0f 0%, #1a0d08 100%)' },
  { slug: 'nootropicos-mecanismos-cognicao', tag: 'Nootrópicos · Mecanismo', title: 'Nootrópicos e cognição: vias colinérgicas, glutamatérgicas e neurotróficas', excerpt: 'Os três grandes eixos farmacológicos por trás da modulação cognitiva — e como diferentes compostos os ativam.', date: '26 Fev 2026', readTime: '8 min', gradient: 'linear-gradient(135deg, #0d0d0d 0%, #0d0d1a 100%)' },
  { slug: 'bdnf-plasticidade-sinaptica', tag: 'Nootrópicos · Neurociência', title: 'BDNF e plasticidade sináptica: o fator que conecta exercício, cognição e neurogênese', excerpt: 'Por que o fator neurotrófico derivado do cérebro é considerado a molécula-chave na interface entre atividade física e função cognitiva.', date: '22 Fev 2026', readTime: '7 min', gradient: 'linear-gradient(135deg, #0d0d0d 0%, #0a0d1a 100%)' },
  { slug: 'nootropicos-peptidicos-vs-sinteticos', tag: 'Nootrópicos · Comparativo', title: 'Nootrópicos peptídicos vs sintéticos: Semax, Selank e a família dos racetams', excerpt: 'Peptídeos neuroativos vs moléculas sintéticas de baixo peso molecular — mecanismos, biodisponibilidade e o que a literatura compara.', date: '18 Fev 2026', readTime: '7 min', gradient: 'linear-gradient(135deg, #111 0%, #0d0d1a 100%)' },
  { slug: 'telomeros-envelhecimento', tag: 'Longevidade · Biologia', title: 'Telômeros, telomerase e envelhecimento biológico: o relógio molecular', excerpt: 'O encurtamento telomérico como biomarcador de aging — e os compostos que a literatura investiga como moduladores.', date: '13 Fev 2026', readTime: '8 min', gradient: 'linear-gradient(135deg, #0d0d0d 0%, #0a0d1a 100%)' },
  { slug: 'senescencia-celular-senolytics', tag: 'Longevidade · Senescência', title: 'Senescência celular e senolíticos: eliminando células-zumbi', excerpt: 'Células senescentes acumulam-se com a idade e secretam fatores inflamatórios. Os senolíticos prometem removê-las seletivamente.', date: '08 Fev 2026', readTime: '7 min', gradient: 'linear-gradient(135deg, #0f0f0f 0%, #0d1a14 100%)' },
  { slug: 'mitocondrias-aging', tag: 'Longevidade · Mitocondrial', title: 'Disfunção mitocondrial no envelhecimento: ROS, MDPs e biogênese', excerpt: 'A mitocôndria como protagonista do aging — de geradora de energia a hub de sinalização de longevidade.', date: '05 Fev 2026', readTime: '8 min', gradient: 'linear-gradient(135deg, #111 0%, #0d1a14 100%)' },
];

const getArticleImage = (slug) => `/images/articles/${slug}.png`;

const POSTS_PER_PAGE = 9;

const BlogCuriosidades = () => {
  const [tag, setTag] = useState('Todos');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tags = ['Todos', 'Peptídeos', 'SARMs', 'Nootrópicos', 'Longevidade'];

  const tagFilterMap = {
    'Peptídeos': 'peptídeos',
    'SARMs': 'sarms',
    'Nootrópicos': 'nootrópicos',
    'Longevidade': 'longevidade',
  };

  const filtered = tag === 'Todos'
    ? blogPosts
    : blogPosts.filter(p => p.tag.toLowerCase().includes(tagFilterMap[tag]));

  // Reset visible count when filter changes
  useEffect(() => { setVisibleCount(POSTS_PER_PAGE); }, [tag]);

  const featured = filtered[0];
  const allRest = filtered.slice(1);
  const rest = allRest.slice(0, visibleCount);
  const hasMore = visibleCount < allRest.length;

  return (
    <>
      <SEO
        title="Blog — O Que a Ciência Diz"
        description="Artigos científicos sobre peptídeos, SARMs, nootrópicos e longevidade. Mecanismos de ação, literatura revisada por pares e dados — sem hype."
        path="/blog/curiosidades"
      />
      <Navbar />

      <section className="blog-hero">
        <div className="blog-hero-bg" style={{ backgroundImage: 'url(/images/products/molecule-0.jpg)' }}></div>
        <div className="blog-hero-vignette"></div>
        <div className="hero-label">Dados Primeiro. Opinião Depois.</div>
        <h1 className="hero-title">O Que a<br/>Ciência Diz</h1>
        <p className="hero-desc">
          Curiosidades, mecanismos de ação e o que a literatura revisada por pares
          realmente mostra. Sem hype, sem promessas — só dados.
        </p>
      </section>

      <div className="tags">
        {tags.map(t => (
          <button key={t} className={`tag ${tag === t ? 'active' : ''}`} onClick={() => setTag(t)}>{t}</button>
        ))}
      </div>

      {featured && <section className="featured">
        <Link to={`/artigos/${featured.slug}`} className="featured-card">
          <div className="featured-img">
            <img src={getArticleImage(featured.slug)} alt={featured.title} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover'}} />
          </div>
          <div className="featured-body">
            <div className="featured-tag">{featured.tag}</div>
            <h2 className="featured-title">{featured.title}</h2>
            <p className="featured-excerpt">{featured.excerpt}</p>
            <div className="featured-meta">
              <span>{featured.date}</span>
              <span className="featured-meta-dot"></span>
              <span>{featured.readTime} leitura</span>
            </div>
            <div className="featured-read">Ler artigo <span>→</span></div>
          </div>
        </Link>
      </section>}

      <section className="posts-grid">
        {rest.map((post) => (
          <Link to={`/artigos/${post.slug}`} className="post-card" key={post.slug}>
            <div className="post-card-img">
              <img src={getArticleImage(post.slug)} alt={post.title} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover'}} />
            </div>
            <div className="post-card-body">
              <div className="post-card-tag">{post.tag}</div>
              <h3 className="post-card-title">{post.title}</h3>
              <p className="post-card-excerpt">{post.excerpt}</p>
              <div className="post-card-meta">
                <span>{post.date}</span>
                <span className="featured-meta-dot"></span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {hasMore && (
        <div className="load-more">
          <button className="load-more-btn" onClick={() => setVisibleCount(prev => prev + POSTS_PER_PAGE)}>Carregar mais artigos</button>
        </div>
      )}

      <Footer type="blog" />
    </>
  );
};

export default BlogCuriosidades;
