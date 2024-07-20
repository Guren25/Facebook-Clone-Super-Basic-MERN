import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = ({ updateUsers, closeModal }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [imgUrl, setImgUrl] = useState(null);
    const [imgPreview, setImgPreview] = useState('');

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

        try {
            const res = await axios.post('http://localhost:5000/users', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            console.log('User added successfully:', res.data);
            closeModal();
            updateUsers();
            } catch (err) {
                console.error('Error adding user:', err);
            }
    };
    
    return (
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
                <div className='img-only'>
                    <label>Image: <input type="file" onChange={handleImageChange} required /></label>
                </div>
                <div className='buttons-only'>
                    <button type="submit">Add User</button>
                </div>
            </form>
        </div>
    );
};

export default AddUserForm;