import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPeptideBySlug } from '../../data/peptides';
import ProductLayout from '../../components/ProductLayout';

const ProductPage = () => {
  const { slug } = useParams();
  const peptide = getPeptideBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!peptide) {
    return <div style={{padding:'200px 48px',color:'var(--dim)',fontFamily:'var(--font-m)',fontSize:'12px',letterSpacing:'0.2em',textTransform:'uppercase'}}>Produto não encontrado</div>;
  }

  return <ProductLayout peptide={peptide} />;
};

export default ProductPage;
