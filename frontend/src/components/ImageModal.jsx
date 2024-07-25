import React from 'react';
import Modal from 'react-modal';

const ImageModal = ({ isOpen, onRequestClose, images }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Image Gallery">
      <button onClick={onRequestClose}>Close</button>
      <div className="image-gallery">
        {images.map((src, index) => (
          <img key={index} src={`http://localhost:5000/${src}`} alt={`Post ${index}`} className="modal-image" />
        ))}
      </div>
    </Modal>
  );
};

export default ImageModal;