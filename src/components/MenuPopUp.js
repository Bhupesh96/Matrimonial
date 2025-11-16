import React from "react";

const MenuPopUp = () => {
  return (
    <div className="menu-pop menu-pop1">
      <span className="menu-pop-clo">
        <i className="fa fa-times" aria-hidden="true"></i>
      </span>

      <div className="inn">
        <img
          src="images/logo-b.png"
          alt="logo"
          loading="lazy"
          className="logo-brand-only"
        />

        <p>
          <strong>Best Dewangan Shadi Platform</strong> lacinia viverra lectus.
          Fusce imperdiet ullamcorper metus eu fringilla. Lorem Ipsum is simply
          dummy text of the printing and typesetting industry.
        </p>

        <ul className="menu-pop-info">
          <li>
            <a href="#!">
              <i className="fa fa-phone" aria-hidden="true"></i> +92 (8800) 68 -
              8960
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="fa fa-whatsapp" aria-hidden="true"></i> +92 (8800)
              68 - 8960
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="fa fa-envelope-o" aria-hidden="true"></i>{" "}
              help@company.com
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="fa fa-map-marker" aria-hidden="true"></i> 3812 Lena
              Lane City Jackson Mississippi
            </a>
          </li>
        </ul>

        <div className="menu-pop-help">
          <h4>Support Team</h4>
          <div className="user-pro">
            <img src="images/profiles/1.jpg" alt="advisor" loading="lazy" />
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
