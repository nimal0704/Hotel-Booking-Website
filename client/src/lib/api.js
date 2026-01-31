/**
 * API base URL for backend.
 * - Local: create client/.env with VITE_BACKEND_URL=http://localhost:3000
 * - Production (Render): set VITE_BACKEND_URL in Render Dashboard → Frontend → Environment
 * Vite only reads .env at build/dev start — restart dev server after changing .env
 */
const raw = import.meta.env.VITE_BACKEND_URL;
const API_BASE_URL = (typeof raw === 'string' && raw.trim() !== '') ? raw.trim().replace(/\/$/, '') : 'http://localhost:3000';

if (import.meta.env.DEV) {
  console.log('[API] Backend URL:', API_BASE_URL);
}

export { API_BASE_URL };
