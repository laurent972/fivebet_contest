import React, { useContext, useState } from 'react'
import { LogIn } from '../service/auth';
import { LoginContext } from '../service/context';
import loader from '../__Iphone-spinner-1.gif';

export default function Login() {

   const [ident, setIdent] = useState('');
   const [message, setMessage] = useState('');
   const [loading, setLoading] = useState(false);
   const {loggedIn,setLoggedIn} = useContext(LoginContext);

   const removeError = (e) =>{
      e.preventDefault();
      setMessage('')
   }

   const handleLogin = (e) =>{
      e.preventDefault();
      setLoading(true);
      LogIn(ident).then(response => {
         setLoading(false);
         if(response.ok === true){
            setLoggedIn(true);
         }
          if(response.status === 403){
            setMessage(<p className="alert alert-danger" role="alert">Cet utilisateur n'existe pas</p>);
         }
         else if(response.status === 400){
            setMessage(<p className="alert alert-danger" role="alert">Vous ne pouvez pas vous connecter</p>);
         }
      })
    }


  return (
    <>

                  <h1 className='text-center'>Connexion</h1>
                  <div className="col-md-10 mb-4 m-auto">
                     {message ? message : null }
                     <form action="post" onSubmit={handleLogin}>
                        <div className="col-md-10  mb-4 m-auto">
                           <label htmlFor="identifiant" className="form-label">Identifiant</label>
                           <input className="form-control" type="text" name="identifiant" 
                           onChange={(e)=>setIdent(e.target.value)}
                           onClick={(e)=>removeError(e)}
                           />
                        </div>
                        <div className="text-center  mt-3 mb-4">
                           {loading
                            ? <img src={loader} className="mx-auto" width={50} height={50} alt="loader"/>
                            : <button type="submit" className="btn btn-third">Connexion</button>
                           }
                        </div>
                     </form>
                  </div>
         
    </>
  )
}
