import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getCountry } from '../../redux/actions/countryAction'
import './CountryDetail.css'

export default function CountryDetail() {
    let {id}=useParams()
    const dispatch = useDispatch()
    const country = useSelector(state => state.country)
    useEffect(()=>{
        dispatch(getCountry(id))
    },[])
    return (
        <div className='countryDetail'>
            <h1>{country.name}</h1>
            <img src={country.landscape} alt="" />
        </div>
    )
}
