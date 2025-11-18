import React from "react";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  return (
    <div className="mob-me-all mobile_menu">
      <div className="mob-me-clo">
        <img src="images/icon/close.svg" alt="" />
      </div>

      <div className="mv-bus">
        <h4>
          <i className="fa fa-globe" aria-hidden="true"></i> EXPLORE CATEGORY
        </h4>
        <ul>
          <li>
            <Link to="all-profiles">All profiles</Link>
          </li>
          <li>
            <a href="wedding.html">Wedding page</a>
          </li>
          <li>
            <a href="services.html">All Services</a>
          </li>
          <li>
            <a href="plans.html">Join Now</a>
          </li>
        </ul>

        <h4>
          <i className="fa fa-align-center" aria-hidden="true"></i> All Pages
        </h4>
        <ul>
          <li>
            <Link to="all-profiles">All profiles</Link>
          </li>
          <li>
            <a href="profile-details.html">Profile details</a>
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
          <li>
            <a href="plans.html">Pricing plans</a>
          </li>
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
            <Link to="sign-up">Sign-up</Link>
          </li>
          <li>
            <a href="photo-gallery.html">Photo gallery</a>
          </li>
          <li>
            <a href="photo-gallery-1.html">Photo gallery 1</a>
          </li>
          <li>
            <Link to="contact">Contact</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <a href="blog.html">Blog</a>
          </li>
          <li>
            <Link to="blog-detail">Blog detail</Link>
          </li>
          <li>
            <a href="enquiry.html">Ask your doubts</a>
          </li>
          <li>
            <a href="make-reservation.html">Make Reservation</a>
          </li>
          <li>
            <a href="faq.html">FAQ</a>
          </li>
          <li>
            <a
              href="coming-soon.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Coming soon
            </a>
          </li>
          <li>
            <a href="404.html">404</a>
          </li>
        </ul>

        <div className="menu-pop-help">
          <h4>Support Team</h4>
          <div className="user-pro">
            <img src="images/profiles/1.jpg" alt="" loading="lazy" />
          </div>
          <div className="user-bio">
            <h5>Ashley emyy</h5>
            <span>Senior personal advisor</span>
            <a href="enquiry.html" className="btn btn-primary btn-sm">
              Ask your doubts
            </a>
          </div>
        </div>

        <div className="menu-pop-soci">
          <ul>
            <li>
              <a href="#!">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fa fa-whatsapp" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fa fa-youtube-play" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>

        <div className="late-news">
          <h4>Latest news</h4>
          <ul>
            <li>
              <div className="rel-pro-img">
                <img src="images/couples/1.jpg" alt="" loading="lazy" />
              </div>
              <div className="rel-pro-con">
                <h5>Long established fact that a reader distracted</h5>
                <span className="ic-date">12 Dec 2023</span>
              </div>
              <Link to="blog-detail" className="fclick"></Link>
            </li>
            <li>
              <div className="rel-pro-img">
                <img src="images/couples/3.jpg" alt="" loading="lazy" />
              </div>
              <div className="rel-pro-con">
                <h5>Long established fact that a reader distracted</h5>
                <span className="ic-date">12 Dec 2023</span>
              </div>
              <Link to="blog-detail" className="fclick"></Link>
            </li>
            <li>
              <div className="rel-pro-img">
                <img src="images/couples/4.jpg" alt="" loading="lazy" />
              </div>
              <div className="rel-pro-con">
                <h5>Long established fact that a reader distracted</h5>
                <span className="ic-date">12 Dec 2023</span>
              </div>
              <Link to="blog-detail" className="fclick"></Link>
            </li>
          </ul>
        </div>

        <div className="prof-rhs-help">
          <div className="inn">
            <h3>Tell us your Needs</h3>
            <p>Tell us what kind of service you are looking for.</p>
            <a href="enquiry.html">Register for free</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
