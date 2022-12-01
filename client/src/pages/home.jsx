import React from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/home.css';
// Pages

const homePage = () => {
  return (
    <div className="home-body" id="box_home">
      <div className="boxed-stuff">
        <div className="text">
          <h1 className="cover-heading">Roomates</h1>
          <p className="lead">Bringing students together.</p>
        </div>

        <Link to="/login">
          <button type="button" className="btn btn-lg btn-secondary" id="home-btn">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button type="button" className="btn btn-lg btn-secondary" id="home-btn">
            Register
          </button>
        </Link>
      </div>

      <footer className="mastfoot mt-auto">
        <div className="inner"></div>
      </footer>
    </div>
  );
};
export default homePage;
