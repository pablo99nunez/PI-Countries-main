import React from 'react';
import imgError from '../../assets/404.png'
import Button from '../Interactive/Button/Button';
import { Link } from 'react-router-dom';

import './ErrorPage.css'

export default function ErrorPage () {
  return <div className='errorPage'>
      <div className="contImgError">
          <img src={imgError} alt="signal To Nowhere" />
      </div>
      <div className="textError">
        <h1>404 Pagina no encontrada</h1>
        <h2>La pagina que estas buscando, no existe.</h2>
        <Link to={'/home'}>
            <Button value={'Volver a Home'}></Button>
        </Link>
      </div>
  </div>;
}
