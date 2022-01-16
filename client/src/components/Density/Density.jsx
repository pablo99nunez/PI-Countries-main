import React, { useEffect,useState } from "react";
import { useRef } from "react";
import male from "../../assets/icons/face_blue.svg";
import female from "../../assets/icons/face_red.svg";
import "./Density.css";

export default function Density({ area, pop }) {

  return (
    <div  className="boxDensity">
      <div className="boxInBox">

        { Array.apply(null, { length: Math.ceil(pop / area) }).map((e, i) => {
          let top = Math.random() * 100;
          let left = Math.random() * 100;
          let gender = Math.random() > 0.5 ? male : female;
          let delay=Math.random()*5
          document.documentElement.style.setProperty("--random-value",(Math.random()*20)-10+'px')
          
          return (
            <img
              className="littlePerson"
              src={gender}
              id={i+"person"}
              key={i}
              style={{ top: top + "%", left: left + "%", position: "absolute",animationDelay: delay+"s"}}
              alt="little person"
            />
          );
        })}
        <p className="textDensity">Representacion de 1 km<sup>2</sup></p>
      </div>
    </div>
  );
}
