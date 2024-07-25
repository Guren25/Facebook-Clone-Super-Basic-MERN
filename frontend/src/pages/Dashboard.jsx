import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import { fetchUsers } from '../features/users/usersSlice';
import Navbar from '../components/Navbar';
import Posts from '../components/Posts';
import AddPostModal from '../components/AddPostModal';
import './styles/Dashboard.css';

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
    <div className="dashboard">
      <div>
        <Navbar />
        <div className="button-container"><button className="add-post-button" onClick={() => setModalIsOpen(true)}>Upload a new post</button></div>
        <AddPostModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
      </div>
      <div>
        <Posts />
      </div>
    </div>
  );
};

export default Dashboard; 
