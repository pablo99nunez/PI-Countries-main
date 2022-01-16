import React from 'react'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Button from '../../Interactive/Button/Button'
import {  orderCountries } from '../../../redux/actions/countryAction'
import '../dropMenu.css'

export default function FilterMenu({close,setPage}) {
    const results = useSelector(state => state.results)
    const countries = useSelector(state => state.countries)
    const dispatch = useDispatch()
    const [order, setOrder] = useState({})
    return (
        <div className='dropMenu'>
            <h1>Ordenar</h1>
            <button className="closeButton" onClick={()=>close()}>x</button>
            <div style={{display:"flex"}}>

                <div >

                    <p>Alfabeticamente</p>
                    <p>Ascendiente</p>
                    <input type="radio" name="alfabeticamente" id="asc" onChange={()=>setOrder({...order,alf:"asc"})}/>
                    <p>Descendiente</p>
                    <input type="radio" name="alfabeticamente" id="desc" onChange={()=>setOrder({...order,alf:"desc"})} />
                </div>
                <div>

                    <p>Poblacion</p>
                    <p>Ascendiente</p>
                    <input type="radio" name="poblacionalmente" id="asc" onChange={()=>setOrder({...order,pob:"asc"})}/>
                    <p>Descendiente</p>
                    <input type="radio" name="poblacionalmente" id="desc" onChange={()=>setOrder({...order,pob:"desc"})}/>
                </div>
            </div>

     
            <Button
            value="Ok"
             onClick={()=>{
                close()
                setPage(0)
                return dispatch(orderCountries(order))
                }} ></Button>
          
        </div>
    )
}
