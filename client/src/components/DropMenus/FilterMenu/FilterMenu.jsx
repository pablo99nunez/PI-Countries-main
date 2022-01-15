import React from 'react'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { filterCountries } from '../../../redux/actions/countryAction'
import '../dropMenu.css'

export default function FilterMenu({close,setPage}) {
    const results = useSelector(state => state.results)
    const countries = useSelector(state => state.countries)
    const dispatch = useDispatch()
    const [continent, setContinent] = useState("Americas")
    return (
        <div className='dropMenu'>
            <h1>filter</h1>
            <button onClick={()=>close()}>x</button>
        

            <select name="continent" id="" onChange={(e)=>setContinent(e.target.value)}>
                <option value="Americas" >America</option>
                <option value="Africa">Africa</option>
                <option value="Europe">Europa</option>
                <option value="Asia">Asia</option>
                <option value="Oceania">Oceanía</option>
                <option value="Antarctic">Antartida</option>
            </select>
            <select name="activities" id="">
                
            </select>
            <button onClick={()=>{
                close()
                setPage(0)
                return dispatch(filterCountries(continent))
                }} >Ok</button>
          
        </div>
    )
}
