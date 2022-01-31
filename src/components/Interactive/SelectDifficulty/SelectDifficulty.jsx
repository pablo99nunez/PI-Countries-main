import React, { useEffect, useState } from 'react'
import './SelectDifficulty.css'

export default function SelectDifficulty ({ onSelect }) {
  const [select, setSelect] = useState(1)
  useEffect(() => {
    onSelect(select)
  }, [select])
  return <div className="select-difficulty">
      <div className={'level-1 active'} onClick={() => setSelect(1)}></div>
      <div className={`level-2 ${select >= 2 ? 'active' : ''}`} onClick={() => setSelect(2)}></div>
      <div className={`level-3 ${select >= 3 ? 'active' : ''}`} onClick={() => setSelect(3)}></div>
      <div className={`level-4 ${select >= 4 ? 'active' : ''}`} onClick={() => setSelect(4)}></div>
      <div className={`level-5 ${select >= 5 ? 'active' : ''}`} onClick={() => setSelect(5)}></div>
  </div>
}
