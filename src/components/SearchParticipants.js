import React, { useEffect, useState } from 'react'
import { getParticipants } from '../service/api';
import Header from './Header';
import { Link } from 'react-router-dom';
import { BugFill } from 'react-bootstrap-icons';



export default function SearchParticipants() {
   const [userList, setUserList] = useState([]);
   let [searchTerm, setSearchTerm] = useState(' ');
   const [result, setResult] = useState([]);
   const [displayResult, setDisplayResult] = useState();
   const [errorMessage,setErrorMessage] = useState('')

   useEffect(()=>{
      getParticipants().then(response=>setUserList(response))
   },[])

   const SearchUsers = (e) => {
      e.preventDefault();
      let searchResult = [];

     if(userList.ok === false){
      setErrorMessage(<p className="alert alert-danger " role="alert"><BugFill /> Une erreur est survenue, veuillez contacter un administrateur</p>)
     }else{

         if(searchTerm !== undefined && searchTerm.length !== 0){
            searchResult = userList?.filter(user => { 
               return user?.mail.toLowerCase().includes(searchTerm?.toLowerCase()) || user?.display_name.toLowerCase().includes(searchTerm?.toLowerCase()) || user?.mail.toLowerCase().includes(searchTerm?.toLowerCase());
            })
            setResult(searchResult);
         }else{
            // si recherche ne retourne pas de resultats
            setResult([]);
         }
         if(searchResult.length <= 0){
            setDisplayResult('Pas de resultats')
         }else{
            // Remise à zero des resultats
            setDisplayResult('')
         }
      }
   }

  return (
    <>
      <Header />

      <div className="card p-3 py-lg-5 col-12 col-lg-8 col-xxl-6 mx-auto">
                  <div className="col-md-10 mb-4 m-auto">
                     <form action="post">
                        <div className="col-md-10  mb-4 m-auto">
                           <label htmlFor="identifiant" className="form-label">Rechercher un participant au concours</label>
                           <input id="searchEngine" 
                           className="form-control" 
                           type="text" 
                           name="identifiant"
                           placeholder="Rechercher par email, pseudo ..." 
                           onChange={(e) => setSearchTerm(e.target.value)}/>
                        </div>
                      
                        <div className="text-center  mt-3 mb-4">
                           <button type="submit" className="btn btn-third" onClick={(e) => SearchUsers(e)}>Rechercher</button>
                        </div>
                     </form>
                  </div> 

                     {errorMessage ? errorMessage : null}

                     <table className="table caption-top result text-small align-middle">
                     <tbody> 
                        {result?.map(user =>(
                           <tr key={user.id}>
                              <td>{user.display_name}</td>
                              <td>{user.mail}</td>
                              <td>
                                 <Link to={user.id}>{user.email}</Link>
                              </td>
                              <td>
                                 <Link to={'/profil/'+ user.id} className="btn btn-primary btn-small text-small">Profil</Link>
                              </td>
                           </tr>
                        ))}
                        </tbody>
                     </table>
                  
                   <div className='text-center' role="alert">{displayResult}</div>
                         
            </div>
    </>
  )
}
