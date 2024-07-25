import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../features/posts/postsSlice';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './styles/Posts.css';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <div className="post-header">
            <div className="post-user-info">
              <img src={`http://localhost:5000${post.user.imgUrl}`} alt={post.user.username} className="user-avatar" />
              <div>
                <h3>{post.user.name}</h3>
                <p>@{post.user.username}</p>
              </div>
            </div>
            <div className="post-actions">
              <Link to={`/edit/${post._id}`} className="edit-btn">
                <FaEdit />
              </Link>
              <button onClick={() => handleDelete(post._id)} className="delete-btn">
                <FaTrash />
              </button>
            </div>
          </div>
          <p className="post-description">{post.description}</p>
          <div className="post-images-container">
            <div className="post-images">
              {post.images.map((image, index) => (
                <img key={index} src={`http://localhost:5000/${image}`} alt="Post" className="post-image" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
