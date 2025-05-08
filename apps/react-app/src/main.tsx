import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { injectTokenToCSS, palette, sizes } from '@common/styles';

injectTokenToCSS(palette);
injectTokenToCSS(sizes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
