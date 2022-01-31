import React from 'react';
import difficultyImg from '../../../assets/Difficulty.png'
import './DifficultyGraph.css'
export default function DifficultyGraph ({ tier = 1 }) {
  return <div className="difficultyGraph">
      <img src={difficultyImg} alt="" />
      <div className="hideBar" style={{
        width: `${(5 - tier) * 20}%`
      }}></div>
  </div>;
}
