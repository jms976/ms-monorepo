import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { injectTokenToCSS, palette, sizes, space } from '@common/styles';

injectTokenToCSS(palette);
injectTokenToCSS(sizes);
injectTokenToCSS(space);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
