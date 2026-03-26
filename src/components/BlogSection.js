import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchCommunityEvents } from "../api";

const BlogSection = () => {
  const [events, setEvents] = useState([]);

  // CONFIG: Base URL for images
  const IMG_BASE_URL = "https://techwithus.in/matro/admin/plug/";

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchCommunityEvents();
        const sortedData = data.sort(
          (a, b) => new Date(b.EventDate) - new Date(a.EventDate),
        );
        setEvents(sortedData);
      } catch (error) {
        console.error("Error fetching community events:", error);
      }
    };
    loadEvents();
  }, []);

  const fullURL = (img) => {
    if (!img) return "images/blog/default.jpg";
    return img.startsWith("http") ? img : `${IMG_BASE_URL}${img}`;
  };

  const formatDateTime = (dateStr, timeStr) => {
    try {
      const dateObj = new Date(dateStr);
      const dateOptions = { day: "numeric", month: "short", year: "numeric" };
      const formattedDate = dateObj.toLocaleDateString("en-US", dateOptions);

      const timeParts = timeStr.split(":");
      let formattedTime = timeStr;
      if (timeParts.length >= 2) {
        const hour = parseInt(timeParts[0]);
        const minute = timeParts[1];
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        formattedTime = `${hour12}:${minute} ${ampm}`;
      }
      return `${formattedDate} • ${formattedTime}`;
    } catch (e) {
      return `${dateStr} ${timeStr}`;
    }
  };

  return (
    <section>
      <div className="hom-blog">
        <div className="container">
          <div className="row">
            <div className="home-tit">
              <p>Community Updates</p>
              <h2>
                <span>Events & News</span>
              </h2>
              <span className="leaf1"></span>
              <span className="tit-ani-"></span>
            </div>

            <div
              className="blog"
              style={{ position: "relative", padding: "0 15px" }}
            >
              {events.length > 0 ? (
                <Swiper
                  modules={[Autoplay, Navigation]}
                  spaceBetween={30}
                  slidesPerView={3}
                  navigation={true} // Enables built-in prev/next arrows
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true, // Native Swiper pause on hover!
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1 }, // Mobile: 1 item
                    768: { slidesPerView: 2 }, // Tablet: 2 items
                    1024: { slidesPerView: 3 }, // Desktop: 3 items
                  }}
                  style={{ padding: "10px 0" }} // Room for box-shadows
                >
                  {events.map((event) => (
                    <SwiperSlide key={event.EventID} style={{ height: "auto" }}>
                      <div
                        className="blog-box"
                        style={{
                          height: "100%", // Forces equal height columns
                          display: "flex",
                          flexDirection: "column",
                          background: "#fff",
                          borderRadius: "12px",
                          boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                          overflow: "hidden",
                          border: "1px solid #f0f0f0",
                        }}
                      >
                        {/* IMAGE CONTAINER */}
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "240px",
                          }}
                        >
                          <img
                            src={fullURL(event.EventPosterURL)}
                            alt={event.EventTitle}
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover", // Fixes the unequal image sizes perfectly
                            }}
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: "15px",
                              left: "15px",
                              background: "#e5026b",
                              color: "#fff",
                              padding: "4px 12px",
                              fontSize: "11px",
                              borderRadius: "4px",
                              textTransform: "uppercase",
                              fontWeight: "600",
                              letterSpacing: "1px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                            }}
                          >
                            {event.EventType}
                          </span>
                        </div>

                        {/* CONTENT CONTAINER */}
                        <div
                          style={{
                            padding: "25px",
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: 1, // Pushes the button to the bottom
                          }}
                        >
                          <div
                            style={{
                              color: "#888",
                              fontSize: "13px",
                              marginBottom: "10px",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              fontWeight: "500",
                            }}
                          >
                            <i className="fa fa-clock-o"></i>
                            {formatDateTime(event.EventDate, event.EventTime)}
                          </div>

                          <h2
                            style={{
                              fontSize: "19px",
                              fontWeight: "700",
                              margin: "0 0 12px",
                              lineHeight: "1.4",
                              color: "#222",
                            }}
                          >
                            {event.EventTitle}
                          </h2>

                          <p
                            style={{
                              fontSize: "14px",
                              color: "#666",
                              lineHeight: "1.6",
                              marginBottom: "20px",
                            }}
                          >
                            {event.ShortDescription.length > 90
                              ? event.ShortDescription.substring(0, 90) + "..."
                              : event.ShortDescription}
                          </p>

                          {/* CTA BUTTON (Pushed to bottom) */}
                          <div style={{ marginTop: "auto" }}>
                            <Link
                              to={`/community#event-${event.EventID}`}
                              style={{
                                display: "inline-block",
                                padding: "8px 0",
                                color: "#e5026b",
                                fontWeight: "600",
                                fontSize: "14px",
                                textTransform: "uppercase",
                                borderBottom: "2px solid #e5026b",
                                textDecoration: "none",
                              }}
                            >
                              Read more{" "}
                              <i
                                className="fa fa-angle-right"
                                style={{ marginLeft: "4px" }}
                              ></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "40px",
                  }}
                >
                  Loading events...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
