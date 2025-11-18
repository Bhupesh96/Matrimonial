import React from "react";
import TopMenu from "../components/TopMenu";
import Preloader from "../components/Preloader";
import PoopUpSearch from "../components/PoopUpSearch";
import MenuPopUp from "../components/MenuPopUp";
import ContactExpert from "../components/ContactExpert";
import MainMenu from "../components/MainMenu";
import MobileMenu from "../components/MobileMenu";
import DashboardMenu from "../components/DashBoardMenu";
import Footer from "../components/Footer";
import CopyRight from "../components/CopyRight";
import { Link } from "react-router-dom";

const BolgDetail = () => {
  return (
    <div>
      <Preloader />
      <PoopUpSearch />
      <TopMenu />
      <MenuPopUp />
      <ContactExpert />
      <MainMenu />
      <MobileMenu />
      <DashboardMenu />
      <section>
        <div className="inn-ban">
          <div className="container">
            <div className="row">
              <h1>Prepare For Your Wedding Day</h1>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="blog.html">All Posts</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="blog.html">Wedding</a>
                </li>
                <li className="breadcrumb-item active">
                  Prepare For Your Wedding Day
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="blog-main blog-detail">
          <div className="container">
            <div className="row">
              <div className="inn">
                <div className="lhs">
                  {/* BIG POST START */}
                  <div className="blog-home-box">
                    <div className="im">
                      <img src="images/couples/9.jpg" alt="" loading="lazy" />
                      <span className="blog-date">22, Jan 2023</span>
                      <div className="shar-1">
                        <i className="fa fa-share-alt" aria-hidden="true"></i>
                        <ul>
                          <li>
                            <a href="#!">
                              <i
                                className="fa fa-facebook"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              <i
                                className="fa fa-twitter"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </li>
                          <li>
                            <a href="#!">
                              <i
                                className="fa fa-whatsapp"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </li>
                          <li>
                            <span>
                              <i
                                className="fa fa-link"
                                aria-hidden="true"
                                data-toggle="modal"
                                data-target="#sharepop"
                              ></i>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="txt">
                      <span className="blog-cate">Wedding</span>
                      <span className="blog-cate">Events</span>
                      <span className="blog-cate">Decoration</span>
                      <h2>The Ultimate Wedding Planning Checklist</h2>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout...
                      </p>
                      <h3>Where does it come from?</h3>
                      <p>
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text...
                      </p>
                      <p>
                        The standard chunk of Lorem Ipsum used since the
                        1500s...
                      </p>
                      <h4>Why do we use it?</h4>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry...
                      </p>
                      <h3>Where does it come from?</h3>
                      <p>
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text...
                      </p>
                      <div className="blog-info">
                        <div className="blog-pro-info">
                          <img src="images/user/3.jpg" alt="" loading="lazy" />
                          <h5>
                            Steefan Ann <span>Author</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* END BIG POST START */}

                  {/* START */}
                  <div className="blog-nav">
                    <div className="com lhs">
                      <span>
                        <i
                          className="fa fa-long-arrow-left"
                          aria-hidden="true"
                        ></i>{" "}
                        Previous post
                      </span>
                      <h4>The Wedding Food</h4>
                      <a href="#!" className="fclick"></a>
                    </div>
                    <div className="com rhs">
                      <span>
                        Next post{" "}
                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <h4>Drinks and Music</h4>
                      <a href="#!" className="fclick"></a>
                    </div>
                  </div>
                  {/* END */}
                </div>

                <div className="rhs">
                  <div className="blog-com-rhs">
                    {/* SOCIAL MEDIA START */}
                    <div className="blog-soci">
                      <h4>Social media</h4>
                      <ul>
                        <li>
                          <a target="_blank" href="#!" className="sm-fb-big">
                            <b>3k</b> Facebook
                          </a>
                        </li>
                        <li>
                          <a target="_blank" href="#!" className="sm-tw-big">
                            <b>10K</b> Twitter
                          </a>
                        </li>
                        <li>
                          <a target="_blank" href="#!" className="sm-li-big">
                            <b>1k</b> Linkedin
                          </a>
                        </li>
                        <li>
                          <a target="_blank" href="#!" className="sm-yt-big">
                            <b>100K</b> Youtube
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* SOCIAL MEDIA END */}

                    {/* CATEGORY START */}
                    <div className="blog-rhs-cate">
                      <h4>Category</h4>
                      <ul>
                        <li>
                          <a href="#!">
                            <span>1</span>
                            <b>Wedding Planning</b>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <span>2</span>
                            <b>Lifestyle</b>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <span>3</span>
                            <b>Catering services</b>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <span>4</span>
                            <b>Wedding Decorations</b>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <span>5</span>
                            <b>Wedding Halls</b>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <span>6</span>
                            <b>The Ceremony</b>
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <span>7</span>
                            <b>Photography</b>
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* CATEGORY END */}

                    {/* TRENDING POSTS START */}
                    <div className="hot-page2-hom-pre blog-rhs-trends">
                      <h4>Trending Posts</h4>
                      <ul>
                        {[8, 4, 9, 6, 4].map((num, i) => (
                          <li key={i}>
                            <div className="hot-page2-hom-pre-1">
                              <img
                                src={`images/couples/${num}.jpg`}
                                alt=""
                                loading="lazy"
                              />
                            </div>
                            <div className="hot-page2-hom-pre-2">
                              <h5>Post Title {i + 1}</h5>
                            </div>
                            <Link to="/blog-detail" className="fclick"></Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* TRENDING POSTS END */}

                    {/* SUBSCRIBE START */}
                    <div className="blog-subsc">
                      <div className="ud-rhs-poin1">
                        <img
                          src="../../../cdn-icons-png.flaticon.com/512/6349/6349282.png"
                          alt=""
                          loading="lazy"
                        />
                        <h5>
                          Subscribe <b>Newsletter</b>
                        </h5>
                      </div>
                      <form
                        name="news_newsletter_subscribe_form"
                        id="news_newsletter_subscribe_form"
                      >
                        <ul>
                          <li>
                            <input
                              type="text"
                              name="news_newsletter_subscribe_name"
                              placeholder="Enter Email Id*"
                              className="form-control"
                              required
                            />
                          </li>
                          <li>
                            <input
                              type="submit"
                              id="news_newsletter_subscribe_submit"
                              name="news_newsletter_subscribe_submit"
                              className="form-control"
                            />
                          </li>
                        </ul>
                      </form>
                    </div>
                    {/* SUBSCRIBE END */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CopyRight />
    </div>
  );
};

export default BolgDetail;
