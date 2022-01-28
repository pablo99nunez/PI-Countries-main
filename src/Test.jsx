import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Country from './components/Country/Country';
import TimePicker from './components/Interactive/TimePicker/TimePicker';
import DifficultyGraph from './components/Interactive/DifficultyGraph/DifficultyGraph'
import { getCountries } from './redux/actions/countryAction';

export default function Test() {
	const dispatch=useDispatch() 
	const countries = useSelector(state=>state.countries)
	useEffect(()=>{
		dispatch(getCountries())
	},[])
  return <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',border:'2px solid red'}}>
      <DifficultyGraph></DifficultyGraph>
  </div>;
}
