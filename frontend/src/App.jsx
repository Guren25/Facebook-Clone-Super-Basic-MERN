import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserTable from './pages/UserTable';
import LoginRegisterPage from './pages/LoginRegisterPage';
import Dashboard from './pages/Dashboard'; // Assume you will create this page later on
import MainLayout from './components/MainLayout';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/loginregister" element={<LoginRegisterPage />} />
        <Route
          path="/usertable"
          element={
            isAuthenticated ? (
              <MainLayout>
                <UserTable />
              </MainLayout>
            ) : (
              <Navigate to="/loginregister" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <MainLayout>
                <Dashboard />
              </MainLayout>
            ) : (
              <Navigate to="/loginregister" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/loginregister" />} />
      </Routes>
    </Router>
  );
};

export default App;
