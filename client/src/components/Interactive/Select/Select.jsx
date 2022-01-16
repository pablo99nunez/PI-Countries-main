import React from "react";
import { useState,useEffect } from "react";
import "./Select.css";

export default function Select({ opt,onSelect }) {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(opt[0])
  useEffect(() => {
      onSelect(selected)
  }, [active])
  return (
    <div
      className="select"
      style={{
        height: active ? (opt.length+1) * 50 : 50,
      }}
      onClick={()=>setActive(!active)}
    >
        <div className={`option selected ${active?"active":""}`} name={selected}>{selected}
        <span className="Arrow"></span></div>

      {opt.map((e,i) => {
        return (
          <div key={e} className="option" name={e} onClick={(e)=>setSelected(opt[i])}>
            {e}
          </div>
        );
      })}
      

    </div>
  );
}
