import { createElement } from 'react';

import { createRoot } from 'react-dom/client';

import App from './Router';
import '../../common/sentry';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);
const router = createElement(App);
root.render(router);
