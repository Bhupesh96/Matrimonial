import React from "react";

const MainMenu = () => {
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
                              <a
                                href="all-profiles.html"
                                className="fclick"
                              ></a>
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
                              <a href="plans.html" className="fclick"></a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="smenu-pare">
                  <span className="smenu">All pages</span>
                  <div className="smenu-open smenu-multi">
                    <div className="container">
                      <div className="row">
                        <div className="multi-col">
                          <div className="inn">
                            <h4>Page sets 1</h4>
                            <ul>
                              <li>
                                <a href="all-profiles.html">All profiles</a>
                              </li>
                              <li>
                                <a href="profile-details.html">
                                  Profile details
                                </a>
                              </li>
                              <li>
                                <a href="wedding.html">Wedding</a>
                              </li>
                              <li>
                                <a href="wedding-video.html">Wedding video</a>
                              </li>
                              <li>
                                <a href="services.html">Our Services</a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="multi-col">
                          <div className="inn">
                            <h4>Page sets 2</h4>
                            <ul>
                              <li>
                                <a href="plans.html">Pricing plans</a>
                              </li>
                              <li>
                                <a href="login.html">Login</a>
                              </li>
                              <li>
                                <a href="sign-up.html">Sign-up</a>
                              </li>
                              <li>
                                <a href="photo-gallery.html">Photo gallery</a>
                              </li>
                              <li>
                                <a href="photo-gallery-1.html">
                                  Photo gallery 1
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="multi-col">
                          <div className="inn">
                            <h4>Page sets 3</h4>
                            <ul>
                              <li>
                                <a href="contact.html">Contact</a>
                              </li>
                              <li>
                                <a href="about.html">About</a>
                              </li>
                              <li>
                                <a href="blog.html">Blog</a>
                              </li>
                              <li>
                                <a href="blog-detail.html">Blog detail</a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="multi-col">
                          <div className="inn">
                            <h4>Page sets 4</h4>
                            <ul>
                              <li>
                                <a href="enquiry.html">Ask your doubts</a>
                              </li>
                              <li>
                                <a href="make-reservation.html">
                                  Make Reservation
                                </a>
                              </li>
                              <li>
                                <a href="faq.html">FAQ</a>
                              </li>
                              <li>
                                <a href="coming-soon.html" target="_blank">
                                  Coming soon
                                </a>
                              </li>
                              <li>
                                <a href="404.html">404</a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="multi-col full">
                          <div className="inn">
                            <h4>User dashboard pages</h4>
                            <ul>
                              <li>
                                <a href="user-dashboard.html">Dashboard</a>
                              </li>
                              <li>
                                <a href="user-profile.html">My profile</a>
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
                                <a href="user-profile-edit">
                                  Edit full profile
                                </a>
                              </li>
                              <li>
                                <a href="login.html">Sign in</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="smenu-pare">
                  <span className="smenu">Top pages</span>
                  <div className="smenu-open smenu-single">
                    <ul>
                      <li>
                        <a href="all-profiles.html">All profiles</a>
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
                        <a href="blog-detail.html">Blog detail</a>
                      </li>
                      <li>
                        <a href="about.html">About</a>
                      </li>
                      <li>
                        <a href="contact.html">Contact</a>
                      </li>
                      <li>
                        <a href="photo-gallery.html">Photo gallery</a>
                      </li>
                      <li>
                        <a href="photo-gallery-1.html">Photo gallery 1</a>
                      </li>
                      <li>
                        <a href="login.html">Login</a>
                      </li>
                      <li>
                        <a href="sign-up.html">Sign-up</a>
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
                  <a href="/sign-up">Register</a>
                </li>

                <li className="smenu-pare">
                  <span className="smenu">Dashboard</span>
                  <div className="smenu-open smenu-single">
                    <ul>
                      <li>
                        <a href="user-dashboard.html">Dashboard</a>
                      </li>
                      <li>
                        <a href="user-profile.html">My profile</a>
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
                        <a href="user-profile-edit">Edit full profile</a>
                      </li>
                      <li>
                        <a href="login.html">Sign in</a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            {/* USER PROFILE */}
            <div className="al">
              <div className="head-pro">
                <img src="images/profiles/1.jpg" alt="" loading="lazy" />
                <b>Advisor</b>
                <br />
                <h4>Ashley emyy</h4>
                <span className="fclick"></span>
              </div>
            </div>

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
