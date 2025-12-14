import React, { useEffect, useState } from "react";
// IMPORT API
import { fetchBanners } from "../api";
const MyAboutUS = () => {
  const [banners, setBanners] = useState({ img1: null, img2: null });

  // Base URL for Banner Images
  const IMG_BASE_URL = "https://techwithus.in";

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const allBanners = await fetchBanners("bottom");

        // Find Banner with DisplayOrder 1
        const b1 = allBanners.find(
          (b) =>
            b.BannerPosition === "bottom" &&
            Number(b.DisplayOrder) === 1 &&
            b.IsActive === 1
        );

        // Find Banner with DisplayOrder 2
        const b2 = allBanners.find(
          (b) =>
            b.BannerPosition === "bottom" &&
            Number(b.DisplayOrder) === 2 &&
            b.IsActive === 1
        );

        setBanners({
          img1: b1 ? `${IMG_BASE_URL}${b1.BannerImage}` : null,
          img2: b2 ? `${IMG_BASE_URL}${b2.BannerImage}` : null,
        });
      } catch (err) {
        console.error("Error loading banners:", err);
      }
    };

    loadBanners();
  }, []);
  return (
    <div>
      {" "}
      {/* --- TOP BANNER --- */}
   
      {/* --- ICONS SECTION --- */}
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
      {/* --- WELCOME CONTENT WITH DYNAMIC IMAGES --- */}
      <section>
        <div className="ab-wel">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="ab-wel-lhs">
                  <span className="ab-wel-3"></span>

                  {/* IMAGE 1: Dynamic or Default */}
                  <img
                    src={
                      banners.img1 ||
                      `${process.env.PUBLIC_URL}/images/about/1.jpg`
                    }
                    alt="Welcome 1"
                    className="ab-wel-1"
                  />

                  {/* IMAGE 2: Dynamic or Default */}
                  <img
                    src={
                      banners.img2 ||
                      `${process.env.PUBLIC_URL}/images/about/2.jpg`
                    }
                    alt="Welcome 2"
                    className="ab-wel-2"
                  />

                  <span className="ab-wel-4"></span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ab-wel-rhs">
                  <div className="ab-wel-tit">
                    <h2>
                      Welcome to <em>Dewangan Shadi Hi</em>
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
      {/* --- STATS SECTION --- */}
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
    </div>
  );
};

export default MyAboutUS;
