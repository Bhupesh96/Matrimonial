import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api";
import AlertService from "../services/AlertServices";
import Brand from "./Brand";
import { resolveImageUrl } from "../utils/imageUrl";

const MainMenu = () => {
  const [profileName, setProfileName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileID, setProfileID] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.warn("Logout error:", err.message);
    } finally {
      // Force the UI to update and send them to the home page
      AlertService.showSuccessAndRedirect("Logout successful", navigate, "/");
      window.location.href = "/"; // Full page reload ensures states reset
    }
  };
  useEffect(() => {
    const name = localStorage.getItem("profileName");
    const photo = localStorage.getItem("profilePhoto");
    const id = localStorage.getItem("profileID");

    if (name) setProfileName(name);
    if (photo) setProfilePhoto(photo);
    if (id) setProfileID(id);
  }, []);

  return (
    <div className="hom-top dw-header">
      <div className="container">
        <div className="row">
          <div className="hom-nav">
            {/* BRAND : reusable Brand component */}
            <div className="logo">
              <Brand size="md" />
            </div>

            {/* PRIMARY NAV : Home / About / Contact / Community / Couple Stories */}
            <div className="bl">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/community">Community</Link>
                </li>
                <li>
                  <Link to="/couple-stories">Couple Stories</Link>
                </li>

                {/* DASHBOARD ONLY when logged in */}
                {profileName && (
                  <li className="smenu-pare">
                    <span className="smenu">Dashboard</span>
                    <div className="smenu-open smenu-single">
                      <ul>
                        <li>
                          <Link to={`/user-profile/${profileID}`}>
                            My profile
                          </Link>
                        </li>
                        <li>
                          <Link to="/user-profile-edit">Edit profile</Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLogout();
                            }}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            {/* RIGHT SIDE : User badge OR Login / Join CTAs */}
            <div className="al dw-actions">
              {profileName ? (
                <div className="head-pro dw-userbadge">
                  <img
                    src={
                      profilePhoto
                        ? resolveImageUrl(profilePhoto) ||
                          `${process.env.PUBLIC_URL}/images/default.png`
                        : `${process.env.PUBLIC_URL}/images/default.png`
                    }
                    alt="Profile"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${process.env.PUBLIC_URL}/images/default.png`;
                    }}
                  />

                  <b>Welcome</b>
                  <br />
                  <h4
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "visible",
                      textOverflow: "unset",
                    }}
                  >
                    {profileName}
                  </h4>

                  <span className="fclick"></span>
                </div>
              ) : (
                <div className="dw-cta-group">
                  <Link
                    to="/login"
                    className="dw-btn dw-btn-ghost"
                    title="Login"
                    aria-label="Login"
                  >
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/sign-up"
                    className="dw-btn dw-btn-primary"
                    title="Join Free"
                    aria-label="Join Free"
                  >
                    <i className="fa fa-heart" aria-hidden="true"></i>
                    <span>Join Free</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
