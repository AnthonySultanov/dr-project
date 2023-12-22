
import React, { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';


export class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signedUp: false,
      error: ''
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        email: this.state.email,
        password: this.state.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        this.setState({ signedUp: true });
        // redirect to home page
        return <Navigate to='/' />;
      }
    } catch (error) {
      this.setState({ error: 'Unable to sign up' });
    }
  }

  render() {
    const { email, password, signedUp, error } = this.state;

    if (signedUp) {
      return <Navigate to='/' />;
    }

    return (
      <div className="signup-page">
        <div className="form">
          <h1>Sign up</h1>
          {error && <div className="error">{error}</div>}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type='email' onChange={(e) => this.setState({ email: e.target.value })} value={email} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type='password' onChange={(e) => this.setState({ password: e.target.value })} value={password} required />
            </div>
            <button type='submit'>Sign up</button>
          </form>
          <p>Already have an account? <Link to='/loginpage'>Log in here</Link></p>
        </div>
      </div>
    );
  }
}

export default SignupPage;
