import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import arrow from "../../../assets/icons/arrow.svg";
import Select from "../Select/Select";
import "./Pagination.css";

export default function Pagination({ content, per_page }) {
  const [page, _setPage] = useState(0);
  const [active, setActive] = useState(0);
  const [isLearn, setLearn] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const pageRef = useRef(page)
  const pagination = useRef(null)
  const setPage=(e)=>{
    pageRef.current=e
    _setPage(e)
  }

  useEffect(()=>{
    swipe()
  },[swipe])
  useEffect(()=>{
      setPage(0)
      setActive(0)
  },[content])
  

  
  function swipe(){
    let startX,startY,offsetX=50,offsetY=50,endX,endY
    if(window.visualViewport.width<=1000){
      setMobile(true)
      pagination.current.addEventListener('touchstart',e=>{
        startX=e.touches[0].clientX
        startY=e.touches[0].clientY
        
      })
      pagination.current.addEventListener('touchmove',e=>{
        endX=e.touches[0].clientX
        endY=e.touches[0].clientY
      })
      pagination.current.addEventListener('touchend',(e)=>{
       
        
        if(endX<startX-offsetX && endY<startY+offsetY && endY>startY-offsetY){
          if(pageRef.current < content.length - per_page){
            setLearn(true)
            setActive(active+1) 
            setPage(pageRef.current+per_page)
          } 
        }else if(endY>startX-offsetX && endY<startY+offsetY && endY>startY-offsetY){
        if(pageRef.current>=per_page){
            setActive(active-1) 
            setPage(pageRef.current-per_page)
          }
        }
       
      }) 
      
    }}
  return (
    <div className="pagination" ref={pagination}>
      <div
        className="contentWrapper"
      >
        {content.map((e) => e).slice(page, page + per_page)}
        <span
          className={`next ${
            page >= content.length - per_page ? "disabled" : ""
          }`}
          onClick={() => {
              setActive(active+1)
              setPage(page + per_page)
            }}
        >
          {" "}
          <img src={arrow} alt="next" />{" "}
        </span>
        <span
          className={`prev ${page == 0 ? "disabled" : ""}`}
          onClick={() => {
            setActive(active-1)
            setPage(page - per_page)
            }}
        >
          {" "}
          <img src={arrow} alt="prev" />{" "}
        </span>
      </div>
      <div className="pageIndex">
      {window.visualViewport.width>1000?
          Array.apply(null, { length: Math.ceil(content.length / per_page) })
          .map((e, i) => {

              return (
              <div
                className={`index ${active == i ? "active" : ""}`}
                key={i}
                onClick={() => {
                  setActive(i);
                  setPage(i * per_page);
                }}
                ></div>
                );
            }
          )
      
        :
        <Select opt={
          Array.apply(null, { length: Math.ceil(content.length / per_page) })
          .map((e, i) => i)
          }
          onSelect={(e)=>{
            setActive(e);
            setPage(e * per_page);}}
            />
          }
        </div>
      {!isLearn && isMobile?
      <div className="swipeLeft">
        <div className="swipeContent">
          <img src={arrow} alt="" />
          <h2>Swipe Left</h2>
        </div>
      </div>:null 
    }
    </div>
  );
}
