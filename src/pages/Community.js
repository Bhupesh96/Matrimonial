import React, { useEffect, useState } from "react";
import "../assets/css/Community.css";

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
import { fetchCommunityEvents } from "../api";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);

        let events = await fetchCommunityEvents();
        events = events.sort(
          (a, b) => new Date(b.EventDate) - new Date(a.EventDate)
        );

        setPosts(events);
      } catch (err) {
        console.log("Community API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // --- SCROLL LOGIC ADDED HERE ---
  useEffect(() => {
    // Check if data is loaded and a hash exists in URL
    if (!loading && posts.length > 0 && window.location.hash) {
      const id = window.location.hash.substring(1); // remove '#'
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Optional: Add a temporary highlight effect
          element.style.transition = "background-color 0.5s";
          element.style.backgroundColor = "#fff9db"; // light yellow highlight
          setTimeout(() => {
            element.style.backgroundColor = "transparent";
          }, 1500);
        }, 100);
      }
    }
  }, [loading, posts]);

  const fullURL = (img) =>
    img.startsWith("http")
      ? img
      : `https://techwithus.in/matro/admin/plug/${img}`;

  if (loading) return <Preloader />;

  return (
    <div>
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
            <p>Stories, moments and updates shared by our community.</p>
            <h2>
              <span>Community Updates</span>
            </h2>
            <span className="leaf1"></span>
          </div>

          <div className="community-mail-wrapper">
            {posts.map((post) => (
              <div
                className="mail-item"
                key={post.EventID}
                // --- ID ADDED HERE FOR SCROLLING ---
                id={`event-${post.EventID}`}
              >
                <h2 className="mail-subject">{post.EventTitle}</h2>
                <p className="mail-salutation">Dear Community Members,</p>

                {post.EventPosterURL && (
                  <img
                    src={fullURL(post.EventPosterURL)}
                    alt={post.EventTitle}
                    className="mail-image"
                  />
                )}

                <p className="mail-body">{post.ShortDescription}</p>

                {post.LongDescription && (
                  <p className="mail-body">{post.LongDescription}</p>
                )}

                <div className="mail-venue">
                  <svg className="venue-icon" viewBox="0 0 24 24">
                    <path d="M12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                  </svg>
                  <div>
                    <strong>Venue:</strong> {post.VenueAddress}
                  </div>
                </div>

                <div className="mail-meta">
                  <div className="meta-item">
                    <svg className="meta-icon" viewBox="0 0 24 24">
                      <path d="M7 2v2H5a2 2 0 00-2 2v2h18V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm13 8H4v10a2 2 0 002 2h12a2 2 0 002-2V10zm-7 3h2v2h-2v-2z" />
                    </svg>
                    {post.EventDate}
                  </div>

                  <div className="meta-item">
                    <svg className="meta-icon" viewBox="0 0 24 24">
                      <path d="M12 1a11 11 0 110 22A11 11 0 0112 1zm1 11V6h-2v7h5v-2h-3z" />
                    </svg>
                    {post.EventTime}
                  </div>

                  <div className="meta-item">
                    <svg className="meta-icon" viewBox="0 0 24 24">
                      <path d="M3 4v16l9-3 9 3V4H3zm9 11l-7 2V6h14v11l-7-2z" />
                    </svg>
                    {post.EventType}
                  </div>

                  <div className="meta-item">
                    <strong>Status:</strong>
                    <span
                      className={
                        post.IsActive === 1 ? "status-active" : "status-expired"
                      }
                    >
                      {post.IsActive === 1 ? "Active" : "Expired"}
                    </span>
                  </div>
                </div>

                <div className="mail-created">
                  <em>Created on: {post.CreatedDate}</em>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <CopyRight />
    </div>
  );
};

export default Community;
