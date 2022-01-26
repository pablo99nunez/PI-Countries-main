import React, { useEffect, useState } from "react";
import { useRef } from "react";
import male from "../../assets/icons/face_blue.svg";
import female from "../../assets/icons/face_red.svg";
import whiteFace from "../../assets/icons/faceWhite.png";
import "./Density.css";

export default function Density({ area, pop }) {
  let length = Math.ceil(pop / area);
  return (
    <div className="boxDensity" style={
      {
       background: length>4000?"#2a0":"#111",
       boxShadow: length>4000?"none":"inset 0px 0px 100px black, inset 0 -20px 50px black"
      }
    }>
      <div className="boxInBox">
        {Array.apply(null, { length: length }).map((e, i) => {
          let top = Math.random() * 100;
          let left = Math.random() * 100;
          let gender = Math.random() > 0.5 ? male : female;
          let delay = Math.random() * 5;
          document.documentElement.style.setProperty(
            "--random-value",
            Math.random() * 20 - 10 + "px"
          );
          if(length<4000){

            return (
              <img
              className="littlePerson"
              src={whiteFace}
              id={i + "person"}
              key={i}
              style={{
                top: top + "%",
                left: left + "%",
                animationDelay: delay + "s",
                animationName:length>1000?"none":"moving"
              }}
              alt="little person"
              />
              );
          }
        })}
        <p className="textDensity">
          Representacion de 1 km<sup>2</sup>
        </p>
      </div>
    </div>
  );
}
