import React, { useState } from 'react';
import Modal from 'react-modal';
import Login from '../components/Login';
import AddUserForm from '../components/AddUserForm';

Modal.setAppElement('#root');

const LoginRegisterPage = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  return (
    <div>
      <button onClick={openLoginModal}>Login</button>
      <button onClick={openRegisterModal}>Register</button>

        <Modal
            isOpen={isLoginModalOpen}
            onRequestClose={closeLoginModal}
            contentLabel='Login'
        >
            <Login closeModal={closeLoginModal}/>
        </Modal>

        <Modal
            isOpen={isRegisterModalOpen}
            onRequestClose={closeRegisterModal}
            contentLabel='Register'
        >
            <AddUserForm closeModal={closeRegisterModal}/>
        </Modal>
    </div>
  );
};

export default LoginRegisterPage;
