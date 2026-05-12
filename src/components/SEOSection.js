import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/SEOSection.css";

/**
 * <SEOSection />
 *
 * Visible, keyword-rich on-page content for SEO.
 * Drop on any page (typically the Home page near the bottom).
 *
 * Includes:
 *  - Hero copy block targeting "Dewangan matrimony" keywords
 *  - "Why Dewangan Links" feature grid
 *  - City list (internal links boost coverage for "Dewangan brides in Raipur" etc.)
 *  - Accordion FAQ (matches the FAQPage JSON-LD in public/index.html → rich snippet)
 */
const FAQS = [
  {
    q: "Is Dewangan Links free to register?",
    a: "Yes — creating your matrimonial profile on Dewangan Links is completely free. You can browse verified Dewangan brides and grooms, send connection requests, and chat with matches at no cost.",
  },
  {
    q: "Who can register on Dewangan Links?",
    a: "Dewangan Links is built specifically for unmarried, divorced or widowed members of the Dewangan community across India who are looking for a life partner from within the samaj.",
  },
  {
    q: "Are the profiles on Dewangan Links verified?",
    a: "Every profile is manually reviewed and approved by our admin team in Raipur before it appears in search results. This way you only see trusted, genuine Dewangan matrimonial profiles.",
  },
  {
    q: "How do I find Dewangan grooms or brides near me?",
    a: "Use the Browse Profiles page and filter by city, gotra, age, education or occupation. We have active members from Raipur, Bhilai, Durg, Bilaspur, Korba and across India.",
  },
  {
    q: "How does the connection request system work?",
    a: "When you find an interesting profile, send a connection request. The receiver can accept or reject. Once accepted, full contact details unlock and you can start a conversation directly.",
  },
  {
    q: "Where is Dewangan Links based?",
    a: "Our office is in Raipur, Chhattisgarh. You can call or WhatsApp us at +91 98068 63659 or email raipurlink@gmail.com for help with your profile.",
  },
];

const CITIES = [
  "Raipur",
  "Bhilai",
  "Durg",
  "Bilaspur",
  "Korba",
  "Rajnandgaon",
  "Jagdalpur",
  "Ambikapur",
  "Dhamtari",
  "Mahasamund",
  "Kanker",
  "Janjgir",
];

const FEATURES = [
  {
    icon: "fa-shield",
    title: "100% Verified Profiles",
    text: "Every member is approved by our admin team — no fake or duplicate profiles.",
  },
  {
    icon: "fa-users",
    title: "Built for the Dewangan Samaj",
    text: "Search by gotra, mother tongue, native place and other community-specific filters.",
  },
  {
    icon: "fa-lock",
    title: "Privacy First",
    text: "Your contact details unlock only after both sides accept the connection request.",
  },
  {
    icon: "fa-heart",
    title: "Real Success Stories",
    text: "Couples married through Dewangan Links share their journeys to inspire yours.",
  },
  {
    icon: "fa-mobile",
    title: "Mobile Friendly",
    text: "A fast, modern interface designed to work beautifully on every device.",
  },
  {
    icon: "fa-phone",
    title: "Local Support in Raipur",
    text: "Reach a real person on call or WhatsApp — we're here to help your match journey.",
  },
];

const SEOSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="dw-seo-section">
      <div className="container">
        {/* ====== INTRO BLOCK ====== */}
        <div className="dw-seo-intro">
          <h2 className="dw-seo-h2">
            India&apos;s Most Trusted{" "}
            <span className="dw-seo-accent">Dewangan Matrimony</span> Platform
          </h2>
          <p className="dw-seo-lede">
            Welcome to <strong>Dewangan Links</strong> — the dedicated
            matrimonial site for the Dewangan community across India. Whether
            you&apos;re looking for a Dewangan bride, a Dewangan groom, or a
            family looking for a perfect rishta from within the samaj, you have
            arrived at the right place.
          </p>
          <p className="dw-seo-body">
            Our mission is to help every Dewangan family find a trusted,
            verified life partner that respects our shared traditions, gotra,
            and customs. Browse hundreds of active matrimonial profiles, filter
            by city, education, occupation and gotra, send a connection
            request, and let the journey to your wedding begin — all in a
            secure, family-friendly platform built and supported from{" "}
            <strong>Raipur, Chhattisgarh</strong>.
          </p>

          <div className="dw-seo-cta-row">
            <Link to="/sign-up" className="dw-seo-btn dw-seo-btn-primary">
              <i className="fa fa-heart" aria-hidden="true"></i> Register Free
            </Link>
            <Link to="/all-profiles" className="dw-seo-btn dw-seo-btn-ghost">
              <i className="fa fa-search" aria-hidden="true"></i> Browse
              Profiles
            </Link>
          </div>
        </div>

        {/* ====== FEATURES GRID ====== */}
        <div className="dw-seo-features">
          <h3 className="dw-seo-h3">
            Why thousands of families trust Dewangan Links
          </h3>
          <div className="dw-seo-feature-grid">
            {FEATURES.map((f) => (
              <div className="dw-seo-feature-card" key={f.title}>
                <div className="dw-seo-feature-icon">
                  <i className={`fa ${f.icon}`} aria-hidden="true"></i>
                </div>
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ====== CITY COVERAGE ====== */}
        <div className="dw-seo-cities">
          <h3 className="dw-seo-h3">
            Find Dewangan Matrimony Profiles Across India
          </h3>
          <p className="dw-seo-body">
            Active members from major Dewangan-community cities across
            Chhattisgarh and beyond:
          </p>
          <ul className="dw-seo-city-list" aria-label="Cities we serve">
            {CITIES.map((c) => (
              <li key={c}>
                <Link to="/all-profiles" title={`Dewangan Matrimony in ${c}`}>
                  Dewangan Matrimony in {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ====== FAQ ACCORDION ====== */}
        <div className="dw-seo-faq">
          <h3 className="dw-seo-h3">Frequently Asked Questions</h3>
          <p className="dw-seo-body">
            Got a question about the platform, registration, or finding the
            right match? Start here.
          </p>

          <div className="dw-seo-faq-list">
            {FAQS.map((item, idx) => {
              const open = openIdx === idx;
              return (
                <div
                  className={`dw-seo-faq-item ${open ? "is-open" : ""}`}
                  key={item.q}
                >
                  <button
                    type="button"
                    className="dw-seo-faq-q"
                    aria-expanded={open}
                    onClick={() => setOpenIdx(open ? -1 : idx)}
                  >
                    <span>{item.q}</span>
                    <i
                      className={`fa fa-chevron-${open ? "up" : "down"}`}
                      aria-hidden="true"
                    ></i>
                  </button>
                  {open && (
                    <div className="dw-seo-faq-a">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOSection;
