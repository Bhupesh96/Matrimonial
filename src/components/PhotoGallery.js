const PhotoGallery = () => {
  const galleryImages = [
    { src: "images/gallery/1.jpg", size: "gal-siz-1" },
    { src: "images/gallery/9.jpg", size: "gal-siz-2" },
    { src: "images/gallery/3.jpg", size: "gal-siz-2" },
    { src: "images/gallery/4.jpg", size: "gal-siz-1" },
    { src: "images/gallery/5.jpg", size: "gal-siz-1" },
    { src: "images/gallery/6.jpg", size: "gal-siz-2" },
    { src: "images/gallery/7.jpg", size: "gal-siz-2" },
    { src: "images/gallery/8.jpg", size: "gal-siz-1" },
    { src: "images/couples/9.jpg", size: "gal-siz-2" },
    { src: "images/couples/11.jpg", size: "gal-siz-1" },
  ];

  return (
    <section>
      <div className="wedd-gall home-wedd-gall">
        <div className="container">
          <div className="gall-inn">
            <div className="home-tit">
              <p>collections</p>
              <h2>
                <span>Photo Gallery</span>
              </h2>
              <span className="leaf1"></span>
              <span className="tit-ani-"></span>
            </div>

            <div className="row">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="col-sm-6 col-md-2 gal-im animate__animated animate__flipInX animate__slow"
                >
                  <img
                    src={img.src}
                    className={img.size}
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride & Groom</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
