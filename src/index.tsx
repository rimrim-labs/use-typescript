import React from 'react';
import { createRoot } from 'react-dom/client';
import Menu from './react/jsx/Menu';
import data from './react/jsx/data/recipes';

const container = document.getElementById('react-container');
const root = createRoot(container!);
root.render(<Menu recipes={data} title="맛있는 조리법" />);
