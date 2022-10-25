import React, { useContext, useEffect } from 'react'
import SearchParticipants from '../components/SearchParticipants'
import { LoginContext } from '../service/context';


export default function ParticipantRegister() {

    const {loggedIn,setLoggedIn} = useContext(LoginContext);

    useEffect(()=>{
      document.body.classList.add('register');
      return function cleanup() {
        document.body.classList.remove('register');
      };
    })

  return (
    <>
         <SearchParticipants />
    </>
  )
}
