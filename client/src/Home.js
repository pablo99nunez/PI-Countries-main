import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from './redux/actions/countryAction'
import Country from './components/Country/Country'
import Nav from './components/Nav/Nav'
import './Home.css'
import Loading from './components/Loading'

const per_page=10

export default function Home() {
    const countries =useSelector(state=>state.countries)
    const results =useSelector(state=>state.results)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(0)
    
    const dispatch = useDispatch()
    useEffect(() => {
        
        if(!countries[0]){
            dispatch(getCountries())
        }
    }, [])
    useEffect(()=>{
        if(countries){
            setIsLoading(false)
        }
    },[countries])
    return (
        <>
        <Nav setPage={setPage}></Nav>
        <div className='home'>
            <div className="cards">

                {
                    isLoading?
                    <Loading></Loading>
                    :
                    !results[0]?
                    countries.map(e=>{
                        return <Country key={e.id} id={e.id}></Country>
                    }).slice(page,page+per_page):
                    (results.map(e=>{
                        return <Country key={e.id} id={e.id}></Country>
                    })).slice(page,page+per_page)
                }
            </div>
            <div className="pagination">

                <button onClick={()=>{
                    return setPage(page-per_page)
                }} disabled={page==0}>Prev</button>
                {Array.apply(null, { length: Math.ceil((!results[0]?(countries.length/per_page):(results.length/per_page))) }).map((e, i) => {
                    return (<button key={i} onClick={()=>setPage(i*per_page)}>
                        {i+1}
                    </button>)
                })}
                <button onClick={()=>{
                    
                    return setPage(page+per_page)
                }} disabled={page>=(results[0]?results.length-per_page:countries.length-per_page)}>Next</button>

            </div>
        </div>
        </>
    )
}
