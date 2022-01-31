import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Loading from './components/Loading/Loading'

import { getCountries } from './redux/actions/countryAction'

export default function Test () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCountries())
  }, [])
  return <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', border: '2px solid red' }}>
      <Loading></Loading>
  </div>
}
