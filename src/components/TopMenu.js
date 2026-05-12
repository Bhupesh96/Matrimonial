import { Link } from "react-router-dom";

const TopMenu = () => {
  return (
    <div className="head-top">
      <div className="container">
        <div className="row">
          <div className="lhs">
            <ul>
              {/* <li>
                <a href="#!" className="ser-open">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </a>
              </li> */}
              <li>
                <Link to="/about">About</Link>
              </li>
              {/* <li>
                <a href="faq.html">FAQ</a>
              </li> */}
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/couple-stories">Couple Stories</Link>
              </li>
            </ul>
          </div>
          <div className="rhs">
            <ul>
              <li>
                <a href="tel:+919806863659">
                  <i className="fa fa-phone" aria-hidden="true"></i>&nbsp;+91
                  98068 63659
                </a>
              </li>
              <li>
                <a href="mailto:raipurlink@gmail.com">
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;
                  raipurlink@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919806863659"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-whatsapp" aria-hidden="true"></i>&nbsp;
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#!" onClick={(e) => e.preventDefault()}>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
