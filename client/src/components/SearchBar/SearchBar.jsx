import React,{useState} from 'react'
import { search } from '../../redux/actions/countryAction'
import { useDispatch } from 'react-redux'
import icoSearch from '../../assets/icons/travel_explore_black_48dp.svg'
import './SearchBar.css'

export default function SearchBar() {
    const [toSearch, setSearch] = useState("")
    const dispatch = useDispatch()

    return (
        <div className='searchBar'>
            <input type="text" placeholder='Buscar un país...' name="searchValue" value={toSearch} id="search" onChange={(e)=>setSearch(e.target.value)}/>
            <img src={icoSearch} alt="buscar" onClick={()=>dispatch(search(toSearch))}/>
        </div>
    )
}
