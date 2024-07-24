import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../features/users/usersSlice';
import axios from 'axios';
import './styles/EditUserForm.css'; // Import the CSS file

const EditUserForm = ({ userId, closeModal }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgPreview, setImgPreview] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${userId}`);
        setName(res.data.name);
        setUsername(res.data.username);
        setPassword(res.data.password);
        setImgUrl(res.data.imgUrl);
        setImgPreview(`http://localhost:5000${res.data.imgUrl}`);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, [userId]);

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

    await dispatch(editUser({ id: userId, formData }));
    closeModal();
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
            Username:
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
