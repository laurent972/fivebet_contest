import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import logoContest from "../logoFivebet.svg";
import { ArrowRightShort } from 'react-bootstrap-icons';
import {BoxArrowLeft} from 'react-bootstrap-icons';
import { handleLogout } from "../service/auth";
import { LoginContext } from '../service/context';


export default function Header() {
  const activeClassName = "nav-bar-active";
  const normalState = "nav-bar-link"
  const {loggedIn} = useContext(LoginContext)
  return (
         <>
            <span className="text-center d-block">
                <Link to={"/"} >
                      <img src={logoContest} className="app-logo" alt="logo contest" />
                </Link>
            </span>
            {loggedIn ? <button className="logout-button float-end btn btn-third btn-sm position-absolute" onClick={handleLogout}><BoxArrowLeft size={15}/></button> : null} 
            <span className="text-center d-block mb-4">
              <NavLink 
                className={({ isActive }) =>
                  isActive ? activeClassName : normalState
                } 
                to="/add-contestant">
               <ArrowRightShort />  Inscription 
              </NavLink>
              
              <NavLink 
                className={({ isActive }) =>
                  isActive ? activeClassName : normalState
                } 
                to="/contestants">
               <ArrowRightShort /> Rechercher un participant  
              </NavLink>
                
              
            </span>      
          </>  
  )
}
