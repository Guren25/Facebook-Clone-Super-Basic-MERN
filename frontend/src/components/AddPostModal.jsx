// src/components/AddPostModal.jsx
import React from 'react';
import Modal from 'react-modal';
import AddPostForm from './AddPostForm';

const AddPostModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add Post">
      <button onClick={onRequestClose}>X</button>
      <AddPostForm closeModal={onRequestClose} />
    </Modal>
  );
};

export default AddPostModal;
