import React from "react";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const imgStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  objectFit: "cover",
  display: "block",
  margin: "0 auto",
  position: "relative",
  zIndex: 2,
};

const circleStyle1 = {
  width: "20px",
  height: "20px",
  background: "#ff6f61",
  borderRadius: "50%",
  position: "absolute",
  right: "-5px",
  top: "5px",
};

const circleStyle2 = {
  width: "15px",
  height: "15px",
  background: "#2db7f5",
  borderRadius: "50%",
  position: "absolute",
  left: "-5px",
  bottom: "10px",
};

const circleStyle3 = {
  width: "10px",
  height: "10px",
  background: "#ffc107",
  borderRadius: "50%",
  position: "absolute",
  right: "10px",
  bottom: "-5px",
};

const boxStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
  position: "relative",
  minHeight: "320px",
};

const CustomerReviews = () => {
  return (
    <section>
      <div className="hom-cus-revi">
        <div className="container">
          <div className="row">
            {/* TITLE */}
            <div className="home-tit">
              <p>trusted brand</p>
              <h2>
                <span>
                  Trust by <b className="num">1500</b>+ Couples
                </span>
              </h2>
              <span className="leaf1"></span>
              <span className="tit-ani-"></span>
            </div>

            {/* SWIPER START */}
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              autoplay={{ delay: 2500 }}
              loop={true}
              modules={[Autoplay]}
              breakpoints={{
                320: { slidesPerView: 1 },
                576: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="cus-revi"
            >
              {/* CARD 1 */}
              <SwiperSlide>
                <div style={boxStyle}>
                  <div
                    style={{
                      position: "relative",
                      width: "80px",
                      margin: "0 auto",
                    }}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/user/1.jpg`}
                      alt=""
                      style={imgStyle}
                    />

                    <i style={circleStyle1}></i>
                    <i style={circleStyle2}></i>
                    <i style={circleStyle3}></i>
                  </div>

                  <p style={{ marginTop: "15px" }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <h5 style={{ margin: "10px 0 0", fontWeight: "600" }}>
                    Jack danial
                  </h5>
                  <span style={{ color: "#777" }}>New York</span>
                </div>
              </SwiperSlide>

              {/* CARD 2 */}
              <SwiperSlide>
                <div style={boxStyle}>
                  <div
                    style={{
                      position: "relative",
                      width: "80px",
                      margin: "0 auto",
                    }}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/user/2.jpg`}
                      alt=""
                      style={imgStyle}
                    />

                    <i style={circleStyle1}></i>
                    <i style={circleStyle2}></i>
                    <i style={circleStyle3}></i>
                  </div>

                  <p style={{ marginTop: "15px" }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <h5 style={{ margin: "10px 0 0", fontWeight: "600" }}>
                    Jack danial
                  </h5>
                  <span style={{ color: "#777" }}>New York</span>
                </div>
              </SwiperSlide>

              {/* CARD 3 */}
              <SwiperSlide>
                <div style={boxStyle}>
                  <div
                    style={{
                      position: "relative",
                      width: "80px",
                      margin: "0 auto",
                    }}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/user/3.jpg`}
                      alt=""
                      style={imgStyle}
                    />

                    <i style={circleStyle1}></i>
                    <i style={circleStyle2}></i>
                    <i style={circleStyle3}></i>
                  </div>

                  <p style={{ marginTop: "15px" }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <h5 style={{ margin: "10px 0 0", fontWeight: "600" }}>
                    Jack danial
                  </h5>
                  <span style={{ color: "#777" }}>New York</span>
                </div>
              </SwiperSlide>

              {/* CARD 4 */}
              <SwiperSlide>
                <div style={boxStyle}>
                  <div
                    style={{
                      position: "relative",
                      width: "80px",
                      margin: "0 auto",
                    }}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/user/5.jpg`}
                      alt=""
                      style={imgStyle}
                    />

                    <i style={circleStyle1}></i>
                    <i style={circleStyle2}></i>
                    <i style={circleStyle3}></i>
                  </div>

                  <p style={{ marginTop: "15px" }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <h5 style={{ margin: "10px 0 0", fontWeight: "600" }}>
                    Jack danial
                  </h5>
                  <span style={{ color: "#777" }}>New York</span>
                </div>
              </SwiperSlide>
            </Swiper>
            {/* SWIPER END */}

            {/* CTA BUTTON */}
            <div className="cta-full-wid">
              <a href="#!" className="cta-dark">
                More customer reviews
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
