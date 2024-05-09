import React, { useState, useEffect } from "react";
import axios from "axios";
const url = "https://restcountries.com/v3.1/all";
import "./App.css";
import NavBar from "./componenets/navbar";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";

const Country = () => {
  const navigate = useNavigate();
  const id = useParams().id.toLowerCase();
  console.log(id);
  const countryUrl = `https://restcountries.com/v3.1/alpha/${id}`;
  //fetch data for a single country
  const [country, setCountry] = useState("");
  const dataFetch = async () => {
    try {
      const res = await axios(countryUrl);
      setCountry(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    dataFetch();
  }, [id]);

  //function to go back the main route
  const goBack = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div>
      {!country
        ? "Loading..."
        : country.map((c, index) => {
            const { name, flags, capital, region, population, boarders } = c;
            return (
              <div key={index}>
                <button onClick={goBack}>
                  <FaArrowLeftLong />
                </button>
                <div>
                  <img src={flags.png} />
                </div>
              </div>
            );
          })}
    </div>
  );
};
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
function App() {
  const [countries, setCountries] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios(url);
      const data = response.data;
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Router>
        <div></div>
        <Routes>
          <Route path="/:id" element={<Country />} />
          <Route path="/" element={<Countries countries={countries} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
