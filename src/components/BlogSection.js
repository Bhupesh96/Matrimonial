const BlogSection = () => {
  const blogs = [
    {
      img: "images/blog/1.jpg",
      category: "Wedding - Johnny",
      title: "Wedding arrangements",
      desc: "It is a long established fact that a reader will be distracted by the readable content.",
      link: "blog-details.html",
    },
    {
      img: "images/blog/2.jpg",
      category: "Wedding - Johnny",
      title: "Wedding arrangements",
      desc: "It is a long established fact that a reader will be distracted by the readable content.",
      link: "blog-details.html",
    },
    {
      img: "images/blog/3.jpg",
      category: "Wedding - Johnny",
      title: "Invitation cards",
      desc: "It is a long established fact that a reader will be distracted by the readable content.",
      link: "blog-details.html",
    },
  ];

  return (
    <section>
      <div className="hom-blog">
        <div className="container">
          <div className="row">
            <div className="home-tit">
              <p>Blog posts</p>
              <h2>
                <span>Blog & Articles</span>
              </h2>
              <span className="leaf1"></span>
              <span className="tit-ani-"></span>
            </div>

            <div className="blog">
              <ul>
                {blogs.map((blog, index) => (
                  <li key={index}>
                    <div className="blog-box">
                      <img src={blog.img} alt={blog.title} loading="lazy" />
                      <span>{blog.category}</span>
                      <h2>{blog.title}</h2>
                      <p>{blog.desc}</p>
                      <a href={blog.link} className="cta-dark">
                        <span>Read more</span>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
