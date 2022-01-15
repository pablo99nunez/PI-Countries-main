import React from 'react'
import './Nav.css'
import SearchBar from '../SearchBar/SearchBar'
import filterIco from '../../assets/icons/filter.svg'
import sortIco from '../../assets/icons/sort.svg'

export default function Nav() {
    return (
        <div className='nav'>
            <h2>Patriam.</h2>
            <SearchBar></SearchBar>

            <div>
                <button>
                    <img src={filterIco} alt="filter" />
                </button>
                <button>
                    <img src={sortIco} alt="sort" />
                </button>
            </div>

        </div>
    )
}
