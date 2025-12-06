import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import 'react-datepicker/dist/react-datepicker.css';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ExperiencesCarousell from './components/ExperiencesCarousell';
import SearchResultsPage from './pages/SearchResultPage'; // Make sure to import this
import DetailPage from './pages/DetailPage';
import BookingPage from './pages/BookingPage';
import ProtectedRoute from './components/ProtectedRoute';
import LoginModal from './components/LoginModal';

// You can create a simple HomePage component to keep your code clean
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ExperiencesCarousell />
    </>
  );
};

const App = () => {
  return (
    
      <AuthProvider>
        {/* The Header is outside of <Routes>, so it will appear on every page */}
        <Header />
        
        {/* The <Routes> component will swap between your pages */}
        <Routes>
          {/* When the URL is "/", show the HomePage component */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginModal />} />

          {/* When the URL is "/search", show the SearchResultsPage component */}
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/hotels/:id" element={<DetailPage />} />
          <Route path="/bookings" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    
  );
};

export default App;