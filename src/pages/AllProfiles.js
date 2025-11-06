import React from "react";
import Preloader from "../components/Preloader";
import PoopUpSearch from "../components/PoopUpSearch";
import TopMenu from "../components/TopMenu";
import ContactExpert from "../components/ContactExpert";
import MainMenu from "../components/MainMenu";
import MobileMenu from "../components/MobileMenu";
import MenuPopUp from "../components/MenuPopUp";
import ProfileListing from "./ProfilesData";
import Footer from "../components/Footer";
import CopyRight from "../components/CopyRight";
import ChatBox from "../components/ChatBox";

const AllProfiles = () => {
  return (
    <div>
      <Preloader />
      <PoopUpSearch />
      <TopMenu />
      <MenuPopUp />
      <ContactExpert />
      <MainMenu />
      <MobileMenu />
      <section>
        <div className="all-pro-head">
          <div className="container">
            <div className="row">
              <h1>Lakhs of Happy Marriages</h1>
              <a href="/sign-up.html">
                Join now for Free{" "}
                <i className="fa fa-handshake-o" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>

        {/* FILTER ON MOBILE VIEW */}
        <div className="fil-mob fil-mob-act">
          <h4>
            Profile filters <i className="fa fa-filter" aria-hidden="true"></i>
          </h4>
        </div>
      </section>
      <ProfileListing />
      <div
        className="modal fade"
        id="sendInter"
        tabIndex="-1"
        aria-labelledby="sendInterLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title seninter-tit" id="sendInterLabel">
                Send interest to <span className="intename2">Jolia</span>
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body seninter">
              <div className="lhs">
                <img
                  src="images/profiles/1.jpg"
                  alt=""
                  className="intephoto2"
                />
              </div>

              <div className="rhs">
                <h4>
                  Permissions: <span className="intename2">Jolia</span> can view
                  the below details
                </h4>

                <ul>
                  {[
                    { id: "pro_about", label: "About section", checked: true },
                    { id: "pro_photo", label: "Photo gallery" },
                    { id: "pro_contact", label: "Contact info" },
                    { id: "pro_person", label: "Personal info" },
                    { id: "pro_hobbi", label: "Hobbies" },
                    { id: "pro_social", label: "Social media" },
                  ].map((item) => (
                    <li key={item.id}>
                      <div className="chbox">
                        <input
                          type="checkbox"
                          id={item.id}
                          defaultChecked={item.checked}
                        />
                        <label htmlFor={item.id}>{item.label}</label>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id="comment"
                    name="text"
                    placeholder="Comment goes here"
                  ></textarea>
                  <label htmlFor="comment">
                    Write some message to <span className="intename"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Send interest
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <ChatBox />
      <Footer />
      <CopyRight />
    </div>
  );
};

export default AllProfiles;
