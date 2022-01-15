import React, { useState } from 'react'
import './Nav.css'
import SearchBar from '../SearchBar/SearchBar'
import filterIco from '../../assets/icons/filter.svg'
import sortIco from '../../assets/icons/sort.svg'
import FilterMenu from '../DropMenus/FilterMenu/FilterMenu'
import SortMenu from '../DropMenus/SortMenu/SortMenu'

export default function Nav({setPage}) {
    const [filter, setFilter] = useState(false)
    const [sort, setSort] = useState(false)
    return (
        <div className='nav'>
            <h2>Patriam.</h2>
            <SearchBar></SearchBar>

            <div>
               
                    <img src={filterIco} alt="filter" onClick={()=>setFilter(!filter)}/>
                    {filter? <FilterMenu setPage={setPage} close={setFilter}/>:null}

                    <img src={sortIco} alt="sort" onClick={()=>setSort(!sort)}/>
                    {sort? <SortMenu setPage={setPage} close={setSort}/>:null}
                    
       
            </div>

        </div>
    )
}
