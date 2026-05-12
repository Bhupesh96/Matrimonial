import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/CoupleStories.css";

import Preloader from "../components/Preloader";
import PoopUpSearch from "../components/PoopUpSearch";
import TopMenu from "../components/TopMenu";
import MenuPopUp from "../components/MenuPopUp";
import ContactExpert from "../components/ContactExpert";
import MainMenu from "../components/MainMenu";
import MobileMenu from "../components/MobileMenu";
import DashboardMenu from "../components/DashBoardMenu";
import Footer from "../components/Footer";
import CopyRight from "../components/CopyRight";
import { fetchCoupleStories } from "../api";
import { resolveImageUrl } from "../utils/imageUrl";
import usePageTitle from "../hooks/usePageTitle";

function parseExtraImages(raw) {
  try {
    const p = JSON.parse(raw || "[]");
    return Array.isArray(p) ? p.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function formatWeddingDate(raw) {
  if (!raw) return "—";
  const d = new Date(String(raw).replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const CoupleStories = () => {
  const location = useLocation();
  usePageTitle("Couple Success Stories", {
    description:
      "Real love stories from couples who found each other on Dewangan Links. Get inspired for your own journey.",
  });
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((images, index) => {
    const list = (images || []).filter(Boolean);
    if (!list.length) return;
    setGalleryImages(list);
    setCurrentIndex(Math.min(index, list.length - 1));
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const nextImage = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex(
      (i) => (i - 1 + galleryImages.length) % galleryImages.length,
    );
  }, [galleryImages.length]);

  const fullURL = (img) =>
    resolveImageUrl(img) || `${process.env.PUBLIC_URL}/images/couples/default.jpg`;

  useEffect(() => {
    const loadStories = async () => {
      try {
        const result = await fetchCoupleStories();
        const sorted = [...result].sort(
          (a, b) =>
            new Date(b.WeddingDate || 0) - new Date(a.WeddingDate || 0),
        );
        setStories(sorted);
      } catch (err) {
        console.error("Couple Stories Error:", err);
        setStories([]);
      } finally {
        setLoading(false);
      }
    };
    loadStories();
  }, []);

  useEffect(() => {
    if (loading || stories.length === 0) return;
    const hash = location.hash || window.location.hash;
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("dw-cs-story--highlight");
        window.setTimeout(() => el.classList.remove("dw-cs-story--highlight"), 2200);
      }
    }, 120);
    return () => window.clearTimeout(t);
  }, [loading, stories, location.hash]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight" && galleryImages.length > 1) nextImage();
      if (e.key === "ArrowLeft" && galleryImages.length > 1) prevImage();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxOpen, galleryImages.length, closeLightbox, nextImage, prevImage]);

  if (loading) return <Preloader />;

  return (
    <div className="dw-cs-page">
      <PoopUpSearch />
      <TopMenu />
      <MenuPopUp />
      <ContactExpert />
      <MainMenu />
      <MobileMenu />
      <DashboardMenu />

      <section className="dw-cs-hero" aria-labelledby="dw-cs-hero-title">
        <div className="dw-cs-hero__glow" aria-hidden="true" />
        <div className="container dw-cs-hero__inner">
          <p className="dw-cs-hero__eyebrow">Dewangan Links · Success stories</p>
          <h1 id="dw-cs-hero-title" className="dw-cs-hero__title">
            Celebrations of love{" "}
            <span className="dw-cs-hero__accent">from our community</span>
          </h1>
          <p className="dw-cs-hero__lead">
            Real couples who met through Dewangan Links — their journeys, wedding
            moments, and words of joy. Open a shared link to jump straight to a
            story on this page.
          </p>
          <div className="dw-cs-hero__stats">
            <div className="dw-cs-stat">
              <span className="dw-cs-stat__value">{stories.length}</span>
              <span className="dw-cs-stat__label">Stories</span>
            </div>
            <Link className="dw-cs-hero__cta" to="/sign-up">
              <i className="fa fa-heart" aria-hidden="true" /> Create your profile
            </Link>
          </div>
        </div>
      </section>

      <section className="dw-cs-body" aria-label="Couple stories list">
        <div className="container dw-cs-container">
          {stories.length === 0 ? (
            <div className="dw-cs-empty">
              <div className="dw-cs-empty__icon" aria-hidden="true">
                <i className="fa fa-heart-o" />
              </div>
              <h2>No stories yet</h2>
              <p>Check back soon for new celebrations from our members.</p>
              <Link to="/" className="dw-cs-empty__btn">
                Back to home
              </Link>
            </div>
          ) : (
            <div className="dw-cs-list">
              {stories.map((story) => {
                const mainImg = fullURL(story.StoryImage);
                const extras = parseExtraImages(story.AdditionalImages).map(
                  fullURL,
                );
                const anchorId = `story-${story.StoryID}`;

                return (
                  <article
                    key={story.StoryID}
                    id={anchorId}
                    className="dw-cs-story"
                  >
                    <header className="dw-cs-story__head">
                      <span className="dw-cs-story__ribbon" aria-hidden="true" />
                      <div className="dw-cs-story__badges">
                        <span className="dw-cs-badge">
                          <i className="fa fa-heart" aria-hidden="true" /> Love
                          story
                        </span>
                      </div>
                      <h2 className="dw-cs-story__couple">{story.CoupleName}</h2>
                      {story.StoryTitle ? (
                        <p className="dw-cs-story__subtitle">{story.StoryTitle}</p>
                      ) : null}
                      <div className="dw-cs-story__meta">
                        <span>
                          <i className="fa fa-calendar" aria-hidden="true" />{" "}
                          <strong>Wedding</strong>{" "}
                          {formatWeddingDate(story.WeddingDate)}
                        </span>
                        <a className="dw-cs-story__permalink" href={`#${anchorId}`}>
                          <i className="fa fa-link" aria-hidden="true" /> Link to
                          this story
                        </a>
                      </div>
                    </header>

                    <div className="dw-cs-story__grid">
                      <button
                        type="button"
                        className="dw-cs-story__figure"
                        onClick={() => openLightbox([mainImg], 0)}
                        aria-label={`Enlarge photo — ${story.CoupleName}`}
                      >
                        <img src={mainImg} alt="" loading="lazy" />
                        <span className="dw-cs-story__zoom">
                          <i className="fa fa-search-plus" aria-hidden="true" />{" "}
                          Tap to enlarge
                        </span>
                      </button>

                      <div className="dw-cs-story__content">
                        {story.ShortDescription ? (
                          <div className="dw-cs-panel">
                            <h3 className="dw-cs-panel__title">In brief</h3>
                            <p className="dw-cs-panel__text">
                              {story.ShortDescription}
                            </p>
                          </div>
                        ) : null}
                        {story.FullStory ? (
                          <div className="dw-cs-panel dw-cs-panel--prose">
                            <h3 className="dw-cs-panel__title">Their story</h3>
                            <p className="dw-cs-panel__text dw-cs-panel__text--full">
                              {story.FullStory}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {extras.length > 0 ? (
                      <div className="dw-cs-story__gallery-wrap">
                        <h3 className="dw-cs-gallery__title">
                          <i className="fa fa-picture-o" aria-hidden="true" /> More
                          moments
                        </h3>
                        <div className="dw-cs-gallery">
                          {extras.map((img, i) => (
                            <button
                              type="button"
                              key={`${story.StoryID}-g-${i}`}
                              className="dw-cs-gallery__item"
                              onClick={() => openLightbox(extras, i)}
                              aria-label={`Open gallery image ${i + 1}`}
                            >
                              <img src={img} alt="" loading="lazy" />
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {lightboxOpen && galleryImages.length > 0 && (
        <div
          className="dw-cs-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            className="dw-cs-lightbox__backdrop"
            aria-label="Close"
            onClick={closeLightbox}
          />
          <div className="dw-cs-lightbox__inner">
            <button
              type="button"
              className="dw-cs-lightbox__close"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <i className="fa fa-times" aria-hidden="true" />
            </button>
            <img
              src={galleryImages[currentIndex]}
              className="dw-cs-lightbox__img"
              alt=""
            />
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  className="dw-cs-lightbox__nav dw-cs-lightbox__nav--prev"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <i className="fa fa-chevron-left" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="dw-cs-lightbox__nav dw-cs-lightbox__nav--next"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <i className="fa fa-chevron-right" aria-hidden="true" />
                </button>
              </>
            )}
            <div className="dw-cs-lightbox__counter" aria-live="polite">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <CopyRight />
    </div>
  );
};

export default CoupleStories;
