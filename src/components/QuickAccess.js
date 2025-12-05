import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import "../assets/css/QuickAccess.css";

import userIcon from "../assets/icons/user.png";
import gateIcon from "../assets/icons/gate.png";
import coupleIcon from "../assets/icons/couple.png";
import hallIcon from "../assets/icons/hall.png";
import cameraIcon from "../assets/icons/photo-camera.png";
import cakeIcon from "../assets/icons/cake.png";

const QuickAccess = () => {
  const services = [
    {
      icon: userIcon,
      title: "Browse Profiles",
      sub: "1200+ Verified Profiles",
      link: "/all-profiles",
    },
    {
      icon: gateIcon,
      title: "Wedding",
      sub: "Premium Wedding Services",
      link: "wedding-video.html",
    },
    {
      icon: coupleIcon,
      title: "All Services",
      sub: "Explore Everything",
      link: "services.html",
    },
    {
      icon: hallIcon,
      title: "Join Now",
      sub: "Start for Free",
      link: "plans.html",
    },
    {
      icon: cameraIcon,
      title: "Photo Gallery",
      sub: "Latest Moments",
      link: "photo-gallery.html",
    },
    {
      icon: cakeIcon,
      title: "Blog & Articles",
      sub: "Read Trending Posts",
      link: "blog.html",
    },
  ];

  return (
    <section className="qa-wrapper">
      <div className="container">
        <div className="qa-header">
          <p>Quick Access</p>
          <h2>Our Premium Services</h2>
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
              <div className="qa-card">
                <div className="qa-icon">
                  <img src={item.icon} alt="" />
                </div>

                <h4>{item.title}</h4>
                <p>{item.sub}</p>

                <Link to={item.link} className="qa-btn">
                  View More →
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default QuickAccess;
