const Preloader = () => {
  /* Use a dedicated class — NOT id="preloader". Legacy public/js/custom.js runs
   * $("#preloader").fadeOut() on document ready; sharing that id makes the React
   * route loader disappear while API calls are still in flight (blank screen). */
  return (
    <div className="dw-react-preloader" role="status" aria-busy="true">
      <div className="plod">
        <span className="lod1">
          <img src="/images/loder/1.png" alt="" loading="lazy" />
        </span>
        <span className="lod2">
          <img src="/images/loder/2.png" alt="" loading="lazy" />
        </span>
        <span className="lod3">
          <img src="/images/loder/3.png" alt="" loading="lazy" />
        </span>
      </div>
    </div>
  );
};

export default Preloader;
