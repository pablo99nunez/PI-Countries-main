import React from 'react'
import './Button.css'

export default function Button({type,color="#5959ee",textColor="white",value,onClick,className}) {
    return (
        <button onClick={(e)=>onClick(e)} className={"button "+ className} type={type} style={{background:color,color:textColor}}>{value}</button>
    )
}
