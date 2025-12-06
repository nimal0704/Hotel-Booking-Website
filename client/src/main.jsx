import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import { LoginModalProvider, useLoginModal } from './context/LoginModalContext'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
   <React.StrictMode>
    <Router>
      <AuthProvider>
          <LoginModalProvider>
            <App />
          </LoginModalProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
