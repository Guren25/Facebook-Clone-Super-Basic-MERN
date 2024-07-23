// src/components/AddPostModal.jsx
import React from 'react';
import Modal from 'react-modal';
import AddPostForm from './AddPostForm';

const AddPostModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add Post">
      <AddPostForm closeModal={onRequestClose} />
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default AddPostModal;
