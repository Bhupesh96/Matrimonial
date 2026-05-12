import { Link } from "react-router-dom";

const CopyRight = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section>
      <div className="cr">
        <div className="container">
          <div className="row dw-cr-row">
            <p className="dw-cr-left">
              Copyright © <span id="cry">{currentYear}</span>{" "}
              <Link to="/">Dewangan Links</Link> · Made with{" "}
              <i
                className="fa fa-heart"
                aria-hidden="true"
                style={{ color: "#d6a93a" }}
              ></i>{" "}
              in Raipur, India · All rights reserved.
            </p>
            <div className="dw-cr-credit" aria-label="Developer attribution">
              <span className="dw-cr-credit__pre">
                Designed &amp; developed with care by
              </span>
              <a
                href="https://techwithus.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="dw-credit-pill"
                title="Tech With Us — Web, apps & IT solutions in Raipur"
              >
                <span className="dw-credit-pill__glow" aria-hidden="true" />
                <span className="dw-credit-pill__icon" aria-hidden="true">
                  <i className="fa fa-cubes" />
                </span>
                <span className="dw-credit-pill__text">
                  <strong className="dw-credit-pill__name">Tech With Us</strong>
                  <span className="dw-credit-pill__sub">
                    Websites · Apps · Support · Raipur
                  </span>
                </span>
                <span className="dw-credit-pill__ext" aria-hidden="true">
                  <i className="fa fa-external-link" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CopyRight;
