import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCoupleStories } from "../api";
import { resolveImageUrl } from "../utils/imageUrl";

import "../assets/css/RecentCouples.css";

const MAX_HOME_STORIES = 6;
const EXCERPT_LEN = 120;

const excerpt = (text) => {
  const t = (text || "").trim().replace(/\s+/g, " ");
  if (t.length <= EXCERPT_LEN) return t;
  return `${t.slice(0, EXCERPT_LEN).trim()}…`;
};

const RecentCouples = () => {
  const [couples, setCouples] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCoupleStories();
        setCouples(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching couple stories:", error);
        setCouples([]);
      }
    };
    loadData();
  }, []);

  const list = useMemo(
    () =>
      [...couples]
        .sort(
          (a, b) =>
            new Date(b.WeddingDate || 0) - new Date(a.WeddingDate || 0),
        )
        .slice(0, MAX_HOME_STORIES),
    [couples],
  );

  const defaultImg = `${process.env.PUBLIC_URL}/images/couples/default.jpg`;

  return (
    <section className="dw-home-couples">
      <div className="container">
        <div className="row">
          <div className="home-tit">
            <p>Trusted brand</p>
            <h2>
              <span>Recent Couples</span>
            </h2>
            <span className="leaf1"></span>
            <span className="tit-ani-"></span>
          </div>
        </div>

        {list.length > 0 ? (
          <div className="dw-home-couples__grid">
            {list.map((couple) => (
              <article key={couple.StoryID} className="dw-couple-card">
                <Link
                  className="dw-couple-card__media"
                  to={`/couple-stories#story-${couple.StoryID}`}
                >
                  <img
                    src={resolveImageUrl(couple.StoryImage) || defaultImg}
                    alt={couple.CoupleName || "Couple"}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultImg;
                    }}
                  />
                </Link>
                <div className="dw-couple-card__body">
                  <h3 className="dw-couple-card__name">{couple.CoupleName}</h3>
                  {couple.StoryTitle ? (
                    <p className="dw-couple-card__title">{couple.StoryTitle}</p>
                  ) : null}
                  <p className="dw-couple-card__excerpt">
                    {excerpt(couple.ShortDescription)}
                  </p>
                  <Link
                    className="dw-couple-card__link"
                    to={`/couple-stories#story-${couple.StoryID}`}
                  >
                    View story{" "}
                    <i className="fa fa-angle-right" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="dw-home-couples__empty">
            No couple stories to show yet.{" "}
            <Link to="/couple-stories">See all stories</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentCouples;
