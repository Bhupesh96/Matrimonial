import React, { useEffect, useState } from "react";
import { fetchCommunityEvents } from "../api";

const BlogSection = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // 1. State to pause auto-slide

  // CONFIG: Base URL for images
  const IMG_BASE_URL = "https://techwithus.in/matro/admin/plug/";
  const itemsToShow = 3; // Show 3 items at a time

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchCommunityEvents();
        const sortedData = data.sort(
          (a, b) => new Date(b.EventDate) - new Date(a.EventDate)
        );
        setEvents(sortedData);
      } catch (error) {
        console.error("Error fetching community events:", error);
      }
    };
    loadEvents();
  }, []);

  // 2. AUTO-SLIDE LOGIC
  useEffect(() => {
    // Only run if not paused and we have more items than shown
    if (isPaused || events.length <= itemsToShow) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // If we are at the end, loop back to 0, else go to next
        return prevIndex < events.length - itemsToShow ? prevIndex + 1 : 0;
      });
    }, 2000); // Speed: 4 seconds

    // Cleanup interval on unmount or when dependencies change
    return () => clearInterval(interval);
  }, [events.length, isPaused]);

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

  const nextSlide = () => {
    if (currentIndex < events.length - itemsToShow) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(events.length - itemsToShow);
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

            {/* 3. WRAPPER WITH MOUSE EVENTS TO PAUSE/RESUME */}
            <div
              className="blog"
              style={{ position: "relative" }}
              onMouseEnter={() => setIsPaused(true)} // Stop sliding on hover
              onMouseLeave={() => setIsPaused(false)} // Resume sliding on leave
            >
              {events.length > itemsToShow && (
                <>
                  <button
                    onClick={prevSlide}
                    style={{
                      position: "absolute",
                      left: "-40px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      zIndex: 10,
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      fontSize: "18px",
                      color: "#333",
                    }}
                  >
                    ❮
                  </button>
                  <button
                    onClick={nextSlide}
                    style={{
                      position: "absolute",
                      right: "-40px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      zIndex: 10,
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      fontSize: "18px",
                      color: "#333",
                    }}
                  >
                    ❯
                  </button>
                </>
              )}

              <div style={{ overflow: "hidden", width: "100%" }}>
                <ul
                  style={{
                    display: "flex",
                    transition: "transform 0.5s ease-in-out",
                    transform: `translateX(-${
                      currentIndex * (100 / itemsToShow)
                    }%)`,
                    padding: 0,
                    margin: 0,
                    width: `${(events.length / itemsToShow) * 100}%`,
                  }}
                >
                  {events.length > 0 ? (
                    events.map((event) => (
                      <li
                        key={event.EventID}
                        style={{
                          flex: "0 0 33.333%",
                          maxWidth: "33.333%",
                          boxSizing: "border-box",
                          padding: "0 15px",
                        }}
                      >
                        <div className="blog-box">
                          <div style={{ position: "relative" }}>
                            <img
                              src={fullURL(event.EventPosterURL)}
                              alt={event.EventTitle}
                              loading="lazy"
                              style={{
                                height: "300px",
                                width: "80%",
                                objectFit: "contain",
                              }}
                            />
                            <span
                              style={{
                                position: "absolute",
                                top: "10px",
                                left: "10px",
                                background: "#ff4d4d",
                                color: "#fff",
                                padding: "3px 10px",
                                fontSize: "11px",
                                borderRadius: "3px",
                                textTransform: "uppercase",
                              }}
                            >
                              {event.EventType}
                            </span>
                          </div>

                          <div style={{ padding: "15px 0" }}>
                            <div
                              style={{
                                color: "#777",
                                fontSize: "12px",
                                marginBottom: "5px",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                fontWeight: "600",
                              }}
                            >
                              <svg
                                width="14"
                                height="14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 6v6l4 2"></path>
                              </svg>
                              {formatDateTime(event.EventDate, event.EventTime)}
                            </div>

                            <h2
                              style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                margin: "5px 0 10px",
                                lineHeight: "1.3",
                              }}
                            >
                              {event.EventTitle}
                            </h2>

                            <p style={{ fontSize: "13px", color: "#555" }}>
                              {event.ShortDescription.length > 80
                                ? event.ShortDescription.substring(0, 80) +
                                  "..."
                                : event.ShortDescription}
                            </p>

                            <a
                              href={`/community#event-${event.EventID}`}
                              className="cta-dark"
                              style={{
                                marginTop: "10px",
                                display: "inline-block",
                              }}
                            >
                              <span>Read more</span>
                            </a>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                        padding: "20px",
                      }}
                    >
                      Loading events...
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
