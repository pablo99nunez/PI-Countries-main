import React, { useState } from "react";
import { search } from "../../redux/actions/countryAction";
import { useDispatch, useSelector } from "react-redux";
import icoSearch from "../../assets/icons/travel_explore_black_48dp.svg";
import "./SearchBar.css";
import { useEffect,useRef } from "react";

export default function SearchBar() {
  const [toSearch, setSearch] = useState("");
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const input = useRef(null)
  useEffect(()=>{
      if(!active) dispatch(search(""))
      else{
        console.log(input)
        input.current.focus()
      }
  },[active])
  return (
    <div className="searchBar">
      <img
        src={icoSearch}
        alt="buscar"
        onClick={() => setActive(!active)}
      />
      <div 
        className="inputSearch"
        style={{
            width: active ? 400 : 0,
        }}>

        <input
            type="text"
            ref={input}
            placeholder="Buscar un país..."
            name="searchValue"
            value={toSearch}
            
            id="search"
            onChange={(e) => {
              setSearch(e.target.value)
              dispatch(search(e.target.value))
            }}
            />
        </div>
    </div>
  );
}
