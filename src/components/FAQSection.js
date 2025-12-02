import React from "react";

const FAQSection = () => {
  return (
    <div>
      {" "}
      <section>
        <div className="ab-faq" id="faq">
          <div className="container">
            <div className="row">
              {/* SUB TITLE */}
              <div className="sub-tit-caps text-center mb-4">
                <h2>
                  KB{" "}
                  <span
                    className="animate animate__animated animate__flipInX"
                    data-ani="animate__flipInX"
                    data-dely="0.1"
                  >
                    knowledge base
                  </span>
                </h2>
                <p>Fusce imperdiet ullamcorper fringilla.</p>
              </div>

              {/* BACKGROUND SHAPES */}
              <div className="wedd-shap">
                <span className="abo-shap-1"></span>
                <span className="abo-shap-2"></span>
                <span className="abo-shap-4"></span>
                <span className="abo-shap-5"></span>
              </div>

              {/* FAQ LEFT SIDE */}
              <div className="col-lg-6">
                <div className="ab-faq-lhs">
                  <div id="accordion">
                    {[
                      {
                        id: 1,
                        title: "It is a long established fact",
                        content:
                          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      },
                      {
                        id: 2,
                        title: "Where can I get some?",
                        content:
                          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      },
                      {
                        id: 3,
                        title: "Where does it come from?",
                        content:
                          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      },
                      {
                        id: 4,
                        title: "Why do we use it?",
                        content:
                          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      },
                      {
                        id: 5,
                        title: "What is Lorem Ipsum?",
                        content:
                          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      },
                      {
                        id: 6,
                        title: "Contrary to popular belief",
                        content:
                          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      },
                    ].map((faq, index) => (
                      <div className="card" key={faq.id}>
                        <div className="card-header">
                          <a
                            className={`card-link ${
                              index !== 0 ? "collapsed" : ""
                            }`}
                            data-bs-toggle="collapse"
                            href={`#collapse${faq.id}`}
                          >
                            {faq.title}
                          </a>
                        </div>
                        <div
                          id={`collapse${faq.id}`}
                          className={`collapse ${index === 0 ? "show" : ""}`}
                          data-bs-parent="#accordion"
                        >
                          <div className="card-body">
                            <p>{faq.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQ RIGHT SIDE IMAGE */}
              <div className="col-lg-6">
                <div className="ab-faq-rhs">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/about/3.jpg`}
                    alt="FAQ"
                    className="img-fluid rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
