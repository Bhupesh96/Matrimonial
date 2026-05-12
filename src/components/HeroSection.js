import React, { useState, useEffect } from "react";
import { fetchMasterData, fetchBanners } from "../api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import "../assets/css/HeroSection.css";
import { resolveImageUrl } from "../utils/imageUrl";

const HeroSection = () => {
  const navigate = useNavigate();

  const [gotras, setGotras] = useState([]);
  const [cities, setCities] = useState([]);
  const [banners, setBanners] = useState([]);
  const [mIdx, setMIdx] = useState(0);

  const [selectedGotra, setSelectedGotra] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const ageRanges = [
    { id: "18-25", name: "18 to 25" },
    { id: "26-30", name: "26 to 30" },
    { id: "31-40", name: "31 to 40" },
    { id: "41-50", name: "41 to 50" },
  ];

  /* LOAD MASTER DATA */
  useEffect(() => {
    fetchMasterData("gotras").then(setGotras);
    fetchMasterData("cities").then(setCities);
  }, []);

  /* AUTO-ROTATE the simple mobile banner */
  useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(() => {
      setMIdx((i) => (i + 1) % banners.length);
    }, 4000);
    return () => clearInterval(t);
  }, [banners.length]);

  /* LOAD BANNERS */
  useEffect(() => {
    const loadBanner = async () => {
      const list = await fetchBanners("top");

      const final = list
        .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
        .map((b) => ({
          ...b,
          fullImage: resolveImageUrl(b.BannerImage),
        }));

      setBanners(final);
    };

    loadBanner();
  }, []);

  /* SEARCH */
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      age: selectedAge,
      city: selectedCity,
      gotra: selectedGotra,
    }).toString();

    navigate(`/all-profiles?${params}`);
  };

  /* ============================================================
     SHARED MARKUP HELPERS
     ============================================================ */
  const renderSearchFields = () => (
    <>
      <select
        value={selectedAge}
        onChange={(e) => setSelectedAge(e.target.value)}
      >
        <option value="">Age</option>
        {ageRanges.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>

      <select
        value={selectedGotra}
        onChange={(e) => setSelectedGotra(e.target.value)}
      >
        <option value="">Gotra</option>
        {gotras.map((g) => (
          <option key={g.id} value={g.name}>
            {g.name}
          </option>
        ))}
      </select>

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="">City</option>
        {cities.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <button type="submit">Search</button>
    </>
  );

  /* Use a LOCAL fallback banner when the API returned nothing yet.
     Bundled with the app, so this always works even if external CDNs
     are blocked. */
  const fallbackBanner = `${process.env.PUBLIC_URL}/images/banner.jpg`;

  const mobileBannerSrc =
    banners.length > 0 ? banners[mIdx % banners.length].fullImage : fallbackBanner;
  const mobileBannerAlt =
    banners.length > 0
      ? banners[mIdx % banners.length].BannerTitle || "Banner"
      : "Wedding banner";

  return (
    <>
      {/* ============================================================
          DESKTOP / TABLET HERO  (>= 769px)
          Uses the original overlay layout.
          ============================================================ */}
      <section
        className={`hero-container hero-desktop-only${
          banners.length === 0 ? " has-fallback-bg" : ""
        }`}
        style={
          banners.length === 0
            ? {
                backgroundImage: `linear-gradient(rgba(20,20,20,0.55), rgba(0,0,0,0.65)), url("${process.env.PUBLIC_URL}/images/banner.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : undefined
        }
      >
        {banners.length > 0 && (
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={4000}
            stopOnHover={false}
            swipeable
            emulateTouch
            className="hero-carousel"
          >
            {banners.map((b) => (
              <div key={b.BannerID} className="hero-slide">
                <div
                  className="hero-blur-bg"
                  style={{ backgroundImage: `url(${b.fullImage})` }}
                ></div>
                <img
                  src={b.fullImage}
                  alt={b.BannerTitle}
                  className="hero-banner-img"
                />
              </div>
            ))}
          </Carousel>
        )}

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>
            Find Your <span className="hero-highlight">Perfect Match</span>
            <br />
            <span className="hero-highlight hindi">सही जीवनसाथी</span> खोजें
          </h1>

          <p className="subtext">
            Trusted by thousands of families to find the right life partner.
            <br />
            हजारों परिवारों द्वारा विश्वसनीय सेवा।
          </p>

          <form className="hero-search" onSubmit={handleSearch}>
            {renderSearchFields()}
          </form>
        </div>
      </section>

      {/* ============================================================
          MOBILE HERO  (<= 768px)
          Two clean stacked sections: banner + headline/form card.
          We use a plain rotating <img> instead of the Carousel
          component because the carousel collapses to height 0 inside
          this layout context.
          ============================================================ */}
      <section className="mhero">
        {/* SECTION 1 : Banner */}
        <div className="mhero-banner">
          <img
            key={mobileBannerSrc}
            src={mobileBannerSrc}
            alt={mobileBannerAlt}
            className="mhero-banner-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackBanner;
            }}
          />

          {banners.length > 1 && (
            <div className="mhero-dots">
              {banners.map((b, i) => (
                <button
                  key={b.BannerID}
                  type="button"
                  className={`mhero-dot ${i === mIdx ? "active" : ""}`}
                  onClick={() => setMIdx(i)}
                  aria-label={`Show banner ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2 : Headline + Form */}
        <div className="mhero-card">
          <h1 className="mhero-title">
            Find Your <span className="mhero-gold">Perfect Match</span>
          </h1>
          <h2 className="mhero-title-hi">
            <span className="mhero-gold">सही जीवनसाथी</span> खोजें
          </h2>

          <p className="mhero-sub">
            Trusted by thousands of families to find the right life partner.
          </p>
          <p className="mhero-sub mhero-sub-hi">
            हजारों परिवारों द्वारा विश्वसनीय सेवा।
          </p>

          <form className="mhero-search" onSubmit={handleSearch}>
            {renderSearchFields()}
          </form>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
