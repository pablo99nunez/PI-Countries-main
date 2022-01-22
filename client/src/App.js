import './App.css';
import img from './assets/background.jpg'
import homeIco from './assets/icons/home_black_24dp.svg'
import {Link} from 'react-router-dom'
import Loading from './components/Loading';
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, toggleApis } from './redux/actions/countryAction';


function App() {
  const dispatch = useDispatch()
  const countries = useSelector(state=>state.countries)
  const APIenabled = useSelector(state=>state.APIenabled)
  const [changeTitle, setChangeTitle] = useState("")
  useEffect(()=>{
    dispatch(getCountries())
  },[])
  
  return (
    <div className='app'>
        
        <img className="backgroundImg" src={img} alt="planeta tierra" />
        <div className="welcome">
          <div className="title-cont">
            <h1 className={"title "+changeTitle}>Patriam.</h1>
          </div>

          {countries?
          <Link to="/home" className='homeIco'>
            <img src={homeIco} alt="home" onMouseOver={()=>setChangeTitle("change")} onMouseLeave={()=>setChangeTitle("")}/>
          </Link>
          :<Loading/>}

        </div>
          <div className="toggleApi">
            <h4>Turn on/off image API</h4>
            <input type="checkbox" onChange={()=>dispatch(toggleApis())} checked={APIenabled}/>
          </div>

    </div>
  )
}

export default App;
