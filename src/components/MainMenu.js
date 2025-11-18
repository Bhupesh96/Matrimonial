import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainMenu = () => {
  const [profileName, setProfileName] = useState("");
  useEffect(() => {
    const name = localStorage.getItem("profileName");
    if (name) {
      setProfileName(name);
    }
  }, []);

  return (
    <div className="hom-top">
      <div className="container">
        <div className="row">
          <div className="hom-nav">
            {/* LOGO */}
            <div className="logo">
              <span className="menu desk-menu">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <a href="/" className="logo-brand">
                <img
                  src="images/logo-b.png"
                  alt=""
                  loading="lazy"
                  className="ic-logo"
                />
              </a>
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
                              <a href="/all-profiles" className="fclick"></a>
                            </div>
                          </li>
                          <li>
                            <div className="menu-box menu-box-1">
                              <h5>
                                Wedding page <span>Make reservation</span>
                              </h5>
                              <span className="explor-cta">More details</span>
                              <a href="wedding.html" className="fclick"></a>
                            </div>
                          </li>
                          <li>
                            <div className="menu-box menu-box-3">
                              <h5>
                                All Services<span>Lorem ipsum dummy</span>
                              </h5>
                              <span className="explor-cta">More details</span>
                              <a href="services.html" className="fclick"></a>
                            </div>
                          </li>
                          <li>
                            <div className="menu-box menu-box-4">
                              <h5>
                                Join Now <span>Lorem ipsum dummy</span>
                              </h5>
                              <span className="explor-cta">More details</span>
                              <Link to="sign-up">Register</Link>
                            </div>
                          </li>
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
                        <a href="profile-details.html">Profile details</a>
                      </li>
                      <li>
                        <a href="wedding.html">Wedding</a>
                      </li>
                      <li>
                        <a href="blog.html">Blog</a>
                      </li>
                      <li>
                        <Link to="/blog-detail">Blog detail</Link>
                      </li>
                      <li>
                        <Link to="/about">About</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li>
                        <a href="photo-gallery.html">Photo gallery</a>
                      </li>
                      <li>
                        <a href="photo-gallery-1.html">Photo gallery 1</a>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/sign-up">Register</Link>
                      </li>
                      <li>
                        <a href="plans.html">Pricing plans</a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li>
                  <a href="plans.html">Plans</a>
                </li>
                <li>
                  <Link to="sign-up">Register</Link>
                </li>

                <li className="smenu-pare">
                  <span className="smenu">Dashboard</span>
                  <div className="smenu-open smenu-single">
                    <ul>
                      <li>
                        <a href="user-dashboard.html">Dashboard</a>
                      </li>
                      <li>
                        <Link to="/user-profile">My profile</Link>
                      </li>
                      <li>
                        <a href="user-interests.html">Interests</a>
                      </li>
                      <li>
                        <a href="user-chat.html">Chat lists</a>
                      </li>
                      <li>
                        <a href="user-plan.html">My plan details</a>
                      </li>
                      <li>
                        <a href="user-setting.html">Profile settings</a>
                      </li>
                      <li>
                        <Link to="/user-profile-edit">Edit full profile</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            {/* USER PROFILE */}
            {profileName && (
              <div className="al">
                <div className="head-pro">
                  <img src="images/default.png" alt="" loading="lazy" />
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

            {/* MOBILE MENU */}
            <div className="mob-menu">
              <div className="mob-me-ic">
                <span className="ser-open mobile-ser">
                  <img src="images/icon/search.svg" alt="" />
                </span>
                <span className="mobile-exprt" data-mob="dashbord">
                  <img src="images/icon/users.svg" alt="" />
                </span>
                <span className="mobile-menu" data-mob="mobile">
                  <img src="images/icon/menu.svg" alt="" />
                </span>
              </div>
            </div>
            {/* END MOBILE MENU */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
