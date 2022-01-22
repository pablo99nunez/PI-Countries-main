import React, { useState } from 'react'
import Button from '../Button/Button'
import "./Alert.css"

export default function Alert({value,type,buttons=["Ok"],onClick}) {
    const [active, setActive] = useState(true)
    return (
        active?
            <div key="alert" className='alert'>
                <div className={"box "+type}>

                    <h2>{value}</h2>
                    <div className='alertButtons'>

                    {buttons.map((e,i)=>{
                        
                        return  <Button key={i} className="cerrarAlert" color="white" textColor="black" value={e} onClick={()=>{
                            onClick[i]()
                            setActive(false)}}></Button>
                        })}
                    </div>
                </div>
            </div>
        :""
    )
}
