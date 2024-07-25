import React, { useState } from 'react';
import './styles/PostCard.css';
import ImageModal from './ImageModal';
import { useDispatch } from 'react-redux';
import { deletePost } from '../features/posts/postsSlice';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const user = post.user || {};
  const userName = user.name || 'Unknown';
  const userUsername = user.username || 'unknown';
  const userImgUrl = user.imgUrl ? `http://localhost:5000${user.imgUrl}` : 'src/assets/Logo.png';

  const openModal = (index) => {
    setSelectedImage(post.images[index]);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % post.images.length);
    setSelectedImage(post.images[(currentIndex + 1) % post.images.length]);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + post.images.length) % post.images.length);
    setSelectedImage(post.images[(currentIndex - 1 + post.images.length) % post.images.length]);
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  const imageCount = post.images.length;
  const displayedImages = imageCount > 4 ? post.images.slice(0, 3) : post.images;

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={userImgUrl} alt={userName} className="user-image" />
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <span className="user-username">{userUsername}</span>
        </div>
      </div>
      <p className="post-description">{post.description}</p>
      <div className={`post-images ${imageCount > 3 ? 'post-images-4' : `post-images-${displayedImages.length}`}`}>
        {displayedImages.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000/${image}`}
            alt={`Post image ${index + 1}`}
            className="post-image"
            onClick={() => openModal(index)}
          />
        ))}
        {imageCount > 4 && (
          <div className="post-image more-images" onClick={() => openModal(3)}>
            +{imageCount - 3}
          </div>
        )}
      </div>
      <span className="post-date">{new Date(post.date).toLocaleString()}</span>

      {selectedImage && (
        <ImageModal
          image={`http://localhost:5000/${selectedImage}`}
          closeModal={closeModal}
          nextImage={nextImage}
          prevImage={prevImage}
        />
      )}
      <div>
        <h5 onClick={handleDelete} 
          style={{
            color: 'gray',
            cursor: 'pointer'
          }}>Delete post</h5>
      </div>
    </div>
  );
};

export default PostCard;
