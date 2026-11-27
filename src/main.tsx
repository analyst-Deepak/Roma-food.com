import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { preloadAllProductImages } from './utils/preloadImages';

// Immediately preload all 27 product images into browser memory cache for 0ms instant switching
preloadAllProductImages();

createRoot(document.getElementById('root')!).render(<App />);
