import React, { useState } from 'react'
import Button from '../Button/Button'
import "./Alert.css"

export default function Alert({value,type,onClick}) {
    const [active, setActive] = useState(true)
    return (
        active?
            <div className='alert'>
                <div className={"box "+type}>

                    <h2>{value}</h2>
                    <Button className="cerrarAlert" color="white" value="Cerrar" onClick={()=>{
                        onClick()
                        setActive(false)}}></Button>
                </div>
            </div>
        :""
    )
}
