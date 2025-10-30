const RecentCouples = () => {
  const couples = [
    {
      img: "images/couples/6.jpg",
      name: "Dany & July",
      location: "New York",
      link: "wedding-video.html",
    },
    {
      img: "images/couples/7.jpg",
      name: "Dany & July",
      location: "New York",
      link: "wedding-video.html",
    },
    {
      img: "images/couples/8.jpg",
      name: "Dany & July",
      location: "New York",
      link: "wedding-video.html",
    },
    {
      img: "images/couples/9.jpg",
      name: "Dany & July",
      location: "New York",
      link: "wedding-video.html",
    },
    {
      img: "images/couples/10.jpg",
      name: "Dany & July",
      location: "New York",
      link: "wedding-video.html",
    },
    {
      img: "images/couples/3.jpg",
      name: "Dany & July",
      location: "New York",
      link: "wedding-video.html",
    },
    {
      img: "images/couples/4.jpg",
      name: "Dany & July",
      location: "New York",
      link: "wedding-video.html",
    },
    {
      img: "images/couples/5.jpg",
      name: "Dany & July",
      location: "New York",
      link: "wedding.html",
    },
  ];

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
            {couples.map((couple, index) => (
              <li key={index}>
                <div className="hom-coup-box">
                  <span className="leaf"></span>
                  <img src={couple.img} alt={couple.name} loading="lazy" />
                  <div className="bx">
                    <h4>
                      {couple.name} <span>{couple.location}</span>
                    </h4>
                    <a href={couple.link} className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RecentCouples;
