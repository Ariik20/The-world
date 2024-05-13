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

  //get the borders of each country
  let borderList = [];
  console.log(border.data);
  for (let key in border.data) {
    let country = border.data[key];
    let borderName = country?.name?.common;
    let borderCode = country?.cca3.toLowerCase();
    borderList.push({ borderName, borderCode });
  }
  console.log(borderList);
  //get the native name of each country
  let natives = country[0]?.name.nativeName
    ? Object.keys(country[0]?.name.nativeName)[0]
    : null;
  let nativeName = country[0]?.name?.nativeName?.[natives]?.common;
  //get the language spoken in each country
  let spokenLanguages = [];
  for (let properties in country[0]?.languages) {
    spokenLanguages.push(country[0].languages[properties]);
  }

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

            //get the currencies used in different countries
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
            return (
              <div key={index} className="single-page">
                <button onClick={goBack} className="goBack">
                  <FaArrowLeftLong className="arrow" size="15" /> back
                </button>
                <div className="singleCountry-info">
                  <div className="single-flag">
                    <img src={flags.png} className="single-country-flag" />
                  </div>

                  <div className="single-info">
                    <h2>{name.common}</h2>
                    <div className="important-info">
                      <p>
                        <b>Native Name:</b> {nativeName}
                      </p>
                      <p>
                        <b>Capital</b>: {capital}
                      </p>
                      <p>
                        <b>Population</b>: {population}
                      </p>
                      <p>
                        <b>Region</b>: {region}
                      </p>
                      <p>
                        <b>Sub-region</b>: {subregion}
                      </p>
                    </div>
                    <div className="specific-info">
                      <p>
                        <b>Domain</b>: {tld}
                      </p>
                      <p>
                        <b>Currencies</b>: {actualCurrency}
                      </p>
                      <p>
                        <b>language(s)</b>:{" "}
                        {spokenLanguages.map((l, i) => (
                          <span key={i}>
                            {i === spokenLanguages.length - 1
                              ? l + " "
                              : l + ", "}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="border-countries">
                      <b>Border Countries</b>:
                      {borderList.length > 0
                        ? borderList.map((b) => {
                            return (
                              <Link to={`/${b.borderCode}`}>
                                <button>{b.borderName}</button>
                              </Link>
                            );
                          })
                        : " No Border Countries"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default Country;
