import React, { useState } from 'react'
import './Nav.css'
import SearchBar from '../SearchBar/SearchBar'
import filterIco from '../../assets/icons/filter.svg'
import sortIco from '../../assets/icons/sort.svg'
import postIco from '../../assets/icons/post.svg'
import Settings from '../../assets/icons/settings.svg'
import logoutIco from '../../assets/icons/logout.svg'
import FilterMenu from '../DropMenus/FilterMenu/FilterMenu'
import SortMenu from '../DropMenus/SortMenu/SortMenu'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../../redux/actions/countryAction'

export default function Nav({setPage}) {
    const [filter, setFilter] = useState(false)
    const [sort, setSort] = useState(false)
    const user=useSelector(state=>state.user)
    const dispatch=useDispatch()
    return (
        <div className='nav'>
            <Link to="/"><h2>Patriam.</h2></Link>
            <SearchBar></SearchBar>

            <div style={{display:'flex'}}>
               
                    <Link to="/add" className="tooltip">
                        <img src={postIco} alt="post activity"/>
                        <span className='toolText'>Añadir actividad </span>
                    </Link>

                    <div className="tooltip">
                        <img src={filterIco} alt="filter" onClick={()=>setFilter(!filter)}/>
                        {filter? <FilterMenu setPage={setPage} close={setFilter}/>:null}
                            <span className='toolText'>Filtrar </span>
                        </div>

                    <div className='tooltip'>
                    <img src={sortIco} alt="sort" onClick={()=>setSort(!sort)}/>
                    {sort? <SortMenu setPage={setPage} close={setSort}/>:null}
                        <span className='toolText'>Ordenar </span>
                    </div>
                    
                    
                    
                    
            </div>
                    
                    
       

        </div>
    )
}
