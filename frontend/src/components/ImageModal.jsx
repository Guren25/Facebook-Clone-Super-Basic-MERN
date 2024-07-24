import React from 'react';
import './ImageModal.css';

const ImageModal = ({ image, closeModal, nextImage, prevImage }) => {
  return (
    <div className="image-modal">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <button className="prev-button" onClick={prevImage}>
          &lt;
        </button>
        <img src={image} alt="Modal View" className="modal-image" />
        <button className="next-button" onClick={nextImage}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
