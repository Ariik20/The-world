import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./navbar";
import { CiSearch } from "react-icons/ci";
const Countries = ({ countries }) => {
  const [search, setSearch] = useState("");
  const searchFeature = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const filteredByName = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(search.toLowerCase());
  });
  const [regions, setRegions] = useState("");
  const handleChangeRegion = (e) => {
    setRegions(e.target.value);
  };
  const filteredByRegion = filteredByName.filter((country) => {
    return country.region.toLowerCase().includes(regions.toLowerCase());
  });
  return (
    <div className="countries-container">
      <NavBar />
      {/* searching  and the input bars*/}
      <div className="searching">
        <div className="searchContainer">
          <div className="search-icon">
            <CiSearch size="20" />
          </div>
          <input
            type="text"
            placeholder="search for a country"
            onChange={searchFeature}
          />
        </div>
        <select className="select-search" onChange={handleChangeRegion}>
          <option value="">Filter By Region</option>
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="europe">Europe</option>
          <option value="asia">Asia</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <div className="all-countries">
        {/* List all the countries */}
        {filteredByRegion.map((country, index) => {
          const { name, capital, region, population, flags, cca3 } = country;
          return (
            <div key={index} className="country-card">
              <Link to={`${cca3.toLowerCase()}`} className="links">
                <div className="flag">
                  <img src={flags.png} />
                </div>
                <div className="country-info">
                  <div>
                    {" "}
                    <h4>{name.common}</h4>
                  </div>
                  <div>
                    <p>
                      {" "}
                      <b>Capital</b>: {capital}
                    </p>
                  </div>
                  <div>
                    <p>
                      <b> Population</b>: {population}
                    </p>
                  </div>
                  <div>
                    <p>
                      {" "}
                      <b>Region</b>: {region}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Countries;
