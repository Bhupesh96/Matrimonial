import React from "react";

const HowItWorks = () => {
  return (
    <section>
      <div className="wedd-tline">
        <div className="container">
          <div className="row">
            <div className="home-tit">
              <p>Moments</p>
              <h2>
                <span>How it works</span>
              </h2>
              <span className="leaf1"></span>
              <span className="tit-ani-"></span>
            </div>
            <div className="inn">
              <ul>
                <li>
                  <div className="tline-inn">
                    <div
                      className="tline-im animate animate__animated animate__slower"
                      data-ani="animate__fadeInUp"
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon/rings.png`}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="tline-con animate animate__animated animate__slow"
                      data-ani="animate__fadeInUp"
                    >
                      <h5>Register</h5>
                      <span>Start Here</span>
                      <p>
                        Create your profile with accurate details to help us
                        find the best match for you. Add your basic information,
                        preferences, and lifestyle details.
                      </p>
                      <p>
                        अपनी सही जानकारी के साथ प्रोफ़ाइल बनाएँ ताकि हम आपके लिए
                        सबसे उपयुक्त जीवनसाथी खोज सकें। अपनी मूल जानकारी, पसंद
                        और जीवनशैली के बारे में विवरण जोड़ें।
                      </p>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="tline-inn tline-inn-reve">
                    <div
                      className="tline-con animate animate__animated animate__slower"
                      data-ani="animate__fadeInUp"
                    >
                      <h5>Find your Match</h5>
                      <span>Explore Profiles</span>

                      <p>
                        Browse verified profiles and receive personalized match
                        suggestions based on your preferences.
                      </p>
                      <p>
                        सत्यापित प्रोफ़ाइल देखें और अपनी पसंद के अनुसार
                        व्यक्तिगत मैच सुझाव प्राप्त करें।
                      </p>
                    </div>
                    <div
                      className="tline-im animate animate__animated animate__slow"
                      data-ani="animate__fadeInUp"
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon/wedding-2.png`}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div className="tline-inn">
                    <div
                      className="tline-im animate animate__animated animate__slower"
                      data-ani="animate__fadeInUp"
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon/love-birds.png`}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="tline-con animate animate__animated animate__slow"
                      data-ani="animate__fadeInUp"
                    >
                      <h5>Send Interest</h5>
                      <span>Send Request</span>
                      <p>
                        If you find someone suitable, express your interest to
                        start the conversation. This helps both sides know you
                        are genuinely interested.
                      </p>
                      <p>
                        यदि आपको कोई प्रोफ़ाइल पसंद आती है, तो बातचीत शुरू करने
                        के लिए इंटरेस्ट भेजें। इससे सामने वाले को भी आपकी
                        वास्तविक रुचि का पता चलता है।
                      </p>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="tline-inn tline-inn-reve">
                    <div
                      className="tline-con animate animate__animated animate__slower"
                      data-ani="animate__fadeInUp"
                    >
                      <h5>Get Profile Information</h5>
                      <span>View Details</span>
                      <p>
                        View detailed information of the profiles you are
                        interested in—education, profession, family background,
                        lifestyle, and more.
                      </p>
                      <p>
                        जिन प्रोफ़ाइलों में आप रुचि रखते हैं, उनकी विस्तृत
                        जानकारी देखें—शिक्षा, पेशा, पारिवारिक पृष्ठभूमि,
                        जीवनशैली आदि।
                      </p>
                    </div>
                    <div
                      className="tline-im animate animate__animated animate__slow"
                      data-ani="animate__fadeInUp"
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon/network.png`}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div className="tline-inn">
                    <div
                      className="tline-im animate animate__animated animate__slower"
                      data-ani="animate__fadeInUp"
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon/chat.png`}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="tline-con animate animate__animated animate__slow"
                      data-ani="animate__fadeInUp"
                    >
                      <h5>Start Meetups</h5>
                      <span>Meet & Interact</span>
                      <p>
                        Once both sides agree, plan a meeting with the guidance
                        of family or mentors. This helps you understand each
                        other better.
                      </p>
                      <p>
                        दोनों पक्षों की सहमति के बाद परिवार या मार्गदर्शकों की
                        सलाह से मुलाकात तय करें। इससे एक-दूसरे को बेहतर समझने का
                        अवसर मिलता है।
                      </p>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="tline-inn tline-inn-reve">
                    <div
                      className="tline-con animate animate__animated animate__slower"
                      data-ani="animate__fadeInUp"
                    >
                      <h5>Getting Marriage</h5>
                      <span>Begin Your Journey</span>

                      <p>
                        If everything matches well and families agree, take the
                        next beautiful step—plan your marriage and begin a
                        joyful journey together.
                      </p>
                      <p>
                        यदि सब कुछ अनुकूल है और परिवार सहमत हैं, तो अगला सुंदर
                        कदम उठाएँ—शादी की तैयारी करें और एक खुशहाल जीवन की
                        शुरुआत करें।
                      </p>
                    </div>
                    <div
                      className="tline-im animate animate__animated animate__slow"
                      data-ani="animate__fadeInUp"
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon/wedding-couple.png`}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
