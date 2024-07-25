// src/App.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserTable from './pages/UserTable';
import LoginRegisterPage from './pages/LoginRegisterPage';
import Dashboard from './pages/Dashboard';
import Posts from './components/Posts';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/loginregister" element={<LoginRegisterPage />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Dashboard />
          ) : (
            <Navigate to="/loginregister" />
          )
        }
      />
      <Route
        path="/usertable"
        element={
          isAuthenticated ? (
            <UserTable />
          ) : (
            <Navigate to="/loginregister" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/loginregister" />} />
    </Routes>
  );
};

export default App;
