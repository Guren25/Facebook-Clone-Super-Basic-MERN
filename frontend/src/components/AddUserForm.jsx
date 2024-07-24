import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/users/usersSlice';
import './styles/AddUserForm.css';

const AddUserForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [imgUrl, setImgUrl] = useState(null);
  const [imgPreview, setImgPreview] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    formData.append('imgUrl', imgUrl);

    await dispatch(addUser(formData));
    closeModal();
  };

  return (
    <div className="add-user-container">
      <h2>Register New User</h2>
      <div className="image-preview-container">
        {imgPreview ? (
          <img src={imgPreview} alt="Preview" className="image-preview" />
        ) : (
          <span>No Image</span>
        )}
      </div>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="input-group">
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
        </div>
        <div className="input-group">
          <label>
            Username:
            <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} required />
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
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
        </div>
        <div className="input-group">
          <label>
            Image:
            <input type="file" onChange={handleImageChange} required />
          </label>
        </div>
        <div className="button-group">
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
