import React, { useEffect, useState } from "react";
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

const CoupleStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* LIGHTBOX */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (images, index) => {
    setGalleryImages(images);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () =>
    setCurrentIndex((currentIndex + 1) % galleryImages.length);
  const prevImage = () =>
    setCurrentIndex(
      (currentIndex - 1 + galleryImages.length) % galleryImages.length
    );

  const fullURL = (img) =>
    img.startsWith("http")
      ? img
      : `https://techwithus.in/matro/admin/plug/${img}`;

  useEffect(() => {
    const loadStories = async () => {
      try {
        let result = await fetchCoupleStories();
        const active = result.filter((s) => Number(s.IsActive) === 1);
        active.sort(
          (a, b) => new Date(b.WeddingDate) - new Date(a.WeddingDate)
        );
        setStories(active);
      } catch (err) {
        console.log("Couple Stories Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadStories();
  }, []);

  return (
    <div>
      {loading && <Preloader />}
      <PoopUpSearch />
      <TopMenu />
      <MenuPopUp />
      <ContactExpert />
      <MainMenu />
      <MobileMenu />
      <DashboardMenu />

      <section className="qa-wrapper">
        <div className="container cs-container">
          <div className="home-tit">
            <p>Heart-warming journeys from our trusted community.</p>
            <h2>
              <span>Happy Couple Stories</span>
            </h2>
            <span className="leaf1"></span>
          </div>

          <div className="story-list-wrapper">
            {stories.map((story) => {
              const gallery = JSON.parse(story.AdditionalImages || "[]").map(
                fullURL
              );

              return (
                <div className="story-card" key={story.StoryID}>
                  {/* TITLE */}
                  <div className="cs-title-box">
                    <h2 className="cs-title">
                      {story.CoupleName} – {story.StoryTitle}
                    </h2>
                    <p className="cs-date">Wedding Date: {story.WeddingDate}</p>
                  </div>

                  {/* MAIN IMAGE */}
                  <img
                    src={fullURL(story.StoryImage)}
                    className="story-main-img"
                    alt={story.CoupleName}
                    onClick={() => openLightbox([fullURL(story.StoryImage)], 0)}
                  />

                  {/* SHORT STORY */}
                  <div className="cs-box">
                    <p className="cs-box-title">Short Story</p>
                    <p className="cs-text">{story.ShortDescription}</p>
                  </div>

                  {/* FULL STORY */}
                  <div className="cs-box">
                    <p className="cs-box-title">Full Story</p>
                    <p className="cs-text">{story.FullStory}</p>
                  </div>

                  {/* GALLERY */}
                  {gallery.length > 0 && (
                    <div className="story-gallery">
                      {gallery.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          className="story-thumb"
                          onClick={() => openLightbox(gallery, i)}
                          alt=""
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="lightbox">
          <span className="lightbox-close" onClick={closeLightbox}>
            &times;
          </span>
          <img
            src={galleryImages[currentIndex]}
            className="lightbox-img"
            alt=""
          />
          {galleryImages.length > 1 && (
            <>
              <button className="lightbox-prev" onClick={prevImage}>
                ❮
              </button>
              <button className="lightbox-next" onClick={nextImage}>
                ❯
              </button>
            </>
          )}
        </div>
      )}

      <Footer />
      <CopyRight />
    </div>
  );
};

export default CoupleStories;
