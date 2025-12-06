import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../assets/css/CustomerReviews.css";

const CustomerReviews = () => {
  const reviews = [
    {
      img: `${process.env.PUBLIC_URL}/images/user/1.jpg`,
      name: "Aarav & Meera",
      city: "Mumbai",
    },
    {
      img: `${process.env.PUBLIC_URL}/images/user/2.jpg`,
      name: "Rohan & Kriti",
      city: "Delhi",
    },
    {
      img: `${process.env.PUBLIC_URL}/images/user/3.jpg`,
      name: "Vikram & Anjali",
      city: "Pune",
    },
    {
      img: `${process.env.PUBLIC_URL}/images/user/5.jpg`,
      name: "Samar & Priya",
      city: "Bangalore",
    },
  ];

  return (
    <section className="premium-review-section">
      <div className="container">
        <div className="home-tit">
          <p>Trusted by Families</p>
          <h2>
            <span>
              Trust by <b class="num">1500</b>+ Couples
            </span>
          </h2>
          <span class="leaf1"></span>
          <span class="tit-ani-"></span>
        </div>

        <Swiper
          slidesPerView={3}
          spaceBetween={25}
          autoplay={{ delay: 2500 }}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            320: { slidesPerView: 1 },
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="review-swiper"
        >
          {reviews.map((r, index) => (
            <SwiperSlide key={index}>
              <div className="review-card">
                <div className="review-img-box">
                  <img
                    src={process.env.PUBLIC_URL + r.img}
                    alt={r.name}
                    className="review-img"
                  />

                  <span className="dot dot1"></span>
                  <span className="dot dot2"></span>
                  <span className="dot dot3"></span>
                </div>

                <p className="review-text">
                  “We found each other through this platform. The process was
                  smooth and stress-free. Truly grateful!”
                </p>

                <h5 className="review-name">{r.name}</h5>
                <span className="review-city">{r.city}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="review-cta">
          <a href="#!" className="cta-btn">
            View More Experiences
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
