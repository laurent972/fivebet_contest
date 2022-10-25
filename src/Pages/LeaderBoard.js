import React, { useEffect, useState } from 'react';
import logoContest from "../logoFivebet.svg";
import { getParticipants } from '../service/api';
import { Link } from 'react-router-dom';
import imgPlaceholder from '../user-placeholder.svg';

const LeaderBoard = () => {

   const [users, setUsers] = useState([]);
   
   useEffect(()=>{
      const interval = setInterval(() => {
         getParticipants().then(response => setUsers(response));
      }, 2000);
      return () => clearInterval(interval)
   },[]);

   useEffect(()=>{
      document.body.classList.add('leaderboard');
      return function cleanup() {
        document.body.classList.remove('leaderboard');
      };
   })

   //sorting by score
   if(users.length >= 0){
      users?.sort((a,b)=>b.score - a.score);
   }

   window.setTimeout( function() {
      window.location.reload();
    }, 180000);
   

 
   return (
      <>
       <div className="row align-items-center">
         <div className="col-lg-4">
         <span className="text-center d-block">
                <Link to={"/"} >
                      <img src={logoContest} className="app-logo" alt="logo contest" />
                </Link>
            </span>
         </div>
         <div className="col-lg-8 text-white">
            <h1 className='text-white'>LeaderBoard Fivebet contest</h1>
         </div>
       </div>

       <div className="row table-responsive display-userscore p-3">
            <table className='table table-borderless text-white align-middle table-display-userscore text-center'>
             <thead>
                  <tr className='font-title fst-italic text-white fs-3'>
                     <th scope="col">Position</th>
                     <th></th>
                     <th scope="col">Nom</th>
                     <th scope="col">Niveau</th>
                     <th scope="col">Points</th>
                  </tr>
               </thead>
               <tbody>
               {users.length >0 ? (
                  users?.slice(0,20).map(user=> (
                     <tr key={user.id} className='fw-bold'>
                           <td width={50}></td>
                        <td width={120}>
                           {user?.portrait != null 
                           ? 
                           <img src={user?.portrait} className="img-fluid rounded-circle user-portrait-img leader-face" alt="Portrait user" width={35} height={35}/>
                           : 
                           <img src={imgPlaceholder} className="img-fluid rounded-circle user-portrait-img leader-face" alt="User placeholder" width={35} height={35} />
                           }
                        </td>
                        <td className='fs-5'>
                           {user?.display_name}
                        </td>
                        <td className='fs-5'>
                           {user?.level}
                        </td>
                        <td className=' fs-5'>
                           {user?.score} <span className='fs-6 fst-italic'>pts</span>
                        </td>
                     </tr>
                  ))
               ) : null }
               </tbody>
            </table>
       </div>
      
      </>
   );
};



export default LeaderBoard;