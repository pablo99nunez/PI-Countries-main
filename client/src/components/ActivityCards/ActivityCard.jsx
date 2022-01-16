import React from 'react'
import './ActivityCard.css'

export default function ActivityCard({e}) {
    let duration=Math.abs(e.duration)/60/60/24+" dias"
    return (
        <div className="activityWrap">

            <div className='activityCard'>
                <div className="infoActivityFront">

                    <h1>{e.name.toUpperCase()}</h1>
                    <img src={e.image}  />
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
