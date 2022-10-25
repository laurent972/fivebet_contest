import React, { useContext } from 'react';
import logo from "../logo-red.png";
import Login from '../components/Login';
import { LoginContext } from '../service/context';
import HomeNav from '../components/HomeNav';
import { handleLogout } from '../service/auth';
import {BoxArrowLeft} from 'react-bootstrap-icons';

const Home = () => {

   const {loggedIn, setLoggedIn} = useContext(LoginContext)

   return (
         
            <>
               <span className="text-center d-block mb-3 mb-lg-5">
                  <img src={logo} className="app-logo" alt="" />
               </span>
               {loggedIn ? <button className="logout-button float-end btn btn-third btn-sm position-absolute" onClick={handleLogout}><BoxArrowLeft size={15}/>  Logout</button> : null} 

               <div className="card p-3 py-lg-5 col-12 col-lg-8 col-xxl-6 mx-auto">
                  {loggedIn ? <HomeNav /> : <Login /> }
               </div>
         
            </>
   );
};


export default Home;