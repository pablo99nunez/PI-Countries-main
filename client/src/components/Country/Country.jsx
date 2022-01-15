import React, { useEffect,useState } from 'react'
import {  useSelector } from 'react-redux'
import Loading from '../Loading'
import './Country.css'

export default function Country({id}) {
  
    const countries = useSelector(state=>state.countries)
    const [loading, setLoading] = useState(true)
    const country=countries.find((e)=>e.id==id)
    useEffect(()=>{
        if(country){
            setLoading(false)
        }
    },[countries])
    return (
        <div className='countryCard'>
            {!loading?
            <>
                <img src={country.image} alt={`${country.name}Image`}/>
                <h3>{country.name}</h3>
                <h4>{country.region}</h4>
            </>
            :
            <Loading></Loading>
            }
        </div>
    )
}
