import React from 'react';
import { useSelector } from 'react-redux';
import UserTable from './pages/UserTable';
import LoginRegisterPage from './pages/LoginRegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      {isAuthenticated}
      <Routes>
        <Route path="/" element={<LoginRegisterPage />} />
        <Route path="/userTable" element={<UserTable />} />
      </Routes>
    </Router>
  );
}

export default App;
