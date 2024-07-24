// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import { fetchUsers } from '../features/users/usersSlice';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import AddPostModal from '../components/AddPostModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const postStatus = useSelector(state => state.posts.status);
  const userStatus = useSelector(state => state.users.status);
  const error = useSelector(state => state.posts.error);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [postStatus, userStatus, dispatch]);

  let content;

  if (postStatus === 'loading' || userStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (postStatus === 'succeeded' && userStatus === 'succeeded') {
    content = posts.map(post => (
      <PostCard key={post._id} post={post} />
    ));
  } else if (postStatus === 'failed' || userStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <Navbar />
      <button style={{
        height: '40px',
        width: '40px',
        margin: '10px',
        borderRadius: '70%',
        backgroundColor: 'green',
        border:'none',
        color:'white',
        fontSize: '20px'
      }} onClick={() => setModalIsOpen(true)}>+</button>
      <AddPostModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
      <div className="posts-container">
        {content}
      </div>
    </div>
  );
};

export default Dashboard;
