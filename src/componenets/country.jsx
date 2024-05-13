import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./navbar";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";

const Country = () => {
  const navigate = useNavigate();
  const id = useParams().id.toLowerCase();
  console.log(id);
  const countryUrl = `https://restcountries.com/v3.1/alpha/${id}`;
  //fetch data for a single country
  const [country, setCountry] = useState("");
  const [border, setBorders] = useState({});
  const dataFetch = async () => {
    try {
      const res = await axios(countryUrl);
      setCountry(res.data);
      console.log(res.data);
      const getBorders = res.data[0]?.borders?.toString().toLowerCase();
      const resBorder = await axios(
        `https://restcountries.com/v3.1/alpha?codes=${getBorders}`
      );
      setBorders(resBorder);
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
      <NavBar />
      {!country
        ? "Loading..."
        : country.map((c, index) => {
            const {
              name,
              flags,
              capital,
              region,
              subregion,
              population,
              currencies,
              tld,
            } = c;
            let currency;
            let actualCurrency;
            for (let currencyName in currencies) {
              if (
                Object.prototype.hasOwnProperty.call(currencies, currencyName)
              ) {
                currency = currencies[currencyName];
                for (let property in currency) {
                  if (
                    Object.prototype.hasOwnProperty.call(currency, property) &&
                    property !== "symbol"
                  ) {
                    actualCurrency = currency[property];
                  }
                }
              }
            }
            let natives = country[0].name.nativeName
              ? Object.keys(country[0].name.nativeName)[0]
              : null;
            let nativeName = country[0]?.name?.nativeName?.[natives]?.common;
            let spokenLanguages = [];
            for (let properties in country[0]?.languages) {
              spokenLanguages.push(country[0].languages[properties]);
            }
            return (
              <div key={index} className="single-page">
                <button onClick={goBack} className="goBack">
                  <FaArrowLeftLong className="arrow" size="15" /> back
                </button>
                <div className="singleCountry-info">
                  <div className="single-flag">
                    <img src={flags.png} />
                  </div>

                  <div className="single-info">
                    <h2>{name.common}</h2>
                    <div className="important-info">
                      <p>Native Name: {nativeName}</p>
                      <p>Capital: {capital}</p>
                      <p>Population: {population}</p>
                      <p>Region: {region}</p>
                      <p>Sub-region: {subregion}</p>
                    </div>
                    <div className="specific-info">
                      <p>Domain: {tld}</p>
                      <p>Currencies: {actualCurrency}</p>
                      <p>
                        language(s):{" "}
                        {spokenLanguages.map((l, i) => (
                          <span key={i}>
                            {i === spokenLanguages.length - 1
                              ? l + " "
                              : l + " ,"}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="border-countries">Border Countries:</div>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default Country;
