import React, { useEffect, useState } from "react";
import { fetchBanners } from "../api";
import { resolveImageUrl } from "../utils/imageUrl";
import "../assets/css/BannerSlider.css";

/**
 * Secondary strip under the hero. Legacy markup used `.hom-ban-sli`, which
 * global `style.css` hides for viewports &lt; 1250px and pins with z-index:-1,
 * so banners never appeared. This block uses scoped classes only.
 */
const BannerSlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const raw = await fetchBanners("bottom");
      if (!Array.isArray(raw) || cancelled) return;
      const mapped = raw
        .map((b, idx) => {
          if (!b || typeof b !== "object") return null;
          const id = b.BannerID ?? b.banner_id ?? b.id ?? `strip-${idx}`;
          const path = b.BannerImage ?? b.banner_image ?? b.image ?? "";
          const src = resolveImageUrl(String(path).trim());
          if (!src) return null;
          return {
            id,
            src,
            alt: (b.BannerTitle ?? b.banner_title ?? "Highlight").trim(),
          };
        })
        .filter(Boolean)
        .slice(0, 4);
      if (!cancelled) setSlides(mapped);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (slides.length === 0) {
    return (
      <section
        className="dw-secondary-banner"
        aria-label="Decorative highlights"
      >
        <div className="dw-secondary-banner__grid">
          <div className="dw-secondary-banner__cell dw-secondary-banner__cell--left" />
          <div className="dw-secondary-banner__cell dw-secondary-banner__cell--right" />
        </div>
      </section>
    );
  }

  return (
    <section className="dw-secondary-banner dw-secondary-banner--photos">
      <div className="dw-secondary-banner__grid">
        {slides.map((s) => (
          <div key={s.id} className="dw-secondary-banner__photo-wrap">
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;
