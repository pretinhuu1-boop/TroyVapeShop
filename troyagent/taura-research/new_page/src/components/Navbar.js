import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getWhatsAppURL } from '../utils/whatsapp';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <nav>
        <Link to="/" className="nav-logo" onClick={closeMenu}>TAURA<span>.</span></Link>

        {/* Desktop links */}
        <div className="nav-links">
          <Link to="/blog" className={isActive('/blog')}>Catálogo</Link>
          <Link to="/blog/curiosidades" className={isActive('/blog/curiosidades')}>Blog</Link>
          <Link to="/" className={isActive('/')}>Sobre</Link>
          <a href={getWhatsAppURL()} className="nav-cta" target="_blank" rel="noopener noreferrer">Acesso</a>
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile menu overlay — clicking the backdrop closes */}
      {menuOpen && (
        <div className="mobile-menu open" onClick={closeMenu}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <Link to="/blog" className={isActive('/blog')} onClick={closeMenu}>Catálogo</Link>
            <Link to="/blog/curiosidades" className={isActive('/blog/curiosidades')} onClick={closeMenu}>Blog</Link>
            <Link to="/" className={isActive('/')} onClick={closeMenu}>Sobre</Link>
            <a href={getWhatsAppURL()} className="nav-cta" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Acesso</a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
