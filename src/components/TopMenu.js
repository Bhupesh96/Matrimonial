const TopMenu = () => {
  return (
    <div className="head-top">
      <div className="container">
        <div className="row">
          <div className="lhs">
            <ul>
              <li>
                <a href="#!" className="ser-open">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="about.html">About</a>
              </li>
              <li>
                <a href="faq.html">FAQ</a>
              </li>
              <li>
                <a href="contact.html">Contact</a>
              </li>
            </ul>
          </div>
          <div className="rhs">
            <ul>
              <li>
                <a href="tel:+9704462944">
                  <i className="fa fa-phone" aria-hidden="true"></i>&nbsp;+01
                  5312 5312
                </a>
              </li>
              <li>
                <a href="mailto:info@example.com">
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;
                  help@company.com
                </a>
              </li>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
