import React from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Import images properly
import userIcon from "../assets/icons/user.png";
import gateIcon from "../assets/icons/gate.png";
import coupleIcon from "../assets/icons/couple.png";
import hallIcon from "../assets/icons/hall.png";
import cameraIcon from "../assets/icons/photo-camera.png";
import cakeIcon from "../assets/icons/cake.png";

const cardStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  minHeight: "220px",
};

const imgStyle = {
  width: "60px",
  height: "60px",
  objectFit: "contain",
  marginBottom: "15px",
};

const QuickAccess = () => {
  return (
    <section style={{ padding: "40px 0" }}>
      <div className="str home-acces-main">
        <div className="container">
          <div className="row">
            <div class="home-tit">
              <p>Quick Access</p>
              <h2>
                <span>Our Services</span>
              </h2>
              <span class="leaf1"></span>
              <span class="tit-ani-"></span>
            </div>

            <div className="home-acces">
              <Swiper
                slidesPerView={4}
                spaceBetween={20}
                autoplay={{ delay: 2500 }}
                loop={true}
                modules={[Autoplay]}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  576: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {/* 1 */}
                <SwiperSlide>
                  <div style={cardStyle}>
                    <img src={userIcon} alt="" style={imgStyle} />
                    <h4>Browse Profiles</h4>
                    <p>1200+ Profiles</p>
                    <Link to="/all-profiles">View more</Link>
                  </div>
                </SwiperSlide>

                {/* 2 */}
                <SwiperSlide>
                  <div style={cardStyle}>
                    <img src={gateIcon} alt="" style={imgStyle} />
                    <h4>Wedding</h4>
                    <p>Wedding Services</p>
                    <a href="wedding-video.html">View more</a>
                  </div>
                </SwiperSlide>

                {/* 3 */}
                <SwiperSlide>
                  <div style={cardStyle}>
                    <img src={coupleIcon} alt="" style={imgStyle} />
                    <h4>All Services</h4>
                    <p>1200+ Profiles</p>
                    <a href="services.html">View more</a>
                  </div>
                </SwiperSlide>

                {/* 4 */}
                <SwiperSlide>
                  <div style={cardStyle}>
                    <img src={hallIcon} alt="" style={imgStyle} />
                    <h4>Join Now</h4>
                    <p>Start for free</p>
                    <a href="plans.html">Get started</a>
                  </div>
                </SwiperSlide>

                {/* 5 */}
                <SwiperSlide>
                  <div style={cardStyle}>
                    <img src={cameraIcon} alt="" style={imgStyle} />
                    <h4>Photo Gallery</h4>
                    <p>1200+ Photos</p>
                    <a href="photo-gallery.html">View more</a>
                  </div>
                </SwiperSlide>

                {/* 6 */}
                <SwiperSlide>
                  <div style={cardStyle}>
                    <img src={cakeIcon} alt="" style={imgStyle} />
                    <h4>Blog & Articles</h4>
                    <p>Read Latest Articles</p>
                    <a href="blog.html">Get started</a>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
