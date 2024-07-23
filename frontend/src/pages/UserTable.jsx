// src/pages/UserTable.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from '../features/users/usersSlice';
import Modal from 'react-modal';
import EditUserForm from '../components/EditUserForm';
import Navbar from '../components/Navbar';

Modal.setAppElement('#root');

const customModalStyles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '750px',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    backgroundColor: 'white',
    border: '2px solid black'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

const imageModalStyles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '500px',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    backgroundColor: 'white',
    border: '2px solid black'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);


  const openEditModal = (id) => {
    setEditUserId(id);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditUserId(null);
  };

  const openImageModal = (imgUrl) => {
    setSelectedImage(imgUrl);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage('');
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>ALL USER INFORMATION DATABASE</h1>
      {userStatus === 'loading' && <div>Loading...</div>}
      {userStatus === 'succeeded' && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>
                  <img
                    src={`http://localhost:5000${user.imgUrl}`}
                    alt={user.name}
                    onClick={() => openImageModal(`http://localhost:5000${user.imgUrl}`)}
                    style={{ width: '100px', height: '100px' }}
                  />
                </td>
                <td>
                  <button onClick={() => openEditModal(user._id)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {userStatus === 'failed' && <div>{error}</div>}

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit User Modal"
        style={customModalStyles}
      >
        {editUserId && <EditUserForm userId={editUserId} closeModal={closeEditModal} />}
      </Modal>

      <Modal
        isOpen={isImageModalOpen}
        onRequestClose={closeImageModal}
        contentLabel="Image Modal"
        style={imageModalStyles}
      >
        <img src={selectedImage} alt="User" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Modal>
    </div>
  );
};

export default UserTable;
