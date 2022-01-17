import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import arrow from "../../../assets/icons/arrow.svg";
import "./Pagination.css";

export default function Pagination({ content, per_page }) {
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(0);
  console.log(content);
  useEffect(()=>{
      setPage(0)
      setActive(0)
  },[content])
  return (
    <div className="pagination">
      <div
        className="contentWrapper"
        style={{
          gridTemplateColumns: "repeat(" + Math.ceil(per_page / 2) + ",1fr)",
        }}
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
        {Array.apply(null, { length: Math.ceil(content.length / per_page) })
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
          })
          }
      </div>
    </div>
  );
}
