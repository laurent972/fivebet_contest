import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../logo-red.png";
import {HouseDoor} from 'react-bootstrap-icons';

export default function Notfound() {
  return (
    <div className='text-center'> 
      <Link to="/" className="text-center d-block mb-3 mb-lg-5">
        <img src={logo} className="app-logo" alt="" />
       </Link>
       <div className="fs-1 text-white text-center mb-3">Erreur 404</div>
       <p className='text-white'>Vous êtes perdu ?</p>
       <Link className="btn btn-third m-auto" to="/"><HouseDoor /> Retour à l'accueil</Link>
    </div>
  )
}
