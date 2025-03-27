import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/store";
import { Link } from "react-router-dom";
import { FaRegStickyNote } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import "../App.css";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  return (
    <header className="HeaderTitle">
      <div className="header-left">
        <FaRegStickyNote className="note-icon" size={35} color="white" />
        <span className="HeaderTitleText">NoteBox</span>
      </div>
      <nav className={`header-right ${menuOpen ? "open" : ""}`}>
        {isAuthenticated ? (
          <button className="auth-btn login-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link className="auth-btn login-btn" to="/login">
              Login
            </Link>
            <Link className="auth-btn register-btn" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={25} color="white" /> : <FaBars size={25} color="white" />}
      </button>
    </header>
  );
};

export default Header;
