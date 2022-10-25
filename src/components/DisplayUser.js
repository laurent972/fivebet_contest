import React, { useEffect, useState } from 'react';
import loader from '../__Iphone-spinner-1.gif';
import { Gem } from 'react-bootstrap-icons';
import { getSuccess } from '../service/api';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../service/api';
import imgPlaceholder from '../user-placeholder.svg';


export default function DisplayUser(profil) {
   const data = profil.profil; //profil du joueur
   const [allSuccess, setAllSuccess] = useState([]); // tous les succès de l'evenement
   let loaded = false;
   let userScore = data?.score; //score du joueur
   let successArray = data?.participation //tableau des succès du joueur
   const id = useParams();
   let buttons = document.querySelectorAll('.add-success-button');
   let userSuccessArray = [];

   const disableButton = (userSuccessArray)=>{
      userSuccessArray.filter( success => {
         return buttons?.forEach(button =>{
            if(button.id === success.id ){
               button.disabled = true;
            }
         } )
      })
   }
  
   if(data !== undefined){
      loaded = true;
      userSuccessArray = Object.values(successArray);
      disableButton(userSuccessArray)
   }
 
   useEffect(()=>{
      getSuccess().then(response => setAllSuccess(response));
   },[]);
  
  
   const HandleAddPoint = (successId) =>{
      const addSuccess = allSuccess?.filter( success => success.id === successId );

      if( !userSuccessArray.includes(successId)){ //Si l'id est present dans la liste des succès de l'utlisateur je n'ajoute pas de points
         userSuccessArray.push(successId);
        // eslint-disable-next-line
        addSuccess.map(success =>{
            userScore += success.points
         })
      }else{
         alert('Ce succès a déjà été attribué');
      }

      const raw = JSON.stringify({
         "success":successId
      });
  
      //Using PATCH for changing only success
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
        },
        body: raw,
        redirect: 'follow',
        credentials: "include" 
      };
  
        fetch(`${apiUrl}/success/${id.id}`, requestOptions)
        .then(response => response.json())
        .then(result => window.location.reload())
        .catch(error => console.log('error', error));
   
    }

  return (
   <>
      {loaded ? 
          <>
         <section className="row border-bottom">
            <div className="col-lg-8">
               <div className="card border-0 mb-3">
                  <div className="row g-0">
                     <div className="col-md-4 text-center">
                        
                       {data?.name != null 
                       ? 
                       <img src={data?.image} className="img-fluid rounded-circle user-portrait-img" alt="Portrait user" width={80} height={80}/>
                       : 
                       <img src={imgPlaceholder} className="img-fluid rounded-circle user-portrait-img" alt="User placeholder" width={80} height={80} />
                       }
                        
                     </div>
                     <div className="col-md-8">
                        <div className="card-body">
                           <h5 className="card-title fw-bold text-capitalize text-primary-color">{data?.display_name.toUpperCase()}</h5>
                           <p className="card-text text-small fst-italic mb-1"><strong>Né le: </strong>{data?.birthday}</p>
                           <p className="card-text fst-italic email fs-5 text-fourth">@{data?.mail}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-lg-4">
               <div className="card mb-3">
                  <div className="row g-0">
                     <div className="card-body user-total-score text-center">
                        <p className=" fw-bold  text-third mb-1">Total points</p>
                        <p className=" fw-bold email fs-2 text-secondary-color">{userScore}</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className=" p-2">
               <h2 className="mb-5"><Gem /> Succès</h2>
               
               <div className="row flex-wrap justify-content-around">
                     {allSuccess?.map(success =>(
                           <div  className='col-sm-12 col-md-6 col-lg-3 flex-column text-center border p-2 m-2 rounded' key={success.id} > 
                              <img className="img-fluid rounded-circle img-success" src={success.img} alt="succes img" width={50} height={50} />
                              <h5 className='fw-bold fs-6'>{success.name}</h5>
                              <button id={success.id} className="add-success-button btn btn-third text-center display-success mb-4" onClick={()=>HandleAddPoint(success.id)}>
                                 <p className='font-title fs-5 mb-0 text-white'> +{success.points}</p>
                              </button>
                           </div>
                     ))}
               </div>
         </section>
         </>
         :
            <img src={loader} width={50} height={50} className="mx-auto" alt="loader" />
         }
      </>
  )
}
