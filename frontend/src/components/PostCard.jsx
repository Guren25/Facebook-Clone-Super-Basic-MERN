// src/components/PostCard.jsx
import React from 'react';
import './PostCard.css'; // Ensure your CSS is correctly referenced

const PostCard = ({ post }) => {
  const user = post.user || {};
  const userName = user.name || 'Unknown';
  const userUsername = user.username || 'unknown';
  const userImgUrl = user.imgUrl ? `http://localhost:5000/${user.imgUrl}` : 'default-user-image-url'; // Update with your default image URL

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={userImgUrl} alt={userName} className="user-image" />
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <span className="user-username">@{userUsername}</span>
        </div>
      </div>
      <p className="post-description">{post.description}</p>
      <div className="post-images">
        {post.images.map((image, index) => (
          <img key={index} src={`http://localhost:5000/${image}`} alt={`Post image ${index + 1}`} className="post-image" />
        ))}
      </div>
      <span className="post-date">{new Date(post.date).toLocaleString()}</span>
    </div>
  );
};

export default PostCard;
