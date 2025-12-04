import Preloader from "../components/Preloader";
import PoopUpSearch from "../components/PoopUpSearch";
import TopMenu from "../components/TopMenu";
import MenuPopUp from "../components/MenuPopUp";
import ContactExpert from "../components/ContactExpert";
import MainMenu from "../components/MainMenu";
import MobileMenu from "../components/MobileMenu";
import DashboardMenu from "../components/DashBoardMenu";
import Footer from "../components/Footer";
import CopyRight from "../components/CopyRight";
import MeetOurTeam from "../components/MeetOurTeam";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { submitContactForm } from "../api";
const Contact = () => {
  const toast = useRef(null);
  return (
    <div>
      <Toast ref={toast} />
      <PoopUpSearch />
      <TopMenu />
      <MenuPopUp />
      <ContactExpert />
      <MainMenu />
      <MobileMenu />
      <DashboardMenu />
      <section>
        <div className="str">
          <div className="ban-inn ab-ban pg-cont">
            <div className="container">
              <div className="row">
                <div className="hom-ban">
                  <div className="ban-tit">
                    <span>We are here to assist you.</span>
                    <h1>Contact us</h1>
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
      {/* START */}
      <section>
        <div className="ab-sec2 pg-cont">
          <div className="container">
            <div className="row">
              <ul>
                <li>
                  <div className="we-here">
                    <h3>Our office</h3>
                    <p>
                      Most Trusted and premium Matrimony Service in the World.
                    </p>
                    <span>
                      <i className="fa fa-phone" aria-hidden="true"></i> +92
                      (8800) 68 - 8960
                    </span>
                    <span>
                      <i className="fa fa-envelope-o" aria-hidden="true"></i>{" "}
                      help@company.com
                    </span>
                    <span>
                      <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                      28800 Orchard Lake Road, Suite 180 Farmington Hills,
                      U.S.A.
                    </span>
                  </div>
                </li>
                <li>
                  <div className="we-cont">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/trust.png`}
                      alt=""
                    />
                    <h4>Customer Relations</h4>
                    <p>
                      Most Trusted and premium Matrimony Service in the World.
                    </p>
                    <a href="#!" className="cta-rou-line">
                      Get Support
                    </a>
                  </div>
                </li>
                <li>
                  <div className="we-cont">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/telephone.png`}
                      alt=""
                    />
                    <h4>WhatsApp Support</h4>
                    <p>
                      Most Trusted and premium Matrimony Service in the World.
                    </p>
                    <a href="#!" className="cta-rou-line">
                      Talk to sales
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* REGISTER */}
      <section>
        <div className="login pg-cont">
          <div className="container">
            <div className="row">
              <div className="inn">
                <div className="lhs">
                  <div className="tit">
                    <h2>
                      Now <b>Contact to us</b> Easy and fast.
                    </h2>
                  </div>
                  <div className="im">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/login-couple.png`}
                      alt=""
                    />
                  </div>
                  <div className="log-bg">&nbsp;</div>
                </div>
                <div className="rhs">
                  <div>
                    <div className="form-tit">
                      <h4>Let's talk</h4>
                      <h1>Send your enquiry now</h1>
                    </div>
                    <div className="form-login">
                      <form
                        className="cform fvali"
                        onSubmit={async (e) => {
                          e.preventDefault();

                          const name = e.target.name.value.trim();
                          const email = e.target.email.value.trim();
                          const mobile = e.target.phone.value.trim();
                          const message = e.target.message.value.trim();

                          try {
                            await submitContactForm({
                              name,
                              email,
                              mobile,
                              message,
                            });

                            toast.current.show({
                              severity: "success",
                              summary: "Success",
                              detail: "Your message was sent successfully!",
                              life: 3000,
                            });

                            e.target.reset(); // Reset form
                          } catch (error) {
                            toast.current.show({
                              severity: "error",
                              summary: "Failed",
                              detail: error.message || "Unable to send message",
                              life: 3000,
                            });
                          }
                        }}
                      >
                        <div className="form-group">
                          <label className="lb">Name:</label>
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter your full name"
                            name="name"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="lb">Email:</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            name="email"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="lb">Phone:</label>
                          <input
                            type="number"
                            className="form-control"
                            id="phone"
                            placeholder="Enter phone number"
                            name="phone"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="lb">Message:</label>
                          <textarea
                            name="message"
                            className="form-control"
                            id="message"
                            placeholder="Enter message"
                            required
                          ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">
                          Send Enquiry
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* START */}
      <MeetOurTeam />
      <Footer />
      <CopyRight />
    </div>
  );
};

export default Contact;
