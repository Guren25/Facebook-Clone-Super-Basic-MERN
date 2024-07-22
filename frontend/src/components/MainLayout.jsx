import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname === '/usertable' || location.pathname === '/dashboard';

  return (
    <>
      {showNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
