import React from 'react'
import { useSelector } from 'react-redux'
import { getRandomColor } from '../RandomColor/RandomColor'
import { getHours } from '../SecondsTranslate'
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
                    <h2>Dificultad: {e.difficulty}</h2>
                    <h2>Temporada: {e.season}</h2>
                </div>
            </div>
        </div>
    )
}
