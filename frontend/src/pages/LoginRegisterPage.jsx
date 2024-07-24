import React, { useState } from 'react';
import Modal from 'react-modal';
import Login from '../components/Login';
import AddUserForm from '../components/AddUserForm';
import './styles/LoginRegisterPage.css';
import FacePolLogo from '../assets/FacePolLogo.jpg'; 

Modal.setAppElement('#root');

const LoginFormStyle = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '450px',
    height: '400px',
    padding: '20px',
    borderRadius: '20px',
    border: '2px solid black',
    background: '#2d69e1',
    boxShadow:  '5px 5px 0px #204a9e',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

const RegisterFormStyle = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '450px',
    height: '850x',
    padding: '20px',
    borderRadius: '20px',
    border: '2px solid black',
    background: '#2d69e1',
    boxShadow:  '5px 5px 0px #204a9e',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

const LoginRegisterPage = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  return (
    <div className="main-container">
      <div className='sub-container'>
        <div className="logo-container">
            <img src={FacePolLogo} alt="Logo" />
        </div>
        <div>
          <button onClick={openLoginModal}>Login</button>
          <button onClick={openRegisterModal}>Register</button>
        </div>
        
        <Modal
          isOpen={isLoginModalOpen}
          onRequestClose={closeLoginModal}
          style={LoginFormStyle}
          contentLabel='Login'
        >
          <Login closeModal={closeLoginModal}/>
        </Modal>

        <Modal
          isOpen={isRegisterModalOpen}
          onRequestClose={closeRegisterModal}
          style={RegisterFormStyle}
          contentLabel='Register'
        >
          <AddUserForm closeModal={closeRegisterModal}/>
        </Modal>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
