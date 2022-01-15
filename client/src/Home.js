import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from './redux/actions/countryAction'
import Country from './components/Country/Country'
import Nav from './components/Nav/Nav'
import './Home.css'

export default function Home() {
    const countries =useSelector(state=>state.countries)
    const [page, setPage] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        
        if(!countries[0]){
            dispatch(getCountries())
        }
    }, [])
    return (
        <div className='home'>
            <Nav></Nav>
            <div className="cards">
                {countries.map(e=>{
                    return <Country key={e.id} id={e.id}></Country>
                }).slice(page,page+10)}
            </div>
            <div className="pagination">

                <button onClick={()=>{
                    return setPage(page-10)
                }}>Prev</button>
                {Array.apply(null, { length: Math.floor(countries.length/10) }).map((e, i) => {
                    return (<button key="i" onClick={()=>setPage(i*10)}>
                        {i+1}
                    </button>)
                })}
                <button onClick={()=>{

                    return setPage(page+10)
                    }}>Next</button>

            </div>
        </div>
    )
}
