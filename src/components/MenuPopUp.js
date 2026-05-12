import React from "react";
import Brand from "./Brand";

const MenuPopUp = () => {
  return (
    <div className="menu-pop menu-pop1">
      <span className="menu-pop-clo">
        <i className="fa fa-times" aria-hidden="true"></i>
      </span>

      <div className="inn">
        <div className="menu-pop-brand">
          <Brand size="lg" />
        </div>

        <p>
          <strong>Dewangan Links</strong> – India's most trusted matrimony
          platform for the Dewangan community. Find verified profiles, connect
          with families, and discover your perfect life partner.
        </p>

        <ul className="menu-pop-info">
          <li>
            <a href="tel:+919806863659">
              <i className="fa fa-phone" aria-hidden="true"></i> +91 98068 63659
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/919806863659"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-whatsapp" aria-hidden="true"></i> +91 98068
              63659
            </a>
          </li>
          <li>
            <a href="mailto:raipurlink@gmail.com">
              <i className="fa fa-envelope-o" aria-hidden="true"></i>{" "}
              raipurlink@gmail.com
            </a>
          </li>
          <li>
            <a
              href="https://maps.google.com/?q=Raipur,Chhattisgarh,India"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-map-marker" aria-hidden="true"></i> Raipur,
              Chhattisgarh, India
            </a>
          </li>
        </ul>

        <div className="menu-pop-help">
          <h4>Support Team</h4>
          <div className="user-pro">
            <img
              src={`${process.env.PUBLIC_URL}/images/profiles/1.jpg`}
              alt="advisor"
              loading="lazy"
            />
          </div>
          <div className="user-bio">
            <h5>Ashley Emyy</h5>
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
      </div>
    </div>
  );
};

export default MenuPopUp;
