import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/Community.css";

import { fetchCommunityEvents } from "../api";
import { resolveImageUrl } from "../utils/imageUrl";
import usePageTitle from "../hooks/usePageTitle";
import ContactExpert from "../components/ContactExpert";
import CopyRight from "../components/CopyRight";
import DashboardMenu from "../components/DashBoardMenu";
import Footer from "../components/Footer";
import MainMenu from "../components/MainMenu";
import MenuPopUp from "../components/MenuPopUp";
import MobileMenu from "../components/MobileMenu";
import PoopUpSearch from "../components/PoopUpSearch";
import Preloader from "../components/Preloader";
import TopMenu from "../components/TopMenu";

function formatEventDateLabel(raw) {
  if (!raw || typeof raw !== "string") return raw || "";
  const d = new Date(raw.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const Community = () => {
  usePageTitle("Community Events", {
    description:
      "Upcoming meetups, webinars and social gatherings for the Dewangan community across India.",
  });
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flashId, setFlashId] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        let events = await fetchCommunityEvents();
        events = [...events].sort(
          (a, b) => new Date(b.EventDate) - new Date(a.EventDate),
        );
        setPosts(events);
      } catch (err) {
        console.error("Community API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const activeCount = useMemo(
    () => posts.filter((p) => p.IsActive === 1).length,
    [posts],
  );

  const scrollToHash = useCallback((hash) => {
    if (!hash || typeof document === "undefined") return;
    const id = hash.replace(/^#/, "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setFlashId(id);
      window.setTimeout(() => setFlashId(null), 2400);
    });
  }, []);

  useEffect(() => {
    if (loading || posts.length === 0) return;
    const hash = location.hash || "";
    if (!hash) return;
    const t = window.setTimeout(() => scrollToHash(hash), 120);
    return () => window.clearTimeout(t);
  }, [loading, posts, location.hash, scrollToHash]);

  useEffect(() => {
    const onHash = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [scrollToHash, posts.length]);

  const fullURL = (img) => resolveImageUrl(img);

  if (loading) return <Preloader />;

  return (
    <div className="dw-community-page">
      <PoopUpSearch />
      <TopMenu />
      <MenuPopUp />
      <ContactExpert />
      <MainMenu />
      <MobileMenu />
      <DashboardMenu />

      <section className="dw-community-hero" aria-labelledby="dw-community-title">
        <div className="dw-community-hero__glow" aria-hidden="true" />
        <div className="dw-community-hero__pattern" aria-hidden="true" />
        <div className="container dw-community-hero__inner">
          <p className="dw-community-hero__eyebrow">Dewangan Links · Community</p>
          <h1 id="dw-community-title" className="dw-community-hero__title">
            Gatherings, updates &amp; moments{" "}
            <span className="dw-community-hero__title-accent">we share together</span>
          </h1>
          <p className="dw-community-hero__lead">
            Meetups, webinars and celebrations across India. Save or share a
            link to this page to return to a specific update later.
          </p>
          <div className="dw-community-hero__stats" role="list">
            <div className="dw-community-stat" role="listitem">
              <span className="dw-community-stat__value">{posts.length}</span>
              <span className="dw-community-stat__label">Updates</span>
            </div>
            <div className="dw-community-stat" role="listitem">
              <span className="dw-community-stat__value">{activeCount}</span>
              <span className="dw-community-stat__label">Active</span>
            </div>
            <Link className="dw-community-hero__cta" to="/contact">
              <i className="fa fa-envelope-o" aria-hidden="true" /> Host an event
            </Link>
          </div>
        </div>
      </section>

      <section className="dw-community-body">
        <div className="container">
          {posts.length === 0 ? (
            <div className="dw-community-empty">
              <div className="dw-community-empty__icon" aria-hidden="true">
                <i className="fa fa-calendar-o" />
              </div>
              <h2>No events yet</h2>
              <p>Check back soon — new community updates will appear here.</p>
              <Link to="/" className="dw-community-empty__btn">
                Back to home
              </Link>
            </div>
          ) : (
            <div className="dw-community-grid">
              <aside className="dw-community-toc" aria-label="Jump to event">
                <div className="dw-community-toc__sticky">
                  <h2 className="dw-community-toc__title">
                    <i className="fa fa-list-ul" aria-hidden="true" /> Jump to
                  </h2>
                  <p className="dw-community-toc__hint">
                    Tap a title to scroll to that update.
                  </p>
                  <ul className="dw-community-toc__list">
                    {posts.map((post) => (
                      <li key={post.EventID}>
                        <a
                          className="dw-community-toc__link"
                          href={`#event-${post.EventID}`}
                        >
                          <span className="dw-community-toc__dot" />
                          <span className="dw-community-toc__text">
                            {post.EventTitle || `Event ${post.EventID}`}
                          </span>
                          {post.IsActive === 1 ? (
                            <span className="dw-community-toc__pill dw-community-toc__pill--live">
                              Live
                            </span>
                          ) : (
                            <span className="dw-community-toc__pill">Past</span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <main className="dw-community-main" id="dw-community-feed">
                {posts.map((post) => {
                  const anchorId = `event-${post.EventID}`;
                  const isActive = post.IsActive === 1;
                  const isFlashing = flashId === anchorId;
                  return (
                    <article
                      key={post.EventID}
                      id={anchorId}
                      className={`dw-community-card${isFlashing ? " dw-community-card--flash" : ""}${isActive ? " dw-community-card--active" : " dw-community-card--past"}`}
                    >
                      <div className="dw-community-card__ribbon" aria-hidden="true" />
                      <header className="dw-community-card__head">
                        <div className="dw-community-card__badges">
                          <span
                            className={
                              isActive
                                ? "dw-community-badge dw-community-badge--live"
                                : "dw-community-badge dw-community-badge--past"
                            }
                          >
                            {isActive ? "Active" : "Expired"}
                          </span>
                          {post.EventType ? (
                            <span className="dw-community-badge dw-community-badge--muted">
                              {post.EventType}
                            </span>
                          ) : null}
                        </div>
                        <h2 className="dw-community-card__title">{post.EventTitle}</h2>
                        <p className="dw-community-card__salutation">
                          Dear community members,
                        </p>
                      </header>

                      {post.EventPosterURL ? (
                        <div className="dw-community-card__media">
                          <img
                            src={fullURL(post.EventPosterURL)}
                            alt={post.EventTitle || "Event poster"}
                            className="dw-community-card__img"
                            loading="lazy"
                          />
                        </div>
                      ) : null}

                      <div className="dw-community-card__body">
                        {post.ShortDescription ? (
                          <p className="dw-community-card__text">{post.ShortDescription}</p>
                        ) : null}
                        {post.LongDescription ? (
                          <p className="dw-community-card__text dw-community-card__text--long">
                            {post.LongDescription}
                          </p>
                        ) : null}
                      </div>

                      <div className="dw-community-card__venue">
                        <span className="dw-community-card__venue-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="22" height="22">
                            <path
                              fill="currentColor"
                              d="M12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                            />
                          </svg>
                        </span>
                        <div>
                          <strong>Venue</strong>
                          <p>{post.VenueAddress || "—"}</p>
                        </div>
                      </div>

                      <dl className="dw-community-meta">
                        <div className="dw-community-meta__item">
                          <dt>
                            <i className="fa fa-calendar" aria-hidden="true" /> When
                          </dt>
                          <dd>{formatEventDateLabel(post.EventDate)}</dd>
                        </div>
                        <div className="dw-community-meta__item">
                          <dt>
                            <i className="fa fa-clock-o" aria-hidden="true" /> Time
                          </dt>
                          <dd>{post.EventTime || "—"}</dd>
                        </div>
                        <div className="dw-community-meta__item">
                          <dt>
                            <i className="fa fa-tag" aria-hidden="true" /> Type
                          </dt>
                          <dd>{post.EventType || "—"}</dd>
                        </div>
                      </dl>

                      <footer className="dw-community-card__foot">
                        <span className="dw-community-card__permalink">
                          <i className="fa fa-link" aria-hidden="true" />{" "}
                          <a href={`#event-${post.EventID}`}>Link to this update</a>
                        </span>
                        {post.CreatedDate ? (
                          <span className="dw-community-card__created">
                            Posted {post.CreatedDate}
                          </span>
                        ) : null}
                      </footer>
                    </article>
                  );
                })}
              </main>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <CopyRight />
    </div>
  );
};

export default Community;
