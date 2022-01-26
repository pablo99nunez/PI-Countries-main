import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getCountry,
  orderCountries,
  search,
} from "./redux/actions/countryAction";
import Country from "./components/Country/Country";
import Pagination from "./components/Interactive/Pagination/Pagination";
import Nav from "./components/Nav/Nav";
import "./Home.css";
import Loading from "./components/Loading";

const per_page = 10;

export default function Home() {
  const countries = useSelector((state) => state.countries);
  const results = useSelector((state) => state.results);
  const [isLoading, setIsLoading] = useState(true);
 
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(getCountry());
    if (!countries[0]) {
      await dispatch(getCountries());
    }
    dispatch(orderCountries({ pob: "desc" }));
    
  }, []);
  
  useEffect(() => {
    if (countries[0]) {
      setIsLoading(false);
    }
  }, [countries]);
  

  
  return (
    <div className="home">
      <Nav setPage={setPage}></Nav>
      <div className="contentHome">
        {isLoading ? (
          <Loading></Loading>
        ) : results[0] ? (
          <Pagination
            content={results.map((e) => {
              return <Country key={e.id} id={e.id}></Country>;
            })}
            per_page={per_page}
          ></Pagination>
        ) : (
          <h1
            style={{
              color: "white",
              background: "rgba(0,0,0,0.4)",
              width: "100%",
              textAlign:"center"
            }}
          >
            No hay resultados
          </h1>
          )
          
          }
      </div>
    </div>
  );
}
