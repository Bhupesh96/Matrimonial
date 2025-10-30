const MeetOurTeam = () => {
  const teamMembers = [
    {
      name: "Ashley Jen",
      role: "Marketing Manager",
      img: "images/profiles/6.jpg",
    },
    {
      name: "Ashley Jen",
      role: "Marketing Manager",
      img: "images/profiles/7.jpg",
    },
    {
      name: "Emily Arrov",
      role: "Creative Manager",
      img: "images/profiles/8.jpg",
    },
    {
      name: "Julia Sear",
      role: "Client Coordinator",
      img: "images/profiles/9.jpg",
    },
  ];

  const socialIcons = [
    "facebook",
    "twitter",
    "whatsapp",
    "linkedin",
    "instagram",
  ];

  return (
    <section>
      <div className="ab-team">
        <div className="container">
          <div className="row">
            <div className="home-tit">
              <p>OUR PROFESSIONALS</p>
              <h2>
                <span>Meet Our Team</span>
              </h2>
              <span className="leaf1"></span>
            </div>

            <ul>
              {teamMembers.map((member, index) => (
                <li key={index}>
                  <div>
                    <img src={member.img} alt={member.name} loading="lazy" />
                    <h4>{member.name}</h4>
                    <p>{member.role}</p>
                    <ul className="social-light">
                      {socialIcons.map((icon, i) => (
                        <li key={i}>
                          <a href="#!">
                            <i
                              className={`fa fa-${icon}`}
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
