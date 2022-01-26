import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCountries, getCountry } from "../../../redux/actions/countryAction";
import Select from "../../Interactive/Select/Select";
import Button from "../../Interactive/Button/Button";
import "../dropMenu.css";

export default function FilterMenu({ close, setPage }) {
  const countries = useSelector(state => state.countries)
  const dispatch = useDispatch();
  const [continent, setContinent] = useState("Americas");
  const [activity, setActivity] = useState("")
  let activities = new Set(countries.map(e=>e.activities).filter(e=>e.length>0).map(e=>e.map(e=>e.name)).flat())
  console.log(activities)

  return (
    <div className="dropMenu">
      <h1>Filtrar</h1>
      <button className="closeButton" onClick={() => close()}>
        x
      </button>

      <h2>Continente:</h2>
      <Select
        opt={["Todos","Americas", "Africa", "Europe", "Asia", "Oceania", "Antarctic"]}
        onSelect={setContinent}
      ></Select>
      <h2>Actividades:</h2>
      <Select
        opt={["Ninguna"].concat([...activities,"Cualquiera"])}
        onSelect={setActivity}
      ></Select>

      <Button
        value="Ok"
        onClick={() => {
          close();
          setPage(0);
          return dispatch(filterCountries({continent,activity}));
        }}
      ></Button>
    </div>
  );
}
