import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";
import BasicMenu from "./Popup";
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="container">
        <Link to="/">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
        </Link>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>Science</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>Technology</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>Cinema</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>Design</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>Food</h6>
          </Link>

          {currentUser ? (
            <BasicMenu
              title={
                <span style={{ textTransform: "capitalize" }}>
                  {currentUser?.username}
                </span>
              }
            />
          ) : (
            <></>
          )}
          {currentUser ? (
            <Link className="link" to="/">
              <span onClick={logout}>Logout</span>
            </Link>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <Link className="link" to="write">
            <span className="write">Write</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
