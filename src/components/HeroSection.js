import React, { useState, useEffect } from "react";
import { fetchMasterData, fetchBanners } from "../api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import "../assets/css/HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  const [gotras, setGotras] = useState([]);
  const [cities, setCities] = useState([]);
  const [banners, setBanners] = useState([]);

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

  /* LOAD BANNERS */
  useEffect(() => {
    const loadBanner = async () => {
      const list = await fetchBanners("top");

      const final = list
        .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
        .map((b) => ({
          ...b,
          fullImage: b.BannerImage.startsWith("http")
            ? b.BannerImage
            : `https://techwithus.in${b.BannerImage}`,
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

  return (
    <section className="hero-container">
      {/* BACKGROUND CAROUSEL */}
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
              {/* BLUR BACKGROUND */}
              <div
                className="hero-blur-bg"
                style={{ backgroundImage: `url(${b.fullImage})` }}
              ></div>

              {/* MAIN IMAGE (NO CROP) */}
              <img
                src={b.fullImage}
                alt={b.BannerTitle}
                className="hero-banner-img"
              />
            </div>
          ))}
        </Carousel>
      )}

      {/* OVERLAY */}
      <div className="hero-overlay"></div>

      {/* CONTENT */}
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
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
