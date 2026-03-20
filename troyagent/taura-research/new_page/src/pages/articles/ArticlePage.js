import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleBySlug } from '../../data/articles';
import ArticleLayout from '../../components/ArticleLayout';

const ArticlePage = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return <div style={{padding:'200px 48px',color:'var(--dim)',fontFamily:'var(--font-m)',fontSize:'12px',letterSpacing:'0.2em',textTransform:'uppercase'}}>Artigo não encontrado</div>;
  }

  return <ArticleLayout article={article} />;
};

export default ArticlePage;
