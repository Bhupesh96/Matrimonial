import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import "../assets/css/QuickAccess.css";

const MandapIcon = () => (
  <svg
    width="65"
    height="65"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="mandap-gold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f6e7c5" />
        <stop offset="100%" stopColor="#b28a45" />
      </linearGradient>
    </defs>

    <rect x="10" y="12" width="44" height="6" rx="3" fill="#583c07" />

    <path
      d="M12 18 C20 32 44 32 52 18"
      fill="none"
      stroke="#d26a6a"
      strokeWidth="3"
      strokeLinecap="round"
    />

    <circle cx="18" cy="28" r="2" fill="#d26a6a" />
    <circle cx="26" cy="30" r="2" fill="#e49f3c" />
    <circle cx="38" cy="30" r="2" fill="#e49f3c" />
    <circle cx="46" cy="28" r="2" fill="#d26a6a" />

    <rect x="12" y="18" width="8" height="32" rx="4" fill="url(#mandap-gold)" />
    <rect x="44" y="18" width="8" height="32" rx="4" fill="url(#mandap-gold)" />

    <rect x="10" y="48" width="44" height="6" rx="3" fill="#c7a770" />
  </svg>
);

const RingsIcon = () => (
  <svg width="65" height="65" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="rings-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b28a45" />
        <stop offset="100%" stopColor="#f1dd9b" />
      </linearGradient>
    </defs>

    <circle
      cx="26"
      cy="36"
      r="13"
      fill="none"
      stroke="#583c07"
      strokeWidth="3.5"
    />
    <circle
      cx="26"
      cy="36"
      r="9"
      fill="none"
      stroke="#f5e6c6"
      strokeWidth="2"
    />

    <circle
      cx="38"
      cy="32"
      r="13"
      fill="none"
      stroke="url(#rings-gold)"
      strokeWidth="3.5"
    />
    <circle
      cx="38"
      cy="32"
      r="9"
      fill="none"
      stroke="#fef9e7"
      strokeWidth="2"
    />

    <polygon
      points="34,14 38,10 42,14 40,18 36,18"
      fill="#fef9e7"
      stroke="#b28a45"
      strokeWidth="1"
    />
  </svg>
);

const ShehnaiIcon = () => (
  <svg width="65" height="65" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="shehnai" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b28a45" />
        <stop offset="100%" stopColor="#d9c08a" />
      </linearGradient>
    </defs>

    <rect x="6" y="29" width="30" height="6" rx="3" fill="#583c07" />
    <rect x="10" y="28" width="2" height="8" rx="1" fill="#d9c08a" />
    <rect x="15" y="28" width="2" height="8" rx="1" fill="#d9c08a" />
    <rect x="20" y="28" width="2" height="8" rx="1" fill="#d9c08a" />

    <path
      d="M36 24 L54 20 C57 19 60 21 60 24 L60 40 C60 43 57 45 54 44 L36 40 Z"
      fill="url(#shehnai)"
    />

    <circle cx="24" cy="32" r="1.3" fill="#f5e6c6" />
    <circle cx="28" cy="32" r="1.3" fill="#f5e6c6" />
    <circle cx="32" cy="32" r="1.3" fill="#f5e6c6" />
  </svg>
);

const BrideGroomIcon = () => (
  <svg width="65" height="65" viewBox="0 0 64 64">
    <circle cx="22" cy="22" r="6" fill="#583c07" />
    <path d="M15 36 C16 30 28 30 29 36 L29 46 H15 Z" fill="#7a5a2a" />

    <circle cx="42" cy="22" r="6" fill="#583c07" />
    <path d="M36 22 C40 30 48 32 50 40 L34 40 Z" fill="#d26a6a" opacity="0.9" />
    <path d="M36 36 C38 30 48 30 50 36 L50 46 H36 Z" fill="#b28a45" />
  </svg>
);

const GalleryIcon = () => (
  <svg width="65" height="65" viewBox="0 0 64 64">
    <rect
      x="10"
      y="14"
      width="44"
      height="36"
      rx="6"
      fill="#f9e9cf"
      stroke="#c9a56b"
      strokeWidth="2"
    />

    <circle cx="24" cy="26" r="6" fill="#d26a6a" />

    <path
      d="M14 44 L26 32 L36 40 L44 34 L54 44 Z"
      fill="#b28a45"
      stroke="#583c07"
      strokeWidth="2"
    />
  </svg>
);

const BlogIcon = () => (
  <svg width="65" height="65" viewBox="0 0 64 64">
    <rect
      x="12"
      y="12"
      width="40"
      height="40"
      rx="8"
      fill="#fff6e0"
      stroke="#c9a56b"
      strokeWidth="2"
    />
    <rect x="20" y="22" width="24" height="4" rx="2" fill="#b28a45" />
    <rect x="20" y="30" width="20" height="4" rx="2" fill="#d6b06f" />
    <rect x="20" y="38" width="24" height="4" rx="2" fill="#c9a56b" />
  </svg>
);

const QuickAccess = () => {
  const services = [
    {
      icon: <RingsIcon />,
      title: "Browse Profiles",
      sub: "1200+ Verified Matches",
      link: "/all-profiles",
    },

    {
      icon: <ShehnaiIcon />,
      title: "Join Now",
      sub: "Create Free Account",
      link: "plans.html",
    },
    {
      icon: <GalleryIcon />,
      title: "Photo Gallery",
      sub: "Beautiful Moments",
      link: "photo-gallery.html",
    },
    {
      icon: <BlogIcon />,
      title: "Community",
      sub: "Get Latest Updates",
      link: "blog.html",
    },
  ];

  return (
    <section className="qa-wrapper">
      <div className="container">
        <div className="home-tit">
          <p>Quick Access</p>
          <h2>
            <span>Our Services</span>
          </h2>
          <span class="leaf1"></span>
        </div>

        <Swiper
          slidesPerView={4}
          spaceBetween={24}
          autoplay={{ delay: 2500 }}
          loop
          modules={[Autoplay]}
          breakpoints={{
            320: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {services.map((item, index) => (
            <SwiperSlide key={index}>
              <div class="home-acces">
                <ul className="qa-card">
                  <div className="con">{item.icon}</div>

                  <h4>{item.title}</h4>
                  <p>{item.sub}</p>

                  <Link to={item.link} className="qa-btn">
                    View More →
                  </Link>
                </ul>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default QuickAccess;
