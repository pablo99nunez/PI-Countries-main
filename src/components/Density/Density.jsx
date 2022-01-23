import React, { useEffect,useState } from "react";
import { useRef } from "react";
import male from "../../assets/icons/face_blue.svg";
import female from "../../assets/icons/face_red.svg";
import whiteFace from '../../assets/icons/faceWhite.png'
import "./Density.css";

export default function Density({ area, pop }) {
  let length=Math.ceil(pop / area)>4000?4000:Math.ceil(pop / area)
  return (
    <div  className="boxDensity">
      <div className="boxInBox">

        { Array.apply(null, { length: length }).map((e, i) => {
          let top = Math.random() * 100;
          let left = Math.random() * 100;
          let gender = Math.random() > 0.5 ? male : female;
          let delay=Math.random()*5
          document.documentElement.style.setProperty("--random-value",(Math.random()*20)-10+'px')
          
          return (
            <img
              className="littlePerson"
              src={whiteFace}
              id={i+"person"}
              key={i}
              style={{top: top + "%", left: left + "%", position: "absolute",animationDelay: delay+"s",animationDuration:Math.ceil(pop/area)>4000?0+"s":3+"s",animationName:Math.ceil(pop/area)>4000?" ":"moving"}}
              alt="little person"
            />
          );
        })}
        <p className="textDensity">Representacion de 1 km<sup>2</sup></p>
      </div>
    </div>
  );
}
