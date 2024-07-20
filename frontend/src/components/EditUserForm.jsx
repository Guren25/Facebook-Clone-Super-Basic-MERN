import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserForm = ({ userId, closeModal, updateUsers }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

    try {
      const res = await axios.put(`http://localhost:5000/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('User updated successfully:', res.data);
      closeModal();
      updateUsers();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  return(
    <div>
      <h2>Add User Information</h2>
        <div>
          <div style={{ 
            width: '200px', 
            height: '200px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginTop: '2px', 
            marginBottom: '5px',
            border: '1px solid black'
          }}>
          {imgPreview ? (
          <img src={imgPreview} alt="Preview" 
            style={{ 
            maxHeight: '100%', 
            maxWidth: '100%'
          }} 
          />
          ) : (
            <span>No Image</span>
          )}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></label>
          </div>
          <div>
            <label>Username: <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} required /></label>
          </div>
          <div>
            <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
          </div>
          <div>
            <label>Image: <input type="file" onChange={handleImageChange} /></label>
          </div>
          <div>
            <button type="submit">Save Changes</button>
            </div>
        </form>
    </div>
  );
};

export default EditUserForm;