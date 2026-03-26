import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api";
import AlertService from "../services/AlertServices";

const MainMenu = () => {
  const [profileName, setProfileName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileID, setProfileID] = useState("");

  const navigate = useNavigate();
  const menuRef = useRef(null);

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
    <div className="hom-top">
      <div className="container">
        <div className="row">
          <div className="hom-nav">
            {/* LOGO */}
            <div className="logo">
              {/* <span className="menu desk-menu">
                <i></i>
                <i></i>
                <i></i>
              </span> */}
              <Link to="/" className="logo-brand">
                <img
                  src={`${process.env.PUBLIC_URL}/images/logo-b.png`}
                  alt=""
                  loading="lazy"
                  className="ic-logo"
                />
              </Link>
            </div>

            {/* EXPLORE MENU */}
            <div className="bl">
              <ul>
                <li className="smenu-pare">
                  <span className="smenu">Explore</span>
                  <div className="smenu-open smenu-box">
                    <div className="container">
                      <div className="row">
                        <h4 className="tit">Explore category</h4>
                        <ul>
                          <li>
                            <div className="menu-box menu-box-2">
                              <h5>
                                Browse profiles{" "}
                                <span>1200+ Verified profiles</span>
                              </h5>
                              <span className="explor-cta">More details</span>
                              <Link
                                to="/all-profiles"
                                className="fclick"
                              ></Link>
                            </div>
                          </li>
                          <li>
                            <div className="menu-box menu-box-1">
                              <h5>
                                Community Page <span>See What's Going On</span>
                              </h5>
                              <span className="explor-cta">More details</span>
                              <Link to="/community" className="fclick"></Link>
                            </div>
                          </li>
                          <li>
                            <div className="menu-box menu-box-3">
                              <h5>
                                Couple Stories<span>Beautiful Moment</span>
                              </h5>
                              <span className="explor-cta">More details</span>
                              <Link
                                to="/couple-stories"
                                className="fclick"
                              ></Link>
                            </div>
                          </li>
                          {!profileName && (
                            <li>
                              <div className="menu-box menu-box-4">
                                <h5>
                                  Join Now <span>Register</span>
                                </h5>
                                <span className="explor-cta">More details</span>

                                <Link to="/sign-up">Register</Link>
                              </div>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="smenu-pare">
                  <span className="smenu">Top pages</span>
                  <div className="smenu-open smenu-single">
                    <ul>
                      <li>
                        <Link to="/all-profiles">All profiles</Link>
                      </li>
                      <li>
                        <Link to="/about">About</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>

                      {/* SHOW LOGIN ONLY IF NOT LOGGED IN */}
                      {!profileName && (
                        <li>
                          <Link to="/login">Login</Link>
                        </li>
                      )}

                      {/* SHOW REGISTER ONLY IF NOT LOGGED IN */}
                      {!profileName && (
                        <li>
                          <Link to="/sign-up">Register</Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </li>

                <li>
                  <Link to="/community">Community</Link>
                </li>

                {!profileName && (
                  <li>
                    <Link to="/sign-up">Register</Link>
                  </li>
                )}

                {/* DASHBOARD MENU */}
                <li className="smenu-pare">
                  <span className="smenu">Dashboard</span>
                  <div className="smenu-open smenu-single">
                    <ul>
                      {/* 1. MY PROFILE (Only if Logged In) */}
                      {profileName && (
                        <li>
                          <Link to={`/user-profile/${profileID}`}>
                            My profile
                          </Link>
                        </li>
                      )}

                      {/* 2. EDIT PROFILE (Only if Logged In) */}
                      {profileName && (
                        <li>
                          <Link to="/user-profile-edit">Edit full profile</Link>
                        </li>
                      )}

                      {/* 3. LOGIN (Only if NOT Logged In) */}
                      {!profileName && (
                        <li>
                          <Link to="/login">Login</Link>
                        </li>
                      )}

                      {/* 4. LOGOUT (Only if Logged In) */}
                      {profileName && (
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
                      )}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            {/* USER PROFILE BADGE (Only if Logged In) */}
            {profileName && (
              <div className="al">
                <div className="head-pro">
                  <img
                    src={
                      profilePhoto
                        ? profilePhoto
                        : `${process.env.PUBLIC_URL}/images/default.png`
                    }
                    alt="Profile"
                    loading="lazy"
                  />

                  <b>User</b>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
