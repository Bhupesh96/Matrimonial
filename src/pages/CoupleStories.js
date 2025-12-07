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

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (images, index) => {
    setGalleryImages(images);
    setCurrentIndex(index);
    setCurrentImage(images[index]);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => {
    const next = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(next);
    setCurrentImage(galleryImages[next]);
  };

  const prevImage = () => {
    const prev =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(prev);
    setCurrentImage(galleryImages[prev]);
  };

  const fullURL = (img) =>
    img.startsWith("http")
      ? img
      : `https://techwithus.in/matro/admin/plug/${img}`;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadStories = async () => {
      try {
        let result = await fetchCoupleStories();

        const activeStories = result.filter((s) => Number(s.IsActive) === 1);

        const sorted = activeStories.sort(
          (a, b) => new Date(b.WeddingDate) - new Date(a.WeddingDate)
        );

        setStories(sorted);
      } catch (err) {
        console.log("Couple Stories Fetch Error:", err);
      } finally {
        setLoading(false); // 🔥 Preloader will hide here
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
        <div className="container">
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
                (i) => fullURL(i)
              );

              return (
                <div className="story-mail-item" key={story.StoryID}>
                  {/* TITLE BOX */}
                  <div className="cs-box cs-title-box">
                    <h2 className="cs-title">
                      {story.CoupleName} – {story.StoryTitle}
                    </h2>
                    <p className="cs-date">Wedding Date: {story.WeddingDate}</p>
                  </div>

                  {/* MAIN IMAGE (unchanged) */}
                  <img
                    src={fullURL(story.StoryImage)}
                    alt={story.CoupleName}
                    className="story-main-img"
                    onClick={() => openLightbox([fullURL(story.StoryImage)], 0)}
                  />

                  {/* SHORT STORY BOX */}
                  <div className="cs-box cs-short-box">
                    <p className="cs-short-title">Short Story</p>
                    <p className="cs-short">{story.ShortDescription}</p>
                  </div>

                  {/* FULL STORY BOX */}
                  <div className="cs-box cs-long-box">
                    <p className="cs-long-title">Full Story</p>
                    <p className="cs-long">{story.FullStory}</p>
                  </div>

                  {/* GALLERY (unchanged) */}
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

          <img src={currentImage} className="lightbox-img" alt="Preview" />

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
