import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
    }
  }, []);

  const handleLogout = () => {
    setUser({});
    setEmail('');
    setPassword('');
    localStorage.clear();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email: email, password: password };

    const response = await axios({
      url: '/api/login',
      method: 'post',
      data: user,
    });

    console.log(response.data);

    if (response.data.token == 1234) {
      setUser(response.data);
      console.log(user);
      localStorage.setItem('user', JSON.stringify(response.data));
    } else {
      toast.error('Invalid username or password');
    }
  };

  if (user) {
    return (
      <div>
        <Route exact path="/login">
          <Redirect to="/dashboard" />
        </Route>
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }

  return (
    <div className="user-login">
      <header className="user__header">
        <h1 className="user__title">Login</h1>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="form__input"
            required
          />
        </div>

        <div className="form__group">
          <input
            type="password"
            name="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="form__input"
            required
          />
        </div>

        <button className="btn btn-lg btn-secondary" id="log-in-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
