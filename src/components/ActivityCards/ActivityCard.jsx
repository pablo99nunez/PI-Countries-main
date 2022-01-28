import React from 'react'
import { useSelector } from 'react-redux'
import { getRandomColor } from '../RandomColor/RandomColor'
import { getHours } from '../SecondsTranslate'
import DifficultyGraph from '../Interactive/DifficultyGraph/DifficultyGraph'
import './ActivityCard.css'

export default function ActivityCard({e}) {
    let duration=`${getHours(e.duration)} horas`
    const APIenabled=useSelector(state=>state.APIenabled)
    return (
        <div className="activityWrap">

            <div className='activityCard'>
                <div className="infoActivityFront" style={!APIenabled?{backgroundColor:getRandomColor()}:{}}>

                    <h1>{e.name.toUpperCase()}</h1>
                    {APIenabled&& <img src={e.image}  />}
                </div>
                <div className='infoActivityBack'>

                    <h2>Duracion: {duration}</h2>
                    <div style={{
                        display:'flex',
                        alignItems:'flex-end',
                        background:'inherit',
                        height: '2rem',
                        gap:".2rem",
                        justifyContent:'center'
                    }}>
                        <h2>Dificultad: </h2>
                        <DifficultyGraph tier={e.difficulty}/>
                    </div>

                    <h2>Temporada: {e.season}</h2>
                </div>
            </div>
        </div>
    )
}
