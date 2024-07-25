import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import Login from '../components/Login';
import AddUserForm from '../components/AddUserForm';
import './styles/LoginRegisterPage.css';
import Shrekdit from '../assets/Shrekdit.png'; 

const LoginRegisterPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Container className="main-container">
      <Row className='sub-container justify-content-center'>
        <Col className="logo-container" md="auto">
            <img src={Shrekdit} alt="Logo" />
        </Col>
        <Col md="auto" className="text-center">
          <h2>Welcome to Shrekdit</h2>
          <Button 
            onClick={() => setShowLogin(true)} 
            style={{ backgroundColor: '#28a745', borderColor: '#28a745', marginRight: '10px' }}
          >
            Login
          </Button>
          <Button 
            onClick={() => setShowRegister(true)} 
            style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
          >
            Register
          </Button>
        </Col>
        
        <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
          <Modal.Body>
            <Login closeModal={() => setShowLogin(false)} />
          </Modal.Body>
        </Modal>

        <Modal show={showRegister} onHide={() => setShowRegister(false)} centered>
          <Modal.Body>
            <AddUserForm closeModal={() => setShowRegister(false)} />
          </Modal.Body>
        </Modal>
      </Row>
    </Container>
  );
};

export default LoginRegisterPage;