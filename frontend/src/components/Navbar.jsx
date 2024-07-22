import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/users/authSlice';
import './Navbar.css'; // Create a CSS file for Navbar styles

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/loginregister');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        {user && (
          <>
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
          </>
        )}
        <div className="navbar-links">
          <button onClick={() => navigate('/usertable')}>User Table</button>
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
