import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCountries } from "../../../redux/actions/countryAction";
import Select from "../../Interactive/Select/Select";
import Button from "../../Interactive/Button/Button";
import "../dropMenu.css";

export default function FilterMenu({ close, setPage }) {
  const results = useSelector((state) => state.results);
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  const [continent, setContinent] = useState("Americas");

  return (
    <div className="dropMenu">
      <h1>Filtrar</h1>
      <button className="closeButton" onClick={() => close()}>
        x
      </button>

      <h2>Continente:</h2>
      <Select
        opt={["Americas", "Africa", "Europe", "Asia", "Oceania", "Antarctic"]}
        onSelect={setContinent}
      ></Select>

      <Button
        value="Ok"
        onClick={() => {
          close();
          setPage(0);
          console.log(continent);
          return dispatch(filterCountries(continent));
        }}
      ></Button>
    </div>
  );
}
