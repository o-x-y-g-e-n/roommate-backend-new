import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

toast.configure();

function RegistrationScreen() {
  //<Link to="/roomKeyPage"></Link>
  // initial state to set state
  const [email, setEmail] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [landlord, setLandlord] = useState(false);

  const handleLogout = () => {
    setUser({});
    setEmail('');
    localStorage.clear();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`
      firstName: ${firstName}
      lastName: ${lastName}
      Email: ${email}
      Password: ${password}
      Landlord: ${landlord}
    `);

    const payload = {
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: lastName,
      Email: email,
      Password: password,
      Landlord: landlord,
      rentPaid: false,
    };

    const response = await axios({
      url: '/api/register',
      method: 'post',
      data: payload,
    });

    console.log(response);

    if (response.data.token == 1234) {
      console.log(response.data.token);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(payload));
      if (landlord === true) {
        handleLogout();
      }
      console.log('redirect');
    } else if (response.data.token == 4321) {
      console.log(response.data.token);
      toast.error('Oops, that email already exists!');
    }
  };

  if (user) {
    if (landlord === true) {
      return <Redirect to="/login"></Redirect>;
    } else {
      return <Redirect to="/roomKeyPage"></Redirect>;
    }
  }

  return (
    <div className="user-reg">
      <header className="user__header">
        <h1 className="user__title">Registration</h1>
      </header>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <input
            type="text"
            name="fName"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            placeholder="First Name"
            className="form__input"
          />
        </div>

        <div className="form__group">
          <input
            type="text"
            name="lName"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            placeholder="Last Name"
            className="form__input"
          />
        </div>

        <div className="form__group">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="form__input"
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
          />
        </div>

        <Form.Check
          type="checkbox"
          label="Are you a landlord?"
          defaultChecked={false}
          checked={landlord}
          onChange={() => setLandlord(!landlord)}
        />

        <button
          className="btn btn-lg btn-secondary"
          id="log-in-btn"
          type="submit"
        >
          Register
        </button>
      </form>
      <h1 className="back-to-login">
        Click <Link to="/login"> here </Link> to login to your account{' '}
      </h1>
    </div>
  );
}

export default RegistrationScreen;
