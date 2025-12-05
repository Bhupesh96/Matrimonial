import React from "react";

const AboutSection2 = () => {
  return (
    <section>
      <div className="ab-sec2">
        <div className="container">
          <div className="row">
            <ul>
              <li>
                <div
                  className="animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                  data-dely="0.1"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/prize.png`}
                    alt="Genuine profiles"
                    loading="lazy"
                  />
                  <h4>Genuine profiles Hi</h4>
                  <p>Contact genuine profiles with 100% verified mobile</p>
                </div>
              </li>
              <li>
                <div
                  className="animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                  data-dely="0.3"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/trust.png`}
                    alt="Most trusted"
                    loading="lazy"
                  />
                  <h4>Most trusted</h4>
                  <p>The most trusted Dewangan Shadi brand lorem</p>
                </div>
              </li>
              <li>
                <div
                  className="animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                  data-dely="0.6"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/rings.png`}
                    alt="2000+ weddings"
                    loading="lazy"
                  />
                  <h4>2000+ weddings</h4>
                  <p>Lakhs of peoples have found their life partner</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection2;
