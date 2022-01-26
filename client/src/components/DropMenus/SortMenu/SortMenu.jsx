import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Interactive/Button/Button";
import { orderCountries } from "../../../redux/actions/countryAction";
import alpha from "../../../assets/icons/alpha.svg";
import population from "../../../assets/icons/population.svg";
import ascending from "../../../assets/icons/ascending.svg";
import descending from "../../../assets/icons/descending.svg";
import "../dropMenu.css";

export default function FilterMenu({ close, setPage }) {
  const results = useSelector((state) => state.results);
  const countries = useSelector((state) => state.countries);
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  const [order, setOrder] = useState({});
  return (
    <div className="dropMenu">
      <h1>Ordenar</h1>
      <button className="closeButton" onClick={() => close()}>
        x
      </button>
      <div className="orderBox">
        <div>
          <p>Alfabeticamente</p>
            <img src={alpha} alt="" />
        <div className="orderBox">

          <div
            className="radio"
            name="alfabeticamente"
            id="asc"
            onClick={() => {
                setActive("asc")
                setOrder({ alf: "asc" }
            )}}
          >
            <img className={active=="asc" ?"filter-green":undefined} src={ascending} alt="ascending" />
          </div>

          <div
            className="radio"
            name="alfabeticamente"
            id="desc"
            onClick={() => {
                setActive("desc")
                setOrder({ alf: "desc" }
            )}}
            >
            <img className={active=="desc"? "filter-green":undefined} src={descending} alt="descending" />
            
          </div>
              </div>
        </div>
        <div>
          <p>Poblacion</p>
          <img src={population} alt="" />
          <div className="orderBox">

          <div
            className="radio"
            name="poblacionalmente"
            id="asc"
            onClick={() => {
                setActive("ascPop")
                setOrder({ pob: "asc" }
            )}}
          >
            <img className={active=="ascPop" ? "filter-green":undefined} src={ascending} alt="descending" />
          </div>
      
          <div
            className="radio"
            name="poblacionalmente"
            id="desc"
            onClick={() => {
                setActive("descPop")
                setOrder({ pob: "desc" }
            )}}
          >
            <img className={active=="descPop" ? "filter-green":undefined} src={descending} alt="descending" />

          </div>
        </div>
      </div>
      </div>

      <Button
        value="Ok"
        onClick={() => {
          close();
          setPage(0);
          return dispatch(orderCountries(order));
        }}
      ></Button>
    </div>
  );
}
