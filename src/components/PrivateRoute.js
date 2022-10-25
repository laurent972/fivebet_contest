import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
   

   const loggedIn = () =>{
      const logged = localStorage.getItem('auth');
      if(logged){
         return true
      }else{
         return false
      }
   }
   const auth=loggedIn();
  return (
     
    <>
            {auth ?
                <Outlet />
            :
               <Navigate to="/home" />
            }

           
    </>
  )
}
