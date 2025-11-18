import React from "react";
import { Link } from "react-router-dom";

const DashboardMenu = () => {
  return (
    <div className="mob-me-all dashbord_menu">
      <div className="mob-me-clo">
        <img src="images/icon/close.svg" alt="" />
      </div>
      <div className="mv-bus">
        <div className="head-pro">
          <img src="images/profiles/1.jpg" alt="" loading="lazy" />
          <b>user profile</b>
          <br />
          <h4>Ashley emyy</h4>
        </div>
        <ul>
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
            <Link to="sign-up">Sign-up</Link>
          </li>
          <li>
            <Link to="plans">Pricing plans</Link>
          </li>
          <li>
            <Link to="all-profiles">Browse profiles</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardMenu;
