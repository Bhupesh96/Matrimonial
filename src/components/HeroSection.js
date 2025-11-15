import React, { useState, useEffect } from "react";

// Base API URL for all master data lookups
import { fetchMasterData } from "../api";
const HeroSection = () => {
  // 1. State for Genders, Religions, and Cities
  const [genders, setGenders] = useState([]);
  const [religions, setReligions] = useState([]);
  const [cities, setCities] = useState([]);

  // 2. useEffect to fetch data on component mount
  useEffect(() => {
    // Fetch Genders for the "I'm looking for" dropdown
    fetchMasterData("genders").then(setGenders);

    // Fetch Religions
    fetchMasterData("religions").then(setReligions);

    // Fetch Cities
    fetchMasterData("cities").then(setCities);
  }, []); // The empty dependency array [] ensures this runs only once

  // Function to render dropdown options dynamically
  const renderOptions = (data) => {
    // Assuming each item in the data array has 'id' and 'name' properties
    return data.map((item) => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ));
  };

  return (
    <section>
      <div className="str">
        <div className="hom-head">
          <div className="container">
            <div className="row">
              <div className="hom-ban">
                <div className="ban-tit">
                  <span>
                    <i className="no1">#1</i> Matrimony
                  </span>
                  <h1>
                    Find your
                    <br />
                    <b>Right Match</b> here
                  </h1>
                  <p>Most trusted Matrimony Brand in the World.</p>
                </div>

                <div className="ban-search chosenini">
                  <form>
                    <ul>
                      {/* --- I'm looking for (Genders) --- */}
                      <li className="sr-look">
                        <div className="form-group">
                          <label>I'm looking for</label>
                          <select className="chosen-select">
                            <option value="">I'm looking for</option>
                            {renderOptions(genders)}
                          </select>
                        </div>
                      </li>

                      {/* --- Age (Stays static as it's not from the master API) --- */}
                      <li className="sr-age">
                        <div className="form-group">
                          <label>Age</label>
                          <select className="chosen-select">
                            <option value="">Age</option>
                            <option value="18-30">18 to 30</option>
                            <option value="31-40">31 to 40</option>
                            <option value="41-50">41 to 50</option>
                            <option value="51-60">51 to 60</option>
                            <option value="61-70">61 to 70</option>
                            <option value="71-80">71 to 80</option>
                            <option value="81-90">81 to 90</option>
                            <option value="91-100">91 to 100</option>
                          </select>
                        </div>
                      </li>

                      {/* --- Religion --- */}
                      <li className="sr-reli">
                        <div className="form-group">
                          <label>Religion</label>
                          <select className="chosen-select">
                            <option value="">Religion</option>
                            {/* Static 'Any' option for convenience */}
                            <option value="Any">Any</option>
                            {renderOptions(religions)}
                          </select>
                        </div>
                      </li>

                      {/* --- City --- */}
                      <li className="sr-cit">
                        <div className="form-group">
                          <label>City</label>
                          <select className="chosen-select">
                            <option value="">Location</option>
                            {/* Static 'Any location' option for convenience */}
                            <option value="Any location">Any location</option>
                            {renderOptions(cities)}
                          </select>
                        </div>
                      </li>

                      <li className="sr-btn">
                        <input type="submit" value="Search" />
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
