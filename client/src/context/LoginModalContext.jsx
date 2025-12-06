// src/context/LoginModalContext.jsx
import React, { createContext, useContext, useState } from 'react';
import LoginModal from '../components/LoginModal'; // Adjust the path if needed

const LoginModalContext = createContext();

export const LoginModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <LoginModalContext.Provider value={{ openModal }}>
      {children}
      {/* The modal is always rendered here, but hidden. 
        The context controls its 'isOpen' state.
      */}
      <LoginModal isOpen={isOpen} onClose={closeModal} />
    </LoginModalContext.Provider>
  );
};

// Custom hook to easily access the openModal function
export const useLoginModal = () => {
  return useContext(LoginModalContext);
};