import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './login.css';

function Login() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/register', {
        username: userData.username,
        password: userData.password,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error during registration:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/login', {
        username: userData.username,
        password: userData.password,
      });
      if (response.data) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <div className="auth-main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form onSubmit={handleSignUp}>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input type="text" name="username" placeholder="User name" required onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Password" required onChange={handleInputChange} />
            <button type="submit">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input type="text" name="username" placeholder="Username" required onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Password" required onChange={handleInputChange} />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
