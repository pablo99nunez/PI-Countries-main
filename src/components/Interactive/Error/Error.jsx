import React from 'react'
import './Error.css'
export default function Error ({ e }) {
  return (
        <div className='error'>
            <span className='errorArrow'></span>
            <h1>{e}</h1>
        </div>
  )
}
