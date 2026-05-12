import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
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
import AlertService from "../services/AlertServices";
import { submitContactForm } from "../api";

import "../assets/css/Contact.css";

const PHONE_DISPLAY = "+91 98068 63659";
const PHONE_TEL = "+919806863659";
const EMAIL = "raipurlink@gmail.com";
const WA_LINK = "https://wa.me/919806863659";

const Contact = () => {
  usePageTitle("Contact Us", {
    description:
      "Get in touch with Dewangan Links — call, WhatsApp, or email our team in Raipur, Chhattisgarh.",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const mobile = form.phone.value.trim();
    const message = form.message.value.trim();

    setSubmitting(true);
    try {
      await submitContactForm({ name, email, mobile, message });
      AlertService.showSuccess("Your message was sent successfully!");
      form.reset();
    } catch (error) {
      AlertService.showError(error.message || "Unable to send message");
    } finally {
      setSubmitting(false);
    }
  }, []);

  return (
    <div className="dw-contact-page">
      <PoopUpSearch />
      <TopMenu />
      <MenuPopUp />
      <ContactExpert />
      <MainMenu />
      <MobileMenu />
      <DashboardMenu />

      <section className="dw-contact-hero" aria-labelledby="dw-contact-title">
        <div className="dw-contact-hero__glow" aria-hidden="true" />
        <div className="container dw-contact-hero__inner">
          <p className="dw-contact-hero__eyebrow">Dewangan Links · Support</p>
          <h1 id="dw-contact-title" className="dw-contact-hero__title">
            We’re here to help
            <span>Questions, feedback, or help with your profile</span>
          </h1>
          <p className="dw-contact-hero__lead">
            Reach our team in Raipur by phone, email, or WhatsApp — or send a
            message below and we’ll get back to you.
          </p>
        </div>
      </section>

      <section className="dw-contact-body" aria-label="Contact options and form">
        <div className="container">
          <div className="dw-contact-grid">
            <aside className="dw-contact-aside">
              <div className="dw-contact-card dw-contact-card--office">
                <p className="dw-contact-card__label">Office</p>
                <h2 className="dw-contact-card__title">Dewangan Links</h2>
                <p className="dw-contact-card__text">
                  Trusted matrimony for the Dewangan community. Walk-ins by
                  appointment; we reply to messages as soon as we can.
                </p>
                <ul className="dw-contact-card__list">
                  <li>
                    <span className="dw-contact-card__icon" aria-hidden="true">
                      <i className="fa fa-map-marker" />
                    </span>
                    <div>
                      <strong>Address</strong>
                      <br />
                      Raipur, Chhattisgarh, India
                    </div>
                  </li>
                  <li>
                    <span className="dw-contact-card__icon" aria-hidden="true">
                      <i className="fa fa-phone" />
                    </span>
                    <div>
                      <strong>Phone</strong>
                      <br />
                      <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
                    </div>
                  </li>
                  <li>
                    <span className="dw-contact-card__icon" aria-hidden="true">
                      <i className="fa fa-envelope-o" />
                    </span>
                    <div>
                      <strong>Email</strong>
                      <br />
                      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="dw-contact-quick">
                <a className="dw-contact-quick__btn" href={`tel:${PHONE_TEL}`}>
                  <i className="fa fa-phone" aria-hidden="true" />
                  Call us
                </a>
                <a className="dw-contact-quick__btn" href={`mailto:${EMAIL}`}>
                  <i className="fa fa-envelope-o" aria-hidden="true" />
                  Email
                </a>
                <a
                  className="dw-contact-quick__btn dw-contact-quick__btn--wa"
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-whatsapp" aria-hidden="true" />
                  WhatsApp
                </a>
                <Link className="dw-contact-quick__btn" to="/community">
                  <i className="fa fa-users" aria-hidden="true" />
                  Community
                </Link>
              </div>
            </aside>

            <div className="dw-contact-form-wrap">
              <header className="dw-contact-form__head">
                <p className="dw-contact-form__eyebrow">Send a message</p>
                <h2 className="dw-contact-form__title">Write to us</h2>
                <p className="dw-contact-form__sub">
                  Share your name, contact details, and how we can help. Fields
                  marked below are all required.
                </p>
              </header>

              <form className="dw-contact-form" onSubmit={handleSubmit} noValidate>
                <div className="dw-contact-field">
                  <label htmlFor="dw-contact-name">Full name</label>
                  <input
                    id="dw-contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="dw-contact-field">
                  <label htmlFor="dw-contact-email">Email</label>
                  <input
                    id="dw-contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="dw-contact-field">
                  <label htmlFor="dw-contact-phone">Mobile</label>
                  <input
                    id="dw-contact-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="10-digit mobile number"
                    required
                  />
                </div>
                <div className="dw-contact-field">
                  <label htmlFor="dw-contact-message">Message</label>
                  <textarea
                    id="dw-contact-message"
                    name="message"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <div className="dw-contact-form__actions">
                  <button
                    type="submit"
                    className="dw-contact-submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <i className="fa fa-spinner fa-spin" aria-hidden="true" />{" "}
                        Sending…
                      </>
                    ) : (
                      <>
                        <i className="fa fa-paper-plane" aria-hidden="true" /> Send
                        enquiry
                      </>
                    )}
                  </button>
                  <span className="dw-contact-form__note">
                    We typically respond within one business day.
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="dw-contact-team-wrap">
        <MeetOurTeam />
      </div>

      <Footer />
      <CopyRight />
    </div>
  );
};

export default Contact;
