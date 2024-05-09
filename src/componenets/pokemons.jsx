import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const url = "https://restcountries.com/v3.1/all";
const AllPokemons = () => {
  const fetchData = async () => {
    try {
      const response = await axios(url);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  //useEffect
  useEffect(() => {
    fetchData();
  }, []);

  return <div></div>;
};
export default AllPokemons;
