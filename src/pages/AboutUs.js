import React from "react";
import Preloader from "../components/Preloader";
import PoopUpSearch from "../components/PoopUpSearch";
import TopMenu from "../components/TopMenu";
import MenuPopUp from "../components/MenuPopUp";
import ContactExpert from "../components/ContactExpert";
import MainMenu from "../components/MainMenu";
import MobileMenu from "../components/MobileMenu";
import DashboardMenu from "../components/DashBoardMenu";
import WhyChooseUs from "../components/WhyChooseUs";
import MeetOurTeam from "../components/MeetOurTeam";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import CopyRight from "../components/CopyRight";
import CustomerReviews from "../components/CustomerReview";

const AboutUs = () => {
  return (
    <div>
      <PoopUpSearch />
      <TopMenu />
      <MenuPopUp />
      <ContactExpert />
      <MainMenu />
      <MobileMenu />
      <DashboardMenu />
      {/* Banner */}
      <section>
        <div className="str">
          <div className="ban-inn ab-ban">
            <div className="container">
              <div className="row">
                <div className="hom-ban">
                  <div className="ban-tit">
                    <span>
                      <i className="no1">#1</i> Wedding Website
                    </span>
                    <h1>About us</h1>
                    <p>
                      Most Trusted and premium Matrimony Service in the World.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="ab-sec2">
          <div className="container">
            <div className="row">
              <ul>
                <li>
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/prize.png`}
                      alt=""
                    />
                    <h4>Genuine profiles</h4>
                    <p>The most trusted Dewangan Shadi brand</p>
                  </div>
                </li>
                <li>
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/trust.png`}
                      alt=""
                    />
                    <h4>Most trusted</h4>
                    <p>The most trusted Dewangan Shadi brand</p>
                  </div>
                </li>
                <li>
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/rings.png`}
                      alt=""
                    />
                    <h4>2000+ weddings</h4>
                    <p>The most trusted Dewangan Shadi brand</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="ab-wel">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="ab-wel-lhs">
                  <span className="ab-wel-3"></span>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/about/1.jpg`}
                    alt=""
                    className="ab-wel-1"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/images/about/2.jpg`}
                    alt=""
                    className="ab-wel-2"
                  />
                  <span className="ab-wel-4"></span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ab-wel-rhs">
                  <div className="ab-wel-tit">
                    <h2>
                      Welcome to <em>Dewangan Shadi</em>
                    </h2>
                    <p>
                      Best Dewangan Shadi Platform It is a long established fact
                      that a reader will be distracted by the readable content
                      of a page when looking at its layout.
                    </p>
                    <p>
                      <a href="plans.html">Click here to</a> Start you matrimony
                      service now.
                    </p>
                  </div>
                  <div className="ab-wel-tit-1">
                    <p>
                      There are many ways people describe their partner
                      preferences, but the true essence of a relationship cannot
                      be expressed through random words or generic descriptions.
                      Every profile on our platform reflects real individuals,
                      real families, and real expectations. We ensure that the
                      information provided is authentic, meaningful, and helpful
                      for making the right life decisions.
                    </p>
                    <p>
                      लोग अपने जीवनसाथी की पसंद को कई तरीकों से व्यक्त करते हैं,
                      लेकिन रिश्ते का वास्तविक मूल्य कुछ यादृच्छिक शब्दों से
                      नहीं समझा जा सकता। हमारे प्लेटफ़ॉर्म पर हर प्रोफ़ाइल किसी
                      असली व्यक्ति, असली परिवार और असली उम्मीदों को दर्शाती है।
                      हम सुनिश्चित करते हैं कि दी गई जानकारी विश्वसनीय, उपयोगी
                      और आपके जीवन के सही निर्णय में सहायक हो।
                    </p>
                  </div>
                  <div className="ab-wel-tit-2">
                    <ul>
                      <li>
                        <div>
                          <i className="fa fa-phone" aria-hidden="true"></i>
                          <h4>
                            Enquiry <em>+01 2242 3366</em>
                          </h4>
                        </div>
                      </li>
                      <li>
                        <div>
                          <i
                            className="fa fa-envelope-o"
                            aria-hidden="true"
                          ></i>
                          <h4>
                            Get Support <em>info@example.com</em>
                          </h4>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="ab-sec2">
          <div className="container">
            <div className="row">
              <ul>
                <li>
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/prize.png`}
                      alt="Genuine profiles"
                    />
                    <h4>Genuine profiles</h4>
                    <p>The most trusted Dewangan Shadi brand</p>
                  </div>
                </li>
                <li>
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/trust.png`}
                      alt="Most trusted"
                    />
                    <h4>Most trusted</h4>
                    <p>The most trusted Dewangan Shadi brand</p>
                  </div>
                </li>
                <li>
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/rings.png`}
                      alt="2000+ weddings"
                    />
                    <h4>2000+ weddings</h4>
                    <p>The most trusted Dewangan Shadi brand</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
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
                      <span>Registered users</span>
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
      <CustomerReviews />
      <MeetOurTeam />
      <FAQSection />
      <Footer />
      <CopyRight />
    </div>
  );
};

export default AboutUs;
