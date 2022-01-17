import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCountries, getCountry } from "../../../redux/actions/countryAction";
import Select from "../../Interactive/Select/Select";
import Button from "../../Interactive/Button/Button";
import "../dropMenu.css";

export default function FilterMenu({ close, setPage }) {
  const state = useSelector(state => state)
  let activities = useSelector(state=>state.activities)
  const dispatch = useDispatch();
  const [continent, setContinent] = useState("Americas");
  const [activity, setActivity] = useState("")


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
      <h2>Activities:</h2>
      <Select
        opt={["Ninguna"].concat(activities.map(e=>e.name))}
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
