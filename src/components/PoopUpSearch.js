import { Link } from "react-router-dom";

const PoopUpSearch = () => {
  return (
    <div className="pop-search">
      <span className="ser-clo">+</span>
      <div className="inn">
        <form>
          <input type="text" placeholder="Search here..." />
        </form>
        <div className="rel-sear">
          <h4>Top searches:</h4>
          <Link to="/all-profiles">Browse all profiles</Link>
          <Link to="/all-profiles">Mens profile</Link>
          <Link to="/all-profiles">Female profile</Link>
          <Link to="/all-profiles">New profiles</Link>
        </div>
      </div>
    </div>
  );
};

export default PoopUpSearch;
