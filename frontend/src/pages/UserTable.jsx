import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import AddUserForm from '../components/AddUserForm';
import EditUserForm from '../components/EditUserForm';

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
    const [users, setUsers] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
        const res = await axios.get('http://localhost:5000/users');
        setUsers(res.data);
        } catch (err) {
        console.error('Error fetching users:', err);
        }
    };

    const openAddModal = () => {
        setAddModalOpen(true);
    };

    const closeAddModal = () => {
        setAddModalOpen(false);
    };

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

    const updateUsers = async () => {
        await fetchUsers();
    };

    const handleDelete = async (id) => {
        try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        console.log("Deleted a user");
        setUsers(users.filter(user => user._id !== id));
        } catch (err) {
        console.error('Error deleting user:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div>
        <h1>ALL USER INFORMATION DATABASE</h1>
        <button onClick={openAddModal}>Add a User</button>
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
                        <td><img 
                            src={`http://localhost:5000${user.imgUrl}`}
                            alt={user.name}
                            onClick={() => openImageModal(`http://localhost:5000${user.imgUrl}`)}
                            style={{width: '100px', height: '100px'}}/>
                        </td>
                        <td>
                            <button onClick={() => openEditModal(user._id)}>Edit</button>
                            <button onClick={() => handleDelete(user._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Add User Modal */}
        <Modal
            isOpen={isAddModalOpen}
            onRequestClose={closeAddModal}
            contentLabel="Add User Modal"
            style={customModalStyles} //we can make this into a separate css
        >
            <AddUserForm updateUsers={updateUsers} closeModal={closeAddModal}/>
        </Modal>
        
        {/* Edit User Modal */}
        <Modal
            isOpen={isEditModalOpen}
            onRequestClose={closeEditModal}
            contentLabel="Edit User Modal"
            style={customModalStyles}
        >
            {editUserId && <EditUserForm userId={editUserId} closeModal={closeEditModal} updateUsers={updateUsers} />}
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