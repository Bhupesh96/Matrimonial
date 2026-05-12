import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand";

const Footer = () => {
  const [profileName, setProfileName] = useState("");
  const [profileID, setProfileID] = useState("");

  useEffect(() => {
    setProfileName(localStorage.getItem("profileName") || "");
    setProfileID(localStorage.getItem("profileID") || "");
  }, []);

  return (
    <section className="wed-hom-footer dw-footer">
      <div className="container">
        {/* TOP : brand + tagline */}
        <div className="row foot-brand-row">
          <Brand size="lg" variant="light" />
          <p className="foot-tag">
            India's most trusted matrimony platform for the Dewangan community.
          </p>
        </div>

        <div className="row foot-supp">
          <h2>
            <span>Free support:</span>{" "}
            <a href="tel:+919806863659">+91 98068 63659</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <span>Email:</span>{" "}
            <a href="mailto:raipurlink@gmail.com">raipurlink@gmail.com</a>
          </h2>
        </div>

        {/* MAIN NAV COLUMNS */}
        <div className="row wed-foot-link wed-foot-link-1 dw-foot-grid">
          {/* COL 1 : Explore */}
          <div className="col-md-3 dw-foot-col">
            <h4>Explore</h4>
            <ul>
              <li>
                <Link to="/all-profiles">
                  <i className="fa fa-users" aria-hidden="true"></i> Browse
                  Profiles
                </Link>
              </li>
              <li>
                <Link to="/community">
                  <i className="fa fa-comments-o" aria-hidden="true"></i>{" "}
                  Community Page
                </Link>
              </li>
              <li>
                <Link to="/couple-stories">
                  <i className="fa fa-heart" aria-hidden="true"></i> Couple
                  Stories
                </Link>
              </li>
              <li>
                <Link to="/experiences">
                  <i className="fa fa-star" aria-hidden="true"></i> Experiences
                </Link>
              </li>
              {!profileName && (
                <li>
                  <Link to="/sign-up" className="dw-foot-cta-link">
                    <i className="fa fa-user-plus" aria-hidden="true"></i> Join
                    Now
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* COL 2 : Top Pages */}
          <div className="col-md-3 dw-foot-col">
            <h4>Top Pages</h4>
            <ul>
              <li>
                <Link to="/">
                  <i className="fa fa-home" aria-hidden="true"></i> Home
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <i className="fa fa-info-circle" aria-hidden="true"></i> About
                  Us
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <i className="fa fa-phone" aria-hidden="true"></i> Contact
                </Link>
              </li>
              <li>
                <Link to="/all-profiles">
                  <i className="fa fa-list" aria-hidden="true"></i> All Profiles
                </Link>
              </li>
              {!profileName && (
                <>
                  <li>
                    <Link to="/login">
                      <i className="fa fa-sign-in" aria-hidden="true"></i> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/sign-up">
                      <i className="fa fa-edit" aria-hidden="true"></i> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* COL 3 : Dashboard / Account */}
          <div className="col-md-3 dw-foot-col">
            <h4>{profileName ? "My Account" : "Quick Links"}</h4>
            <ul>
              {profileName ? (
                <>
                  <li>
                    <Link to={`/user-profile/${profileID}`}>
                      <i className="fa fa-user" aria-hidden="true"></i> My
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/user-profile-edit">
                      <i className="fa fa-pencil" aria-hidden="true"></i> Edit
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/all-profiles">
                      <i className="fa fa-search" aria-hidden="true"></i> Find
                      Matches
                    </Link>
                  </li>
                  <li>
                    <Link to="/community">
                      <i className="fa fa-users" aria-hidden="true"></i>{" "}
                      Community
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/sign-up">
                      <i className="fa fa-heart" aria-hidden="true"></i> Register
                      Free
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <i className="fa fa-sign-in" aria-hidden="true"></i> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/all-profiles">
                      <i className="fa fa-eye" aria-hidden="true"></i> View
                      Profiles
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <i className="fa fa-question-circle" aria-hidden="true"></i>{" "}
                      How It Works
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* COL 4 : Get In Touch */}
          <div className="col-md-3 dw-foot-col">
            <h4>Get In Touch</h4>
            <ul className="dw-foot-contact">
              <li>
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <span>Raipur, Chhattisgarh, India</span>
              </li>
              <li>
                <i className="fa fa-phone" aria-hidden="true"></i>
                <a href="tel:+919806863659">+91 98068 63659</a>
              </li>
              <li>
                <i className="fa fa-whatsapp" aria-hidden="true"></i>
                <a
                  href="https://wa.me/919806863659"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +91 98068 63659
                </a>
              </li>
              <li>
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                <a href="mailto:raipurlink@gmail.com">raipurlink@gmail.com</a>
              </li>
            </ul>

            <div className="dw-foot-social">
              <a href="#!" aria-label="Facebook">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#!" aria-label="Twitter">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#!" aria-label="Instagram">
                <i className="fa fa-instagram"></i>
              </a>
              <a
                href="https://wa.me/919806863659"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <i className="fa fa-whatsapp"></i>
              </a>
              <a href="#!" aria-label="YouTube">
                <i className="fa fa-youtube-play"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="row foot-count">
          <p>
            Trusted by thousands of Dewangan families for successful marriages.{" "}
            {!profileName && (
              <Link to="/sign-up" className="btn btn-primary btn-sm">
                Join us today!
              </Link>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
