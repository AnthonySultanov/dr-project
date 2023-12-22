import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';


export const Loginpage = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setLoggedIn(true);
        // Redirect to home page
        navigate('/home');
      }
      
      
    } catch (error) {
      setError('Invalid email or password');
    }
  }

  if (loggedIn) {
    return <Navigate to='/home' />;
  }

  return (
    <div className="login-page">
      <div className="form">
        <h1>Login</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
          </div>
          <button type='submit'>Login</button>
        </form>
        <p>Don't have an account? <Link to='/signIn'>Sign up here</Link></p>
      </div>
    </div>
  );
};
