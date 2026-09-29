import React from 'react';
import {hydrateRoot, createRoot} from 'react-dom/client';
import App from './App.jsx';

const root=document.getElementById('root');
// Production HTML is prerendered at build time (scripts/prerender.mjs); dev serves an empty root.
if(root.hasChildNodes()) hydrateRoot(root,<App/>); else createRoot(root).render(<App/>);
