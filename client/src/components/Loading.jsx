import React from 'react'
import spin from '../assets/worldSpin.gif'

export default function Loading() {
    return (
        <div style={{
            width:"50px",
            aspectRatio:"1/1",
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            position:'absolute',
            top:'calc(50vh - 25px)',
            left:'calc(50vw - 25px)',
            flexDirection:'column',
            color:'white'
        }}>
            <img style={{
                width:'100%',
                objectFit:'cover'
            }} src={spin} alt="" />
            
        </div>
    )
}
