import { db } from './firebase.js';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
console.log('Firebase DB:', db);


// Ensure the root element exists before rendering
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(<App />);
