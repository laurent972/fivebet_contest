import React, { useEffect, useState } from 'react';
import Header from './Header';
import { getParticipants, getPlayers } from '../service/api';
import { apiUrl } from '../service/api';
import {BugFill} from 'react-bootstrap-icons';
import {DashCircle} from 'react-bootstrap-icons';
import {CheckCircle} from 'react-bootstrap-icons';
import loader from '../__Iphone-spinner-1.gif';



const SearchUsers = () => {

   let [searchTerm, setSearchTerm] = useState(' ');
   let [data, setData] = useState([]);
   const [result, setResult] = useState([]);
   const [displayResult, setDisplayResult] = useState();
   const [errorMessage, setErrorMessage] = useState('');
   const [loading, setLoading] = useState(false);

   useEffect(()=>{
      getPlayers().then(response => setData(response));
    
   },[])

   const SearchUsers = (e) => {
      e.preventDefault();
     if(data.ok === false){
         setErrorMessage(<p className="alert alert-danger " role="alert"><BugFill /> Une erreur est survenue, veuillez contacter un administrateur</p>)
     }
     else{
         let searchResult = [];
         if(searchTerm !== undefined && searchTerm.length !== 0){
            searchResult = data?.filter(user => { 
               return user?.first_name.toLowerCase().includes(searchTerm?.toLowerCase()) || user?.last_name.toLowerCase().includes(searchTerm?.toLowerCase()) || user?.mail.toLowerCase().includes(searchTerm?.toLowerCase());
            })
            setResult(searchResult);
         }else{
            // si recherche ne retourne pas de resultats
            setResult([]);
         }

         if(searchResult?.length <= 0){
            setDisplayResult('Pas de resultats')
         }else{
            // Remise à zero des resultats
            setDisplayResult('')
         }
      }
   }

   const handleSubmit = (theId,e) => {
            setLoading(true)
            if(data.ok === false){
               setErrorMessage(<p className="alert alert-danger " role="alert"><BugFill /> Une erreur est survenue, veuillez contacter un administrateur</p>)
            }
            else{
               const raw = JSON.stringify({
                  "player_id":theId
               });

               const requestOptions = {
                 method: 'POST',
                 headers: new Headers({
                   'Content-Type': 'application/json',
                   "Accept": "application/json",
                 }),
                 body: raw,
                 redirect: 'follow',
                 credentials: "include" 
               };
           
                 fetch(`${apiUrl}/participants`, requestOptions)
                 .then(response => response.json())
                 .then(response => {
                     setLoading(false)
                     if(response.data.status === 201){
                        setErrorMessage(<p className="alert alert-success " role="alert"><CheckCircle /> {response.message}</p>)
                     }else{
                        setErrorMessage(<p className="alert alert-danger " role="alert"><DashCircle /> {response.message}</p>)
                     }
                 })
                 .catch(error => {
                  //console.log('error', error)
               });
            }
         }  

   const removeError = (e) =>{
      e.preventDefault();
      setErrorMessage('')
   }

   return (
      <>
         <Header />
         <div className="card p-3 py-lg-5 col-12 col-lg-8 col-xxl-6 mx-auto">
                  <div className="col-md-10 mb-4 m-auto">
                     <form action="post">
                        <div className="col-md-10  mb-4 m-auto">
                           <label htmlFor="identifiant" className="form-label">Inscrire un joueur</label>
                           <input id="searchEngine" 
                           className="form-control" 
                           type="text" 
                           name="identifiant" 
                           placeholder='Rechercher un email'
                           onChange={(e) => setSearchTerm(e.target.value)} 
                           onClick={(e) => removeError(e)}
                            />
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
                           <tr key={user.player_id}>
                              <td>{user.first_name}</td>
                              <td>{user.last_name}</td>
                              <td>{user.mail}</td>
                              <td>
                                 {loading ? 
                                    <img src={loader} alt="" width={40} height={40} />
                                 : 
                                    <button onClick={(e) => handleSubmit(user.player_id, e)} className="btn btn-secondary btn-small text-small float-end">
                                       Ajouter au concours
                                    </button>
                                 }
                                
                              </td>
                           </tr>
                        ))}
                        </tbody>
                     </table>
                   <div className='text-center' role="alert">{displayResult}</div>
                         
            </div>
      </>
   );
};



export default SearchUsers;