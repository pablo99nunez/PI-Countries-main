import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getCountry } from "../../redux/actions/countryAction";
import "./CountryDetail.css";
import Density from "../Density/Density";
import { Link } from "react-router-dom";
import ActivityCard from "../ActivityCards/ActivityCard";
import { useState } from "react";
import Loading from "../Loading";

export default function CountryDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const country = useSelector((state) => state.country);
  console.log(country);
  useEffect(() => {
    dispatch(getCountry(id));
  }, []);
  useEffect(()=>{
    if(country.image){
      setLoading(false)
    }
  })

  return (
      loading?<Loading></Loading>
      :
    <>
      <Link to="/home" className="goBack">
        <h1>Patriam.</h1>
      </Link>
      <div className="countryDetail">
        {country.landscape ? (
          <img className="countryBack" src={country.landscape} alt="" />
        ) : (
          ""
        )}
        <div className="info">
          <img src={country.image} alt="bandera" />
          <div>
            <h1>{country.name}</h1>
            <h2>{country.region}</h2>
          </div>
        </div>
      </div>
      <div className="detail" >
        <div className="infoDetail">
          <h1>{country.id}</h1>
          <h2>Capital: {country.capital}</h2>
          <h2>SubRegion: {country.subregion}</h2>

          <h3>
            Poblacion: {country.population} Area: {country.area} km<sup>2</sup>
          </h3>
        </div>
        <div className="activitiesWrap">
          <h2>Actividades</h2>
          <div className="gridActivities">
            {country.activities?.map((e) => {
              return <ActivityCard e={e} />;
            })}
          </div>
            {!country.activities?.slice(0)[0] && <h2>No hay actividades disponibles</h2>}
        </div>

        <div className="densityDetail">
          <h2>Densidad:</h2>
          <Density area={country.area} pop={country.population}></Density>
        </div>
      </div>
      </>
      
  );
}
