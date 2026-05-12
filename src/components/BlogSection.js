import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchCommunityEvents } from "../api";
import { resolveImageUrl } from "../utils/imageUrl";

import "../assets/css/BlogSection.css";

const excerpt = (text, max = 100) => {
  const t = (text || "").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
};

const BlogSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchCommunityEvents();
        const activeOnly = data.filter((e) => Number(e?.IsActive) === 1);
        const sorted = [...activeOnly].sort(
          (a, b) => new Date(b.EventDate) - new Date(a.EventDate),
        );
        setEvents(sorted);
      } catch (error) {
        console.error("Error fetching community events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const fullURL = (img) => {
    if (!img) return `${process.env.PUBLIC_URL}/images/blog/default.jpg`;
    return (
      resolveImageUrl(img) || `${process.env.PUBLIC_URL}/images/blog/default.jpg`
    );
  };

  const formatDateTime = (dateStr, timeStr) => {
    try {
      const dateObj = new Date(dateStr);
      const dateOptions = { day: "numeric", month: "short", year: "numeric" };
      const formattedDate = dateObj.toLocaleDateString("en-IN", dateOptions);
      if (!timeStr) return formattedDate;
      const timeParts = String(timeStr).split(":");
      let formattedTime = timeStr;
      if (timeParts.length >= 2) {
        const hour = parseInt(timeParts[0], 10);
        const minute = timeParts[1]?.slice(0, 2) || "00";
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        formattedTime = `${hour12}:${minute} ${ampm}`;
      }
      return `${formattedDate} · ${formattedTime}`;
    } catch {
      return `${dateStr || ""} ${timeStr || ""}`.trim();
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
                <span>Events &amp; News</span>
              </h2>
              <span className="leaf1"></span>
              <span className="tit-ani-"></span>
            </div>

            <div className="blog dw-event-swiper-wrap">
              {loading ? (
                <div className="dw-event-empty dw-event-empty--muted">
                  Loading events…
                </div>
              ) : events.length === 0 ? (
                <div className="dw-event-empty">
                  No upcoming events right now.{" "}
                  <Link to="/community">View community page</Link> for updates.
                </div>
              ) : (
                <Swiper
                  className="dw-event-swiper"
                  modules={[Autoplay, Navigation]}
                  spaceBetween={24}
                  slidesPerView={3}
                  navigation
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 16 },
                    576: { slidesPerView: 1.15, spaceBetween: 16 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 24 },
                  }}
                  style={{ padding: "10px 0" }}
                >
                  {events.map((event) => (
                    <SwiperSlide key={event.EventID} style={{ height: "auto" }}>
                      <article className="dw-event-card">
                        <div className="dw-event-card__media">
                          <img
                            src={fullURL(event.EventPosterURL)}
                            alt={event.EventTitle || "Event"}
                            loading="lazy"
                          />
                          {event.EventType ? (
                            <span className="dw-event-card__tag">
                              {event.EventType}
                            </span>
                          ) : null}
                        </div>
                        <div className="dw-event-card__body">
                          <div className="dw-event-card__meta">
                            <i className="fa fa-clock-o" aria-hidden="true" />
                            {formatDateTime(event.EventDate, event.EventTime)}
                          </div>
                          <h3 className="dw-event-card__title">
                            {event.EventTitle}
                          </h3>
                          <p className="dw-event-card__excerpt">
                            {excerpt(event.ShortDescription, 110)}
                          </p>
                          <Link
                            className="dw-event-card__link"
                            to={`/community#event-${event.EventID}`}
                          >
                            Read more{" "}
                            <i className="fa fa-angle-right" aria-hidden="true" />
                          </Link>
                        </div>
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
