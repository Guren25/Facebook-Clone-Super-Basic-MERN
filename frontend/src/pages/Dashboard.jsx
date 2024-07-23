// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import AddPostModal from '../components/AddPostModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (postStatus === 'succeeded') {
    content = posts.map(post => (
      <PostCard key={post._id} post={post} />
    ));
  } else if (postStatus === 'failed') {
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
        color:'white'
      }} onClick={() => setModalIsOpen(true)}>+</button>
      <AddPostModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
      <div className="posts-container">
        {content}
      </div>
    </div>
  );
};

export default Dashboard;
