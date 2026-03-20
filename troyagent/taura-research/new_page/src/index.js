import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initSecurityShield } from './security/SecurityShield';

// Initialize security before rendering
initSecurityShield();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
