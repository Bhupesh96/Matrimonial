const CopyRight = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section>
      <div className="cr">
        <div className="container">
          <div className="row">
            <p>
              Copyright © <span id="cry">{currentYear}</span>{" "}
              <a href="#!" target="_blank" rel="noopener noreferrer">
                Company.com
              </a>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CopyRight;
