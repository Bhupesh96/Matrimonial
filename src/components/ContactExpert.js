import { Link } from "react-router-dom";

const ContactExpert = () => {
  return (
    <div className="menu-pop menu-pop2">
      <span className="menu-pop-clo">
        <i className="fa fa-times" aria-hidden="true"></i>
      </span>

      <div className="inn">
        <div className="menu-pop-help">
          <h4>Support Team</h4>
          <div className="user-pro">
            <img
              src={`${process.env.PUBLIC_URL}/images/profiles/1.jpg`}
              alt="Support team member"
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

        <div className="late-news">
          <h4>Latest news</h4>
          <ul>
            <li>
              <div className="rel-pro-img">
                <img
                  src={`${process.env.PUBLIC_URL}/images/couples/1.jpg`}
                  alt="News 1"
                  loading="lazy"
                />
              </div>
              <div className="rel-pro-con">
                <h5>Long established fact that a reader distracted</h5>
                <span className="ic-date">12 Dec 2023</span>
              </div>
              <Link to="/blog-detail" className="fclick"></Link>
            </li>
            <li>
              <div className="rel-pro-img">
                <img
                  src={`${process.env.PUBLIC_URL}/images/couples/3.jpg`}
                  alt="News 2"
                  loading="lazy"
                />
              </div>
              <div className="rel-pro-con">
                <h5>Long established fact that a reader distracted</h5>
                <span className="ic-date">12 Dec 2023</span>
              </div>
              <Link to="/blog-detail" className="fclick"></Link>
            </li>
            <li>
              <div className="rel-pro-img">
                <img
                  src={`${process.env.PUBLIC_URL}/images/couples/4.jpg`}
                  alt="News 3"
                  loading="lazy"
                />
              </div>
              <div className="rel-pro-con">
                <h5>Long established fact that a reader distracted</h5>
                <span className="ic-date">12 Dec 2023</span>
              </div>
              <Link to="/blog-detail" className="fclick"></Link>
            </li>
          </ul>
        </div>

        {/* HELP BOX */}
        <div className="prof-rhs-help">
          <div className="inn">
            <h3>Tell us your Needs</h3>
            <p>Tell us what kind of service you are looking for.</p>
            <a href="enquiry.html">Register for free</a>
          </div>
        </div>
        {/* END HELP BOX */}
      </div>
    </div>
  );
};

export default ContactExpert;
