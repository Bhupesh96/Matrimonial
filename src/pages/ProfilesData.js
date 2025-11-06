import React from "react";

const ProfileList = () => {
  const profiles = [
    {
      name: "Ashley emyy",
      img: "images/profiles/4.jpg",
      available: true,
      details: ["B.Sc", "IT Profession", "29 Years old", "Height: 155Cms"],
    },
    {
      name: "Elizabeth Taylor",
      img: "images/profiles/10.jpg",
      available: false,
      details: ["B.Sc", "IT Profession", "29 Years old", "Height: 155Cms"],
    },
    {
      name: "Angelina Jolie",
      img: "images/profiles/11.jpg",
      available: true,
      details: ["B.Sc", "IT Profession", "29 Years old", "Height: 155Cms"],
    },
    {
      name: "Olivia mia",
      img: "images/profiles/12.jpg",
      available: false,
      details: ["B.Sc", "IT Profession", "29 Years old", "Height: 155Cms"],
    },
    {
      name: "Jennifer",
      img: "images/profiles/13.jpg",
      available: false,
      details: ["B.Sc", "IT Profession", "29 Years old", "Height: 155Cms"],
    },
  ];

  return (
    <section>
      <div className="all-weddpro all-jobs all-serexp chosenini">
        <div className="container">
          <div className="row">
            {/* Left Filters */}
            <div className="col-md-3 fil-mob-view">
              <span className="filter-clo">+</span>

              {/* Gender Filter */}
              <div className="filt-com lhs-cate">
                <h4>
                  <i className="fa fa-search" aria-hidden="true"></i> I'm
                  looking for
                </h4>
                <div className="form-group">
                  <select className="chosen-select form-control">
                    <option value="">I'm looking for</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
              </div>

              {/* Age Filter */}
              <div className="filt-com lhs-cate">
                <h4>
                  <i className="fa fa-clock-o" aria-hidden="true"></i> Age
                </h4>
                <div className="form-group">
                  <select className="chosen-select form-control">
                    <option value="">Select age</option>
                    <option>18 to 30</option>
                    <option>31 to 40</option>
                    <option>41 to 50</option>
                    <option>51 to 60</option>
                    <option>61 to 70</option>
                    <option>71 to 80</option>
                    <option>81 to 90</option>
                    <option>91 to 100</option>
                  </select>
                </div>
              </div>

              {/* Religion Filter */}
              <div className="filt-com lhs-cate">
                <h4>
                  <i className="fa fa-bell-o" aria-hidden="true"></i> Select
                  Religion
                </h4>
                <div className="form-group">
                  <select className="chosen-select form-control">
                    <option>Religion</option>
                    <option>Any</option>
                    <option>Hindu</option>
                    <option>Muslim</option>
                    <option>Jain</option>
                    <option>Christian</option>
                  </select>
                </div>
              </div>

              {/* Location Filter */}
              <div className="filt-com lhs-cate">
                <h4>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                  Location
                </h4>
                <div className="form-group">
                  <select
                    className="chosen-select form-control"
                    name="addjbmaincate"
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Bangaluru">Bangaluru</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>
              </div>

              {/* Availability Filter */}
              <div className="filt-com lhs-rati lhs-avail lhs-cate">
                <h4>
                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>{" "}
                  Availability
                </h4>
                <ul>
                  {["All", "Available", "Offline"].map((label, i) => (
                    <li key={i}>
                      <div className="rbbox">
                        <input
                          type="radio"
                          name="expert_avail"
                          id={`exav${i + 1}`}
                          defaultChecked={i === 0}
                        />
                        <label htmlFor={`exav${i + 1}`}>{label}</label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Profile Type Filter */}
              <div className="filt-com lhs-rati lhs-ver lhs-cate">
                <h4>
                  <i className="fa fa-shield" aria-hidden="true"></i> Profile
                </h4>
                <ul>
                  {["All", "Premium", "Free"].map((label, i) => (
                    <li key={i}>
                      <div className="rbbox">
                        <input
                          type="radio"
                          name="expert_veri"
                          id={`exver${i + 1}`}
                          defaultChecked={i === 0}
                        />
                        <label htmlFor={`exver${i + 1}`}>{label}</label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Send Query Box */}
              <div className="filt-com filt-send-query">
                <div className="send-query">
                  <h5>What are you looking for?</h5>
                  <p>We will help you to arrange the best match for you.</p>
                  <a href="#!" data-bs-toggle="modal" data-bs-target="#expfrm">
                    Send your queries
                  </a>
                </div>
              </div>
            </div>

            {/* Right Profile List */}
            <div className="col-md-9">
              <div className="short-all">
                <div className="short-lhs">
                  Showing <b>{profiles.length}</b> profiles
                </div>
                <div className="short-rhs">
                  <ul>
                    <li>Sort by:</li>
                    <li>
                      <div className="form-group">
                        <select className="chosen-select form-control">
                          <option>Most relative</option>
                          <option>Date listed: Newest</option>
                          <option>Date listed: Oldest</option>
                        </select>
                      </div>
                    </li>
                    <li>
                      <div className="sort-grid sort-grid-1">
                        <i className="fa fa-th-large" aria-hidden="true"></i>
                      </div>
                    </li>
                    <li>
                      <div className="sort-grid sort-grid-2 act">
                        <i className="fa fa-bars" aria-hidden="true"></i>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Profile Cards */}
              <div className="all-list-sh">
                <ul>
                  {profiles.map((p, index) => (
                    <li key={index}>
                      <div
                        className={`all-pro-box ${
                          p.available ? "user-avil-onli" : ""
                        }`}
                        data-useravil={p.available ? "avilyes" : "avilno"}
                      >
                        <div className="pro-img">
                          <a href="profile-details.html">
                            <img src={p.img} alt={p.name} />
                          </a>
                          <div className="pro-ave" title="User availability">
                            <span className="pro-ave-yes"></span>
                          </div>
                          <div className="pro-avl-status">
                            {p.available ? (
                              <h5>Available Online</h5>
                            ) : (
                              <span className="marqu">
                                Last login 10 mins ago | I'll be available at
                                10:00 AM
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="pro-detail">
                          <h4>
                            <a href="profile-details.html">{p.name}</a>
                          </h4>
                          <div className="pro-bio">
                            {p.details.map((d, i) => (
                              <span key={i}>{d}</span>
                            ))}
                          </div>
                          <div className="links">
                            <span className="cta-chat">Chat now</span>
                            <a href="#!">WhatsApp</a>
                            <a
                              href="#!"
                              className="cta cta-sendint"
                              data-bs-toggle="modal"
                              data-bs-target="#sendInter"
                            >
                              Send interest
                            </a>
                            <a href="profile-details.html">More details</a>
                          </div>
                        </div>

                        <span
                          className="enq-sav"
                          data-bs-toggle="tooltip"
                          title="Click to save this profile."
                        >
                          <i
                            className="fa fa-thumbs-o-up"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileList;
