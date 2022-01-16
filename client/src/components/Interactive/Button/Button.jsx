import React from 'react'
import './Button.css'

export default function Button({type,color="#5959ee",value,onClick,className}) {
    return (
        <button onClick={()=>onClick()} className={"button "+ className} type={type} style={{background:color}}>{value}</button>
    )
}
