// src/components/Navbar.jsx
import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/users/authSlice';
import './Navbar.css';

const Navbar = () => {
  const [isSolid] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/loginregister');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className={isSolid ? 'solid' : 'transparent'}>
      <nav className='navbar'>
        <Link to="/dashboard" className="logo">
          <img src="src/assets/FacePolLogo.jpg" alt="Logo" />
        </Link>
        <ul className='nav-links'>
          <li><Link to="/usertable">User Database</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
        {user && (
          <div className="navbar-user-section">
            <span className="navbar-user-name">{user.name}</span>
            <div className="navbar-user-img-container" onClick={toggleDropdown}>
              <img
                src={`http://localhost:5000${user.imgUrl}`}
                alt={user.name}
                className="navbar-user-img"
              />
              {dropdownOpen && (
                <div className="navbar-dropdown">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
