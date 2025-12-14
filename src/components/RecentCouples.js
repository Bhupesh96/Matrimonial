import React, { useEffect, useState } from "react";
// IMPORT NOTE: Adjust this path to point to your actual api.js file location
import { fetchCoupleStories } from "../api";

const RecentCouples = () => {
  const [couples, setCouples] = useState([]);

  // CONFIG: Base URL for images based on your API location.
  // Since api is at .../admin/plug/api/, images are likely at .../admin/
  const IMG_BASE_URL = "https://techwithus.in/matro/admin/plug/";

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCoupleStories();
        setCouples(data);
      } catch (error) {
        console.error("Error fetching couple stories:", error);
      }
    };

    loadData();
  }, []);

  return (
    <section>
      <div className="hom-couples-all">
        <div className="container">
          <div className="row">
            <div className="home-tit">
              <p>trusted brand</p>
              <h2>
                <span>Recent Couples</span>
              </h2>
              <span className="leaf1"></span>
              <span className="tit-ani-"></span>
            </div>
          </div>
        </div>

        <div className="hom-coup-test">
          <ul className="couple-sli">
            {couples && couples.length > 0 ? (
              couples.map((couple) => (
                <li key={couple.StoryID}>
                  <div className="hom-coup-box">
                    <span className="leaf"></span>
                    <img
                      src={`${IMG_BASE_URL}${couple.StoryImage}`}
                      alt={couple.CoupleName}
                      loading="lazy"
                      onError={(e) => {
                        // Optional: Fallback if image fails to load
                        e.target.onerror = null;
                        e.target.src = "images/couples/default.jpg";
                      }}
                    />
                    <div className="bx">
                      <h4>
                        {couple.CoupleName}
                        {/* Displaying StoryTitle where Location used to be */}
                        <span>{couple.StoryTitle}</span>
                      </h4>
                      <a
                        href={`/couple-stories#story-${couple.StoryID}`}
                        className="sml-cta cta-dark"
                      >
                        View more
                      </a>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="text-center">No couple stories found.</div>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RecentCouples;
