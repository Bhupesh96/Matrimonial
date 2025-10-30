import React from "react";

const BannerSlider = () => {
  return (
    <section>
      <div className="hom-ban-sli">
        <div>
          <ul className="ban-sli">
            <li>
              <div className="image">
                <img src="images/ban-bg.jpg" alt="" loading="lazy" />
              </div>
            </li>
            <li>
              <div className="image">
                <img src="images/banner.jpg" alt="" loading="lazy" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BannerSlider;
