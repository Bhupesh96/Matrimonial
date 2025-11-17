import { Link } from "react-router-dom";

const FindMatchSection = () => {
  return (
    <section>
      <div className="str count">
        <div className="container">
          <div className="row">
            <div className="fot-ban-inn">
              <div className="lhs">
                <h2>Find your perfect Match now</h2>
                <p>
                  Building a meaningful relationship starts with finding someone
                  who truly aligns with your values, lifestyle, and
                  expectations. Our platform helps you connect with verified
                  profiles, smart match suggestions, and easy communication
                  tools—making your partner search smooth, safe, and
                  personalized.
                </p>
                <p>
                  एक सुंदर रिश्ते की शुरुआत सही जीवनसाथी की खोज से होती है।
                  हमारा प्लेटफ़ॉर्म आपको ऐसे सत्यापित प्रोफ़ाइल से जोड़ता है जो
                  आपके विचारों, जीवनशैली और उम्मीदों से मेल खाते हैं। आसान
                  मैसेजिंग और बेहतर मैच सुझावों के साथ आपका खोज सफ़र अब और भी
                  सुगम और सुरक्षित है।
                </p>
               <Link to="sign-up">Register</Link>

                <a href="/contact" className="cta-4">
                  Help & Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindMatchSection;
