import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getCountry } from '../../redux/actions/countryAction'
import './CountryDetail.css'
import { Link } from 'react-router-dom'

export default function CountryDetail() {
    let {id}=useParams()
    const dispatch = useDispatch()
    const country = useSelector(state => state.country)
    useEffect(()=>{
        dispatch(getCountry(id))
    },[])
    return (
        <>
        <Link to="/home" className='goBack'><h1>Patriam.</h1></Link>
        <div className='countryDetail'>
            {country.landscape?
            <img className='countryBack' src={country.landscape} alt="" />:""}
            <div className="info">
                <img src={country.image} alt="bandera" />
                <div>
                    <h1>{country.name}</h1>
                    <h2>{country.region}</h2>
                </div>
            </div>

        </div>
        <div className="detail">
            <h2>SubRegion: {country.subregion}</h2>
        </div>
        </>
    )
}
