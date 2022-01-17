import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './redux/store'
import { Routes,Route } from 'react-router';
import {BrowserRouter} from 'react-router-dom'

import App from './App';
import Home from './Home'
import AddActivity from './components/AddActivity/AddActivity';
import CountryDetail from './components/CountryDetail/CountryDetail';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/add" element={<AddActivity/>}/>
          <Route path="/add/:pais" element={<AddActivity/>}/>
          <Route path="/:id" element={<CountryDetail />}/>
           
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,

       

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
