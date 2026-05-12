import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../assets/css/CustomerReviews.css";

import { fetchActiveTestimonials, fetchTestimonials } from "../api";
import { Link } from "react-router-dom";
import { resolveImageUrl } from "../utils/imageUrl";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);

  const fullURL = (img) => resolveImageUrl(img);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        // Prefer the public approved-only endpoint; fall back to the full
        // list (filtered client-side) if it isn't available yet.
        let approved = [];
        try {
          approved = await fetchActiveTestimonials();
        } catch (_) {
          const all = await fetchTestimonials();
          approved = all.filter(
            (t) => Number(t.IsApproved) === 1 && t.DeleteFlag === "N",
          );
        }
        setReviews(approved);
      } catch (err) {
        console.log("Testimonial load error:", err);
      }
    };

    loadReviews();
  }, []);

  return (
    <section className="premium-review-section">
      <div className="container">
        <div className="home-tit">
          <p>Trusted by Families</p>
          <h2>
            <span>
              Trust by <b className="num">1500</b>+ Couples
            </span>
          </h2>
          <span className="leaf1"></span>
          <span className="tit-ani-"></span>
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
          {reviews.map((r) => (
            <SwiperSlide key={r.TestimonialID}>
              <div className="review-card">
                <div className="review-img-box">
                  <img
                    src={
                      r.PersonPhoto
                        ? fullURL(r.PersonPhoto)
                        : process.env.PUBLIC_URL + "/images/default.png"
                    }
                    alt={r.PersonName}
                    className="review-img"
                  />

                  <span className="dot dot1"></span>
                  <span className="dot dot2"></span>
                  <span className="dot dot3"></span>
                </div>

                <p className="review-text">“{r.TestimonialMessage}”</p>

                <h5 className="review-name">{r.PersonName}</h5>
                <span className="review-city">Happy Member</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="review-cta">
          <Link to="/experiences" className="cta-btn">
            View More Experiences
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
