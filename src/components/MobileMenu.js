import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertService from "../services/AlertServices";
import { logoutUser } from "../api";
import "../assets/css/MobileMenu.css";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  // User info
  const [profileName, setProfileName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileID, setProfileID] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setProfileName(localStorage.getItem("profileName") || "");
    setProfilePhoto(localStorage.getItem("profilePhoto") || "");
    setProfileID(localStorage.getItem("profileID") || "");
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.warn("Logout error:", err.message);
    } finally {
      setOpen(false);
      AlertService.showSuccessAndRedirect("Logout successful", navigate, "/");
      window.location.href = "/"; // Full page reload ensures states reset
    }
  };
  return (
    <>
      {/* Mobile menu icon */}
      <div className="mob-menu-btn" onClick={() => setOpen(true)}>
        <img src={`${process.env.PUBLIC_URL}/images/icon/menu.svg`} alt="" />
      </div>

      {/* Backdrop */}
      {open && <div className="mm-overlay" onClick={() => setOpen(false)} />}

      {/* Slide menu panel */}
      <div className={`mm-panel ${open ? "mm-open" : ""}`}>
        <div className="mm-close" onClick={() => setOpen(false)}>
          <img
            src={`${process.env.PUBLIC_URL}/images/icon/close.svg`}
            alt="close"
          />
        </div>

        <div className="mm-content">
          {/* If user logged in → show user profile */}
          {profileName && (
            <div className="mm-user-box">
              <img
                src={
                  profilePhoto
                    ? profilePhoto
                    : `${process.env.PUBLIC_URL}/images/default.png`
                }
                alt="User"
              />
              <div>
                <h4>{profileName}</h4>
              </div>
            </div>
          )}

          {/* EXPLORE */}
          <h4 className="mm-title">
            <i className="fa fa-globe"></i> EXPLORE CATEGORY
          </h4>

          <ul className="mm-list">
            <li>
              <Link to="/all-profiles" onClick={() => setOpen(false)}>
                All Profiles
              </Link>
            </li>
            <li>
              <Link to="/couple-stories" onClick={() => setOpen(false)}>
                Couple Stories
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={() => setOpen(false)}>
                All Services
              </Link>
            </li>

            {!profileName && (
              <li>
                <Link to="/sign-up" onClick={() => setOpen(false)}>
                  Join Now
                </Link>
              </li>
            )}
          </ul>

          {/* All Pages */}
          <h4 className="mm-title">
            <i className="fa fa-align-center"></i> All Pages
          </h4>

          <ul className="mm-list">
            <li>
              <Link to="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>

            {!profileName && (
              <>
                <li>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/sign-up" onClick={() => setOpen(false)}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Dashboard when logged in */}
          {profileName && (
            <>
              <h4 className="mm-title">
                <i className="fa fa-user"></i> Dashboard
              </h4>

              <ul className="mm-list">
                <li>
                  <Link
                    to={`/user-profile/${profileID}`}
                    onClick={() => setOpen(false)}
                  >
                    My Profile
                  </Link>
                </li>

                <li>
                  <Link to="/user-profile-edit" onClick={() => setOpen(false)}>
                    Edit Profile
                  </Link>
                </li>

                <li>
                  <span className="mm-logout" onClick={handleLogout}>
                    Logout
                  </span>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
