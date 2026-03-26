import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api";
import "../assets/css/MobileMenu.css";
import AlertService from "../services/AlertServices";

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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.warn("Logout error:", err.message);
    } finally {
      setOpen(false);
      AlertService.showSuccessAndRedirect("Logout successful", navigate, "/");
      window.location.href = "/";
    }
  };

  return (
    <>
      {/* Premium Floating Menu Button */}
      <div className="mob-menu-btn" onClick={() => setOpen(true)}>
        <div className="burger-lines">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Blurred Glass Backdrop */}
      <div
        className={`mm-overlay ${open ? "is-active" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Slide Menu Panel */}
      <div className={`mm-panel ${open ? "mm-open" : ""}`}>
        {/* Header with Close Button */}
        <div className="mm-header">
          <h3 className="mm-brand">Menu</h3>
          <button className="mm-close-btn" onClick={() => setOpen(false)}>
            <i className="fa fa-times"></i>
          </button>
        </div>

        <div className="mm-content">
          {/* User Profile Card */}
          {profileName && (
            <div className="mm-user-card">
              <div className="mm-user-avatar">
                <img
                  src={
                    profilePhoto ||
                    `${process.env.PUBLIC_URL}/images/default.png`
                  }
                  alt="Profile"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${process.env.PUBLIC_URL}/images/default.png`;
                  }}
                />
              </div>
              <div className="mm-user-info">
                <span className="mm-greeting">Welcome back,</span>
                <h4>{profileName}</h4>
              </div>
            </div>
          )}

          {/* EXPLORE */}
          <div className="mm-section">
            <h4 className="mm-subtitle">Explore</h4>
            <ul className="mm-nav-list">
              <li>
                <Link to="/all-profiles" onClick={() => setOpen(false)}>
                  <span>All Profiles</span>
                  <i className="fa fa-angle-right"></i>
                </Link>
              </li>
              <li>
                <Link to="/couple-stories" onClick={() => setOpen(false)}>
                  <span>Couple Stories</span>
                  <i className="fa fa-angle-right"></i>
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={() => setOpen(false)}>
                  <span>All Services</span>
                  <i className="fa fa-angle-right"></i>
                </Link>
              </li>
              {!profileName && (
                <li>
                  <Link
                    to="/sign-up"
                    className="highlight-link"
                    onClick={() => setOpen(false)}
                  >
                    <span>Join Now</span>
                    <i className="fa fa-angle-right"></i>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* PAGES */}
          <div className="mm-section">
            <h4 className="mm-subtitle">Company</h4>
            <ul className="mm-nav-list">
              <li>
                <Link to="/about" onClick={() => setOpen(false)}>
                  <span>About Us</span>
                  <i className="fa fa-angle-right"></i>
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setOpen(false)}>
                  <span>Contact</span>
                  <i className="fa fa-angle-right"></i>
                </Link>
              </li>
              {!profileName && (
                <>
                  <li>
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <span>Login</span>
                      <i className="fa fa-angle-right"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/sign-up" onClick={() => setOpen(false)}>
                      <span>Register</span>
                      <i className="fa fa-angle-right"></i>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* DASHBOARD */}
          {profileName && (
            <div className="mm-section">
              <h4 className="mm-subtitle">My Account</h4>
              <ul className="mm-nav-list">
                <li>
                  <Link
                    to={`/user-profile/${profileID}`}
                    onClick={() => setOpen(false)}
                  >
                    <span>My Profile</span>
                    <i className="fa fa-angle-right"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/user-profile-edit" onClick={() => setOpen(false)}>
                    <span>Edit Profile</span>
                    <i className="fa fa-angle-right"></i>
                  </Link>
                </li>
              </ul>

              {/* Elegant Logout Button */}
              <button className="mm-logout-btn" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
