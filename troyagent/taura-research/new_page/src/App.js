import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Landing from './pages/Landing';
import Blog from './pages/Blog';
import BlogCuriosidades from './pages/BlogCuriosidades';
import ArticlePage from './pages/articles/ArticlePage';
import ProductPage from './pages/products/ProductPage';
import './styles/global.css';
import './styles/articles.css';
import './styles/products.css';

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/curiosidades" element={<BlogCuriosidades />} />
          <Route path="/artigos/:slug" element={<ArticlePage />} />
          <Route path="/produtos/:slug" element={<ProductPage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
