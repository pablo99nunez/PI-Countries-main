import React from 'react';
import { Link } from 'react-router-dom';

import github from '../../assets/icons/github.png'
import linkedin from '../../assets/icons/linkedin.png'
import gmail from '../../assets/icons/gmail.png'

import './Footer.css'

export default function Footer() {
  return <footer>
      <a href="https://github.com/pablo99nunez">
        <img src={github} alt="github" />
      </a>
      <a href="https://www.linkedin.com/in/pablo99nunez/">
        <img src={linkedin} alt="linkedin" />
      </a>
      <Link to="/Contact">
        <img src={gmail} alt="gmail" />
      </Link>
  </footer>
}
