import React from 'react';
import { getWhatsAppURL } from '../utils/whatsapp';

const Footer = ({ type = 'catalog' }) => {
  if (type === 'blog') {
    return (
      <footer className="footer-blog">
        <div className="footer-cta-block">
          <a href={getWhatsAppURL()} className="footer-cta-link" target="_blank" rel="noopener noreferrer">Mais Informações →</a>
        </div>
        <div className="footer-bottom">
          <div className="footer-brand">TAURA RESEARCH</div>
          <div className="footer-note">
            Conteúdo informativo baseado em literatura científica revisada por pares.<br/>
            Nenhuma informação aqui constitui aconselhamento médico ou recomendação de uso.
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer-catalog">
      <div className="footer-cta-block">
        <a href={getWhatsAppURL()} className="footer-cta-link" target="_blank" rel="noopener noreferrer">Mais Informações →</a>
      </div>
      <div className="footer-bottom">
        <div className="footer-brand">TAURA RESEARCH</div>
        <div className="footer-disclaimer">
          Todos os compostos são destinados exclusivamente a fins de pesquisa.<br/>
          Não se destinam a uso humano, diagnóstico ou tratamento de doenças.<br/>
          COA disponível por lote mediante solicitação.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
