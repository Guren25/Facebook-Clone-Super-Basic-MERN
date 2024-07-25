import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/users/authSlice';
import { Navbar, Nav, NavDropdown, Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Navbar.css';

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/loginregister');
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg" className="navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
        </Nav>
        {user && (
          <Nav className="ml-auto">
            <NavDropdown
              title={<><span className="navbar-user-name">{user.name}</span> <Image src={`http://localhost:5000${user.imgUrl}`} roundedCircle className="navbar-user-img" /></>}
              id="basic-nav-dropdown"
              align="end"
              show={dropdownOpen}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <NavDropdown.Item as="button" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
