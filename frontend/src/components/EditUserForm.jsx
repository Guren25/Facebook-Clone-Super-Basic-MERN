import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../features/users/usersSlice';
import axios from 'axios';
import './styles/EditUserForm.css'; // Import the CSS file

const EditUserForm = ({ user, closeModal }) => { // Accept user as prop
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name || ''); // Initialize with user data
  const [username, setUsername] = useState(user.username || ''); // Initialize with user data
  const [password, setPassword] = useState(''); // Keep password empty for security
  const [showPassword, setShowPassword] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgPreview, setImgPreview] = useState(user.imgUrl ? `http://localhost:5000${user.imgUrl}` : ''); // Initialize with user data

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgUrl(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('password', password);
    if (imgUrl && typeof imgUrl !== 'string') {
      formData.append('imgUrl', imgUrl);
    }

    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the token in headers
    }

    try {
      await dispatch(editUser({ id: user.id, formData }));
      closeModal();
    } catch (error) {
      console.error('Error updating user:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User Information</h2>
      <div className="image-preview-container">
        {imgPreview ? (
          <img src={imgPreview} alt="Preview" className="image-preview" />
        ) : (
          <span>No Image</span>
        )}
      </div>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="input-group">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Email:
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Password:
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="checkbox-group">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            Show Password
          </label>
        </div>
        <div className="input-group">
          <label>
            Image:
            <input type="file" onChange={handleImageChange} />
          </label>
        </div>
        <div className="button-group">
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;