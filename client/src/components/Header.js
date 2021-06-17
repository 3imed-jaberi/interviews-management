import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { isAuthenticated } from '../utils/is-auth.util';

export default function Header({ logout }) {
  const [isAuth, setIsAuth] = useState()

  useEffect(() => {
    setIsAuth(isAuthenticated())
  }, [])

  function renderUser() {
    const userData = localStorage.getItem('user-payload')
    if (!userData) {
      return (<i className="fas fa-spinner fa-spin" />)
    }

    return (
      <span>
        Hello {userData.username},&nbsp;
        <button className="btn btn-link btn-sm" href="#" onClick={logout}>Logout</button>
      </span>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* <Link to="/" className="navbar-brand"> React Blog </Link> */}

      <ul className="navbar-nav mr-auto">
        {
          !isAuth &&
          (
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          )
        }
        {
          isAuth &&
          (
            <li className="nav-item">
              <Link to="/offer-form" className="nav-link">
                Add New
              </Link>
            </li>
          )
        }
      </ul>

      <span className="navbar-text">
        {
          isAuth
            ? renderUser()
            : <Link to="/login">Sign-in</Link>
        }
      </span>
    </nav>
  );
}
