import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Countries from "./componenets/search";
import Country from "./componenets/country";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./componenets/navbar";

function App() {
  const [countries, setCountries] = useState([]);
  const fetchData = async () => {
    try {
      const url = "https://restcountries.com/v3.1/all";
      const response = await axios(url);
      const data = response.data;
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
      <NavBar />
      <Router>
        <Routes>
          <Route path="/:id" element={<Country />} />
          <Route path="/" element={<Countries countries={countries} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
