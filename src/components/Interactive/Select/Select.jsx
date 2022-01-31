import React, { useRef, useState, useEffect } from 'react';

import './Select.css';

export default function Select ({ opt, onSelect = () => {} }) {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(opt[0])
  const select = useRef(null)
  useEffect(() => {
    onSelect(selected)
    select.current.scrollTop = 0
  }, [active])

  return (
    <div
      className={`select ${active ? 'opened' : ''}`}
      style={{
        height: active ? (opt.length + 1) * 50 : 50
      }}
      onClick={() => setActive(!active)}
      ref={select}
    >
        <div className={`option selected ${active ? 'active' : ''}`} name={selected}>{selected}
        <span className="Arrow"></span></div>

          {opt.map((e, i) => {
            return (
              <div key={e} className="option" name={e} id={e + 'Opt'} onClick={(e) => setSelected(opt[i])}>
                {e}
              </div>
            );
          })}

    </div>
  );
}
