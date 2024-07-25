import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../features/posts/postsSlice';
import { Link } from 'react-router-dom';

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
    <div className="posts">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <div className="post-header">
            <img src={post.user.imgUrl} alt={post.user.username} className="user-avatar" />
            <div className="post-user-info">
              <h3>{post.user.name}</h3>
              <p>@{post.user.username}</p>
            </div>
          </div>
          <p>{post.description}</p>
          <div className="post-images">
            {post.images.map((image, index) => (
              <img key={index} src={`http://localhost:5000/${image}`} alt="Post" className="post-image" />
            ))}
          </div>
          <div className="post-actions">
            <Link to={`/edit/${post._id}`} className="edit-btn">Edit</Link>
            <button onClick={() => handleDelete(post._id)} className="delete-btn">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
