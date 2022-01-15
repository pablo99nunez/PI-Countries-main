import './App.css';
import img from './assets/background.jpg'
import homeIco from './assets/icons/home_black_24dp.svg'
import {Link} from 'react-router-dom'
import Loading from './components/Loading';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from './redux/actions/countryAction';

function App() {
  const dispatch = useDispatch()
  const countries = useSelector(state=>state.countries)
  useEffect(()=>{
    dispatch(getCountries())
  },[])

  return (
    <div className='app'>
        
        <img className="backgroundImg" src={img} alt="planeta tierra" />
        <div className="welcome">

          <h1>Patriam.</h1>
          {countries?
          <Link to="/home" className='homeIco'>
            <img src={homeIco} alt="home" />
          </Link>
          :<Loading/>}
        </div>

    </div>
  )
}

export default App;
