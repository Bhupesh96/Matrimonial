import React from "react";

const AboutWelcome = () => {
  return (
    <section>
      <div className="ab-wel">
        <div className="container">
          <div className="row">
            {/* Left side images */}
            <div className="col-lg-6">
              <div className="ab-wel-lhs">
                <span className="ab-wel-3"></span>
                <img
                  src="images/about/1.jpg"
                  alt="Wedding couple"
                  loading="lazy"
                  className="ab-wel-1"
                />
                <img
                  src="images/couples/20.jpg"
                  alt="Happy couple"
                  loading="lazy"
                  className="ab-wel-2"
                />
                <span className="ab-wel-4"></span>
              </div>
            </div>

            {/* Right side text */}
            <div className="col-lg-6">
              <div className="ab-wel-rhs">
                <div className="ab-wel-tit">
                  <h2>
                    Welcome to <em>Dewangan Shadi</em>
                  </h2>
                  <p>
                    A trusted platform dedicated to helping Dewangan families
                    find the right match with ease. Verified profiles, secure
                    connections, and a smooth partner search experience.
                  </p>
                  <p>
                    एक भरोसेमंद प्लेटफ़ॉर्म जहाँ देवांगन समाज के लिए सही
                    जीवनसाथी ढूँढ़ना आसान और सुरक्षित है। यहाँ आपको मिलेंगे
                    सत्यापित प्रोफ़ाइल और विश्वसनीय जानकारी।
                  </p>
                  <p>
                    <a href="plans.html">Click here to</a> start your matrimony
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
                    लेकिन रिश्ते का वास्तविक मूल्य कुछ यादृच्छिक शब्दों से नहीं
                    समझा जा सकता। हमारे प्लेटफ़ॉर्म पर हर प्रोफ़ाइल किसी असली
                    व्यक्ति, असली परिवार और असली उम्मीदों को दर्शाती है। हम
                    सुनिश्चित करते हैं कि दी गई जानकारी विश्वसनीय, उपयोगी और
                    आपके जीवन के सही निर्णय में सहायक हो।
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
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
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
  );
};

export default AboutWelcome;
