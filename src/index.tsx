import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './react/state/App';

const container = document.getElementById('react-container');
const root = createRoot(container!);
root.render(<App totalStars={5} />);
