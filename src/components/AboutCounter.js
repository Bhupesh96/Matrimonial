import React from "react";

const AboutCounter = () => {
  return (
    <section>
      <div className="ab-cont">
        <div className="container">
          <div className="row">
            <ul>
              <li>
                <div className="ab-cont-po">
                  <i className="fa fa-heart-o" aria-hidden="true"></i>
                  <div>
                    <h4>2K</h4>
                    <span>Couples paired</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="ab-cont-po">
                  <i className="fa fa-users" aria-hidden="true"></i>
                  <div>
                    <h4>4000+</h4>
                    <span>Registrants</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="ab-cont-po">
                  <i className="fa fa-male" aria-hidden="true"></i>
                  <div>
                    <h4>1600+</h4>
                    <span>Men</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="ab-cont-po">
                  <i className="fa fa-female" aria-hidden="true"></i>
                  <div>
                    <h4>2000+</h4>
                    <span>Women</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCounter;
