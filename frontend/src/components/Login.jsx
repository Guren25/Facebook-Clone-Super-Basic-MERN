import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/users/authSlice';

const Login = ({ closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ username, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/userTable');
      console.log("Account is successfully logged in");
    } else {
      console.error(result.error.message || 'Wrong credentials');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <label>
            Username:
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
