import React,{useState} from 'react'
import icoSearch from '../../assets/icons/travel_explore_black_48dp.svg'
import './SearchBar.css'

export default function SearchBar() {
    const [search, setSearch] = useState("")
    return (
        <div className='searchBar'>
            <input type="text" placeholder='Buscar un país...' name="searchValue" value={search} id="search" onChange={(e)=>setSearch(e.target.value)}/>
            <img src={icoSearch} alt="buscar" onClick={()=>alert(search)}/>
        </div>
    )
}
