import React from 'react'

import {PersonPlusFill, Speedometer} from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'


export default function HomeNav() {
  return (
    <>
      <h4 className="text-center">Bienvenue sur FivebetContest</h4>
      <p className="text-center fs-italic">Vous pouvez :</p>

      <div className="d-flex justify-content-center">
         <Link to='/add-contestant' type="button" className="btn btn-third m-2"><PersonPlusFill size={30} /> <br/> Inscrire un joueur</Link>
         <Link to='/contestants' type="button" className="btn btn-secondary m-2"><Speedometer size={30} /> <br/>Ajouter des points</Link>
      </div>

    </>
  )
}
